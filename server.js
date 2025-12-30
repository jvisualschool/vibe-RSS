import express from 'express';
import cors from 'cors';
import Parser from 'rss-parser';
import mysql from 'mysql2/promise';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3001;

// Database configuration
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'rss_reader'
};

const parser = new Parser({
    customFields: {
        item: [
            ['media:content', 'media:content', { keepArray: true }],
            ['media:thumbnail', 'media:thumbnail', { keepArray: true }],
            ['media:group', 'media:group'],
            ['media:description', 'media:description'],
            ['content:encoded', 'content:encoded'],
            ['enclosure', 'enclosure'],
            ['image', 'image'],
            ['thumb', 'thumb']
        ]
    },
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Referer': 'https://www.google.com/'
    }
});

app.use(cors());
app.use(express.json());

// Initialize Database
async function initDB() {
    try {
        const connection = await mysql.createConnection({
            host: dbConfig.host,
            user: dbConfig.user,
            password: dbConfig.password
        });
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
        await connection.changeUser({ database: dbConfig.database });
        await connection.query(`
      CREATE TABLE IF NOT EXISTS feeds (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        url VARCHAR(500) NOT NULL,
        category VARCHAR(50) DEFAULT 'my-feed'
      )
    `);
        console.log('Database initialized successfully');
        await connection.end();
    } catch (err) {
        console.error('Database initialization failed:', err.message);
    }
}

// Routes
app.get('/api/rss', async (req, res) => {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: 'URL is required' });
    try {
        // Set referer to the feed's domain to bypass some blocks
        const urlObj = new URL(url);
        parser.options.headers.Referer = urlObj.origin + '/';

        const feed = await parser.parseURL(url);

        // Special handling for YouTube feeds - manually extract media: fields
        if (url.includes('youtube.com/feeds')) {
            const response = await axios.get(url, { headers: parser.options.headers });
            const xmlText = response.data;

            feed.items = feed.items.map((item, index) => {
                // Extract media:thumbnail URL
                const thumbnailMatch = xmlText.match(new RegExp(`<entry[^>]*>[\\s\\S]*?<yt:videoId>${item.id?.split(':').pop() || ''}</yt:videoId>[\\s\\S]*?<media:thumbnail url="([^"]+)"`, 'i'));
                if (thumbnailMatch) {
                    item['media:thumbnail'] = { $: { url: thumbnailMatch[1] } };
                    item.thumbnail = thumbnailMatch[1];
                }

                // Extract media:description
                const descMatch = xmlText.match(new RegExp(`<yt:videoId>${item.id?.split(':').pop() || ''}</yt:videoId>[\\s\\S]*?<media:description>([\\s\\S]*?)</media:description>`, 'i'));
                if (descMatch) {
                    item['media:description'] = descMatch[1].trim();
                    item.contentSnippet = descMatch[1].trim().substring(0, 300);
                }

                return item;
            });
        }

        res.json(feed);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch RSS', message: error.message });
    }
});

app.get('/api/feeds', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT * FROM feeds');
        await connection.end();
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch feeds', message: error.message });
    }
});

app.post('/api/feeds', async (req, res) => {
    const { name, url, category } = req.body;
    if (!name || !url) return res.status(400).json({ error: 'Name and URL are required' });
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [result] = await connection.execute(
            'INSERT INTO feeds (name, url, category) VALUES (?, ?, ?)',
            [name, url, category || 'my-feed']
        );
        await connection.end();
        res.json({ id: result.insertId, name, url, category });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add feed', message: error.message });
    }
});

app.delete('/api/feeds/:id', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);
        await connection.execute('DELETE FROM feeds WHERE id = ?', [req.params.id]);
        await connection.end();
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete feed', message: error.message });
    }
});

initDB().then(() => {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
});
