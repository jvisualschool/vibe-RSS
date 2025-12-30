import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import './splash.css';
import {
  Moon, Sun, LayoutGrid, BookOpen, Search, Plus, X,
  ExternalLink, Rss, Settings, Bookmark, Command, Layout, RotateCcw,
  Maximize2, Minimize2, ChevronLeft, ChevronRight, Share2,
  Cpu, Newspaper, Palette, TrendingUp, Heart, Globe, Lightbulb, Image,
  Landmark, Shirt, Brush, Camera, Sparkles, Coffee
} from 'lucide-react';

const CATEGORIES = {
  tech: { name: 'Tech & Digital', icon: <Cpu size={18} /> },
  design: { name: 'Design', icon: <Palette size={18} /> },
  arch: { name: 'Architecture', icon: <Landmark size={18} /> },
  fashion: { name: 'Fashion & Style', icon: <Shirt size={18} /> },
  art: { name: 'Art & Illustration', icon: <Brush size={18} /> },
  photo: { name: 'Photography', icon: <Camera size={18} /> },
  creative: { name: 'Creative', icon: <Sparkles size={18} /> },
  lifestyle: { name: 'Lifestyle', icon: <Coffee size={18} /> },
  news: { name: 'News & Media', icon: <Newspaper size={18} /> }
};

const RECOMMENDATIONS = [
  // News & Media
  { id: 'n1', name: '조선일보', url: 'https://www.chosun.com/arc/outboundfeeds/rss/?outputType=xml', category: 'news' },
  { id: 'n3', name: '한겨레', url: 'https://www.hani.co.kr/rss/', category: 'news' },

  // Tech & Digital
  { id: 't1', name: 'NASA Breaking', url: 'https://www.nasa.gov/feed/', category: 'tech' },
  { id: 't2', name: 'The Verge', url: 'https://www.theverge.com/rss/index.xml', category: 'tech' },
  { id: 't3', name: 'TechCrunch', url: 'https://techcrunch.com/feed/', category: 'tech' },
  { id: 't4', name: 'Wired', url: 'https://www.wired.com/feed/rss', category: 'tech' },
  { id: 't5', name: 'Fast Company Design', url: 'https://feeds.feedburner.com/fastcodesign/feed', category: 'tech' },
  { id: 't6', name: 'It\'s Nice That', url: 'https://feeds.feedburner.com/itsnicethat/SlXC', category: 'tech' },
  { id: 't7', name: 'Naver D2', url: 'https://d2.naver.com/d2.atom', category: 'tech' },
  { id: 't8', name: 'Toss Tech', url: 'https://toss.tech/rss.xml', category: 'tech' },
  { id: 't9', name: '노정석 (AI & Science)', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCz-BiVywYdO6iXhjXkw_Kgw', category: 'tech' },
  { id: 't10', name: 'AI LABS', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCelfWQr9sXVMTvBzviPGlFw', category: 'tech' },
  { id: 't11', name: 'T Times TV', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCelFN6fJ6OY6v8pbc_SLiXA', category: 'tech' },
  { id: 't12', name: 'Stefan AI & 3D', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCRW08KcTVjXEmBzBsVl7XjA', category: 'tech' },
  { id: 't13', name: 'Google Antigravity', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UC_eVxIPHFZm7oF_gET0x-8Q', category: 'tech' },

  // Design
  { id: 'd1', name: 'Dezeen', url: 'https://www.dezeen.com/feed/', category: 'design' },
  { id: 'd2', name: 'Designboom', url: 'https://www.designboom.com/feed/', category: 'design' },
  { id: 'd3', name: 'Design Milk', url: 'https://feeds.feedburner.com/design-milk', category: 'design' },
  { id: 'd4', name: 'Yanko Design', url: 'https://www.yankodesign.com/feed/', category: 'design' },
  { id: 'd5', name: 'The Dieline', url: 'https://thedieline.com/feed/', category: 'design' },
  { id: 'd6', name: '디자인프레스', url: 'https://www.designpress.com/rss', category: 'design' },
  { id: 'd7', name: 'UX/UI Design', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCxRnfrmJAkRLarzeBJETB5g', category: 'design' },
  { id: 'd8', name: 'DesignCourse', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCVyRiMvfUNMA1UPlDPzG5Ow', category: 'design' },

  // Architecture & Interior
  { id: 'r1', name: 'ArchDaily', url: 'https://www.archdaily.com/feed', category: 'arch' },
  { id: 'r2', name: 'Arch2O', url: 'https://www.arch2o.com/feed/', category: 'arch' },
  { id: 'r3', name: 'Yatzer', url: 'https://www.yatzer.com/feed', category: 'arch' },
  { id: 'r4', name: 'Leibal', url: 'https://leibal.com/feed/', category: 'arch' },

  // Fashion & Lifestyle
  { id: 'f1', name: 'Highsnobiety', url: 'https://www.highsnobiety.com/feed/', category: 'fashion' },
  { id: 'f2', name: 'Hypebeast', url: 'https://hypebeast.com/feed', category: 'fashion' },
  { id: 'f3', name: 'Wallpaper*', url: 'https://www.wallpaper.com/feed', category: 'fashion' },
  { id: 'f4', name: 'Dwell', url: 'https://www.dwell.com/feed', category: 'fashion' },

  // Art & Illustration
  { id: 'a1', name: 'Colossal', url: 'https://www.thisiscolossal.com/feed/', category: 'art' },
  { id: 'a2', name: 'Creative Boom', url: 'https://www.creativeboom.com/feed/', category: 'art' },
  { id: 'a3', name: 'Booooooom', url: 'https://www.booooooom.com/feed/', category: 'art' },
  { id: 'a4', name: 'Hi-Fructose', url: 'https://hifructose.com/feed/', category: 'art' },
  { id: 'a5', name: 'Juxtapoz', url: 'https://www.juxtapoz.com/feed/', category: 'art' },

  // Photography
  { id: 'p2', name: 'Unsplash Blog', url: 'https://unsplash.com/blog/rss/', category: 'photo' },
  { id: 'p3', name: 'PetaPixel', url: 'https://petapixel.com/feed/', category: 'photo' },
  { id: 'p4', name: 'Fstoppers', url: 'https://fstoppers.com/feed', category: 'photo' },
  { id: 'p5', name: 'Photography Life', url: 'https://photographylife.com/feed', category: 'photo' },
  { id: 'p6', name: 'British Journal of Photography', url: 'https://www.1854.photography/feed/', category: 'photo' },

  // Creative & Others
  { id: 'c1', name: 'Abduzeedo', url: 'https://abduzeedo.com/rss.xml', category: 'creative' },
  { id: 'c2', name: 'Creative Bloq', url: 'https://www.creativebloq.com/feed?x=1', category: 'creative' },

  // Lifestyle
  { id: 'l1', name: 'urdesignmag', url: 'https://www.urdesignmag.com/feed/', category: 'lifestyle' },
  { id: 'l2', name: 'Beautiful Life', url: 'https://www.beautifullife.info/feed/', category: 'lifestyle' },
  { id: 'l3', name: 'Core77', url: 'https://www.core77.com/blog/rss.xml', category: 'lifestyle' },
  { id: 'l4', name: 'Vogue Korea', url: 'https://www.vogue.co.kr/feed/', category: 'lifestyle' },
  { id: 'l6', name: 'W Korea', url: 'https://www.wkorea.com/feed/', category: 'lifestyle' }
];

const THEMES = [
  { id: 'magazine', name: 'FeedHub', icon: LayoutGrid, desc: 'Magazine Style' },
  { id: 'light', name: 'FlowReader', icon: Sun, desc: 'Minimal Light' },
  { id: 'dark', name: 'NightReader', icon: Moon, desc: 'Elegant Dark' },
  { id: 'editorial', name: 'Dezeen', icon: BookOpen, desc: 'Premium Editorial' }
];

const RSS_TRIVIA = [
  "RSS는 'Really Simple Syndication'의 약자입니다.",
  "최초의 RSS 버전은 1999년 넷스케이프에서 개발되었습니다.",
  "RSS는 웹사이트를 일일이 방문하지 않아도 새 콘텐츠를 받아보게 해줍니다.",
  "RSS 리더는 '뉴스 어그리게이터'라고도 불립니다.",
  "RSS는 XML(Extensible Markup Language) 형식을 기반으로 합니다.",
  "팟캐스트 구독의 핵심 기술도 바로 RSS입니다.",
  "구글 리더는 한때 가장 인기 있는 RSS 리더였으나 2013년에 종료되었습니다.",
  "RSS 피드는 보통 .xml 또는 .rss 확장자를 가집니다.",
  "피드(Feed)라는 용어는 '정보를 공급한다'는 의미에서 유래했습니다.",
  "RSS 아이콘의 주황색 사각형과 전파 모양은 전 세계 공통 표준입니다.",
  "아론 슈워츠는 14세의 나이로 RSS 1.0 사양 개발에 참여했습니다.",
  "RSS를 사용하면 알고리즘의 방해 없이 원하는 정보만 순서대로 볼 수 있습니다.",
  "Atom은 RSS의 한계를 극복하기 위해 만들어진 또 다른 피드 규격입니다.",
  "대부분의 블로그 플랫폼은 자동으로 RSS를 생성합니다.",
  "RSS는 이메일 뉴스레터보다 개인정보 보호 측면에서 유리합니다.",
  "'구독' 버튼 하나로 여러 사이트의 소식을 한곳에서 모아볼 수 있습니다.",
  "RSS는 데이터 사용량을 절약하면서 가볍게 정보를 확인하기 좋습니다.",
  "신문사의 속보 서비스는 대개 RSS를 통해 가장 먼저 배포됩니다.",
  "RSS는 '웹 2.0' 시대를 열었던 핵심 기술 중 하나입니다.",
  "데이브 위너는 RSS 2.0 사양을 확립한 주요 인물입니다.",
  "RSS는 텍스트뿐만 아니라 미디어 정보도 포함할 수 있습니다.",
  "검색 엔진은 RSS 피드로 사이트의 업데이트를 빠르게 파악합니다.",
  "RSS는 광고 없는 깨끗한 본문 읽기 환경을 제공하기도 합니다.",
  "많은 개발자들은 깃허브의 커밋 로그를 RSS로 추적합니다.",
  "RSS는 20년이 넘은 기술이지만 여전히 강력한 큐레이션 도구입니다.",
  "나만의 맞춤형 신문을 만드는 것, 그것이 바로 RSS의 본질입니다.",
  "RSS 피드에는 제목, 링크, 요약글, 발행 날짜 정보가 포함됩니다.",
  "'JSON Feed'는 XML 대신 JSON을 사용하는 현대적인 대안입니다.",
  "RSS가 없는 사이트도 'RSS Bridge' 같은 도구로 피드 생성이 가능합니다.",
  "Vibe RSS는 당신의 영감을 위해 가장 아름다운 RSS 경험을 제공합니다."
];

const API_BASE = window.location.hostname === 'localhost'
  ? 'http://localhost:3001/api'
  : window.location.origin + '/RSS/api';

function App() {
  const [theme, setTheme] = useState('magazine');
  const [selectedFeed, setSelectedFeed] = useState(RECOMMENDATIONS[0]);
  const [articles, setArticles] = useState([]);
  const [userFeeds, setUserFeeds] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [feedLink, setFeedLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState('reader'); // 'reader' or 'gallery'
  const [galleryArticles, setGalleryArticles] = useState([]);
  const [randomTrivia, setRandomTrivia] = useState(RSS_TRIVIA[0]);

  // UI states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [newFeedName, setNewFeedName] = useState('');
  const [newFeedUrl, setNewFeedUrl] = useState('');
  const [showSplash, setShowSplash] = useState(false);
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('vibe_bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('vibe_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const closeSplash = () => {
    setShowSplash(false);
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (showAddModal) setShowAddModal(false);
        if (showSettings) setShowSettings(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showAddModal, showSettings]);

  const fetchUserFeeds = async () => {
    try {
      const res = await fetch(`${API_BASE}/feeds`);
      if (res.ok) {
        const data = await res.json();
        setUserFeeds(data);
      }
    } catch (err) {
      console.error('Failed to fetch user feeds', err);
    }
  };

  useEffect(() => {
    fetchUserFeeds();
    fetchRss(RECOMMENDATIONS[0]);
  }, []);

  const fetchRss = async (feed) => {
    setLoading(true);
    setSelectedFeed(feed);
    setArticles([]);
    setFeedLink('');
    try {
      const response = await fetch(`${API_BASE}/rss?url=${encodeURIComponent(feed.url)}`);
      const data = await response.json();

      if (!response.ok || !data.items) {
        throw new Error(data.message || 'RSS 파싱에 실패했습니다.');
      }

      if (data.link) {
        setFeedLink(data.link);
      } else if (feed.url) {
        // Fallback: extract base domain
        try {
          const urlObj = new URL(feed.url);
          setFeedLink(urlObj.origin);
        } catch (e) { }
      }

      const items = data.items.map(item => {
        // Prioritize media:description for YouTube, then fallback to other content
        const contentStr = item['media:description'] || item['content:encoded'] || item.content || item.description || '';
        // Find FIRST image in ANY available content field
        const allPossibleContent = [
          item['media:description'],
          item['content:encoded'],
          item.content,
          item.description
        ].filter(Boolean).join(' ');

        // Helper to decode HTML entities in URLs
        const decodeHtmlEntities = (url) => {
          if (!url) return url;
          return url
            .replace(/&#038;/g, '&')
            .replace(/&amp;/g, '&')
            .replace(/&#x26;/g, '&');
        };

        // Highly robust regex for <img> tags and various source attributes
        const imgTagMatch = allPossibleContent.match(/<img[^>]+>/i);
        let imgUrl = null;
        if (imgTagMatch) {
          const imgTag = imgTagMatch[0];
          // Try multiple source attributes (common in lazy-loading)
          const srcMatch = imgTag.match(/src\s*=\s*(?:['"]([^'"]+)['"]|([^'"\s>]+))/i);
          const dataSrcMatch = imgTag.match(/data-(?:lazy-)?src\s*=\s*(?:['"]([^'"]+)['"]|([^'"\s>]+))/i);
          const dataOrigMatch = imgTag.match(/data-original\s*=\s*(?:['"]([^'"]+)['"]|([^'"\s>]+))/i);

          const potentialUrl = (dataSrcMatch ? (dataSrcMatch[1] || dataSrcMatch[2]) : null) ||
            (dataOrigMatch ? (dataOrigMatch[1] || dataOrigMatch[2]) : null) ||
            (srcMatch ? (srcMatch[1] || srcMatch[2]) : null);

          // Ignore 1x1 pixels or transparent placeholders
          if (potentialUrl && !potentialUrl.includes('1x1') && !potentialUrl.includes('transparent')) {
            imgUrl = decodeHtmlEntities(potentialUrl);
          }
        }

        const getItemUrl = (obj) => {
          if (!obj) return null;
          if (Array.isArray(obj)) return getItemUrl(obj[0]);
          if (typeof obj === 'string') return decodeHtmlEntities(obj);
          return decodeHtmlEntities(obj.url || obj.$?.url || obj.link || null);
        };

        let thumbUrl = item.enclosure?.url ||
          getItemUrl(item['media:content']) ||
          getItemUrl(item['media:thumbnail']) ||
          getItemUrl(item.image) ||
          getItemUrl(item.thumbnail) ||
          getItemUrl(item.thumb) ||
          imgUrl;

        // Hero image for detail view - prioritize content image (full resolution)
        let heroUrl = imgUrl ||
          getItemUrl(item['media:content']) ||
          item.enclosure?.url ||
          getItemUrl(item['media:thumbnail']);

        // Special handling for Naver D2 relative paths
        if (thumbUrl && thumbUrl.startsWith('/') && !thumbUrl.startsWith('//')) {
          thumbUrl = 'https://d2.naver.com' + thumbUrl;
        }
        if (heroUrl && heroUrl.startsWith('/') && !heroUrl.startsWith('//')) {
          heroUrl = 'https://d2.naver.com' + heroUrl;
        }

        // Clean up excerpt - prioritize media:description for YouTube
        const cleanExcerpt = (item['media:description'] || item.contentSnippet || contentStr || '')
          .replace(/<[^>]*>/g, '')
          .replace(/\s+/g, ' ')
          .trim();

        // Handle case where content is missing (e.g. Dribbble)
        let processedContent = contentStr && contentStr.length > 50
          ? contentStr
          : `<div class="content-placeholder">
              <p>이 포스트는 요약 정보를 제공하지 않습니다. 전체 내용을 보려면 원본 사이트를 방문해 주세요.</p>
              <a href="${item.link}" target="_blank" class="placeholder-link">원본 기사 읽기 →</a>
             </div>`;

        // Prevent duplicate hero image in content body
        const imgToRemove = heroUrl || thumbUrl;
        if (imgToRemove && processedContent.includes(imgToRemove)) {
          try {
            const escapedUrl = imgToRemove.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const imgTagRegex = new RegExp(`<img[^>]+src=['"]${escapedUrl}['"][^>]*>`, 'i');
            processedContent = processedContent.replace(imgTagRegex, '');
          } catch (e) {
            console.error('Error removing duplicate image:', e);
          }
        }

        const finalContent = processedContent;

        return {
          id: item.guid || item.link || Math.random().toString(),
          title: item.title?.trim() || '제목 없음',
          excerpt: cleanExcerpt ? (cleanExcerpt.substring(0, 160) + (cleanExcerpt.length > 160 ? '...' : '')) : '내용 요약이 제공되지 않는 포스트입니다.',
          author: item.creator || item.author || feed.name,
          date: item.pubDate ? new Date(item.pubDate).toLocaleString('ko-KR', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '시간 정보 없음',
          source: feed.name,
          category: feed.category,
          content: finalContent,
          link: item.link,
          thumbnail: (thumbUrl && typeof thumbUrl === 'string' && thumbUrl.startsWith('http')) ? thumbUrl : null,
          heroImage: (heroUrl && typeof heroUrl === 'string' && heroUrl.startsWith('http')) ? heroUrl : null
        };
      });
      setArticles(items);
      setSelectedArticle(items[0] || null);
    } catch (error) {
      console.error('Error fetching RSS:', error);
      setArticles([]);
      setSelectedArticle(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAddFeed = async (e) => {
    e.preventDefault();
    if (!newFeedName || !newFeedUrl) return;
    try {
      const res = await fetch(`${API_BASE}/feeds`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newFeedName, url: newFeedUrl })
      });
      if (res.ok) {
        setNewFeedName('');
        setNewFeedUrl('');
        setShowAddModal(false);
        fetchUserFeeds();
      }
    } catch (err) {
      alert('피드 삭제에 실패했습니다.');
    }
  };

  const fetchGallery = async (bypassCache = false) => {
    const CACHE_KEY = 'vibe_gallery_cache';
    const CACHE_TIME_KEY = 'vibe_gallery_cache_time';
    const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

    const now = Date.now();
    const cachedTime = localStorage.getItem(CACHE_TIME_KEY);
    const cachedData = localStorage.getItem(CACHE_KEY);

    if (!bypassCache && cachedTime && cachedData && (now - parseInt(cachedTime) < CACHE_DURATION)) {
      setGalleryArticles(JSON.parse(cachedData));
      setView('gallery');
      return;
    }

    setLoading(true);
    setView('gallery');
    setGalleryArticles([]);
    setRandomTrivia(RSS_TRIVIA[Math.floor(Math.random() * RSS_TRIVIA.length)]);

    // Shuffle recommendations to get fresh mix each time
    const shuffled = [...RECOMMENDATIONS].sort(() => 0.5 - Math.random()).slice(0, 15);

    try {
      const results = await Promise.all(
        shuffled.map(async (feed) => {
          try {
            const res = await fetch(`${API_BASE}/rss?url=${encodeURIComponent(feed.url)}`);
            if (!res.ok) return [];
            const data = await res.json();
            return (data.items || []).slice(0, 3).map(item => processArticle(item, feed));
          } catch (e) {
            return [];
          }
        })
      );

      const allItems = results.flat()
        .filter(item => item.thumbnail) // Only items with images for gallery
        .sort((a, b) => new Date(b.date) - new Date(a.date));

      setGalleryArticles(allItems);

      // Save to cache
      localStorage.setItem(CACHE_KEY, JSON.stringify(allItems));
      localStorage.setItem(CACHE_TIME_KEY, now.toString());
    } catch (error) {
      console.error('Gallery fetch failed', error);
    } finally {
      setLoading(false);
    }
  };

  const processArticle = (item, feed) => {
    const contentStr = item['content:encoded'] || item.content || item.description || '';
    const allPossibleContent = [
      item['content:encoded'],
      item.content,
      item.description
    ].filter(Boolean).join(' ');

    // Helper to decode HTML entities in URLs
    const decodeHtmlEntities = (url) => {
      if (!url) return url;
      return url
        .replace(/&#038;/g, '&')
        .replace(/&amp;/g, '&')
        .replace(/&#x26;/g, '&');
    };

    // Robust regex for <img> tags and various source attributes
    const imgTagMatch = allPossibleContent.match(/<img[^>]+>/i);
    let imgUrl = null;
    if (imgTagMatch) {
      const imgTag = imgTagMatch[0];
      const srcMatch = imgTag.match(/src\s*=\s*(?:['"]([^'"]+)['"]|([^'"\s>]+))/i);
      const dataSrcMatch = imgTag.match(/data-(?:lazy-)?src\s*=\s*(?:['"]([^'"]+)['"]|([^'"\s>]+))/i);
      const dataOrigMatch = imgTag.match(/data-original\s*=\s*(?:['"]([^'"]+)['"]|([^'"\s>]+))/i);

      const potentialUrl = (dataSrcMatch ? (dataSrcMatch[1] || dataSrcMatch[2]) : null) ||
        (dataOrigMatch ? (dataOrigMatch[1] || dataOrigMatch[2]) : null) ||
        (srcMatch ? (srcMatch[1] || srcMatch[2]) : null);

      if (potentialUrl && !potentialUrl.includes('1x1') && !potentialUrl.includes('transparent')) {
        imgUrl = decodeHtmlEntities(potentialUrl);
      }
    }

    // Check for YouTube Video
    const youtubeMatch = allPossibleContent.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
    let youtubeThumb = null;
    if (youtubeMatch && youtubeMatch[1]) {
      youtubeThumb = `https://img.youtube.com/vi/${youtubeMatch[1]}/0.jpg`;
    }

    const getItemUrl = (obj) => {
      if (!obj) return null;
      if (Array.isArray(obj)) return getItemUrl(obj[0]);
      if (typeof obj === 'string') return decodeHtmlEntities(obj);
      return decodeHtmlEntities(obj.url || obj.$?.url || obj.link || null);
    };

    let thumbUrl = item.enclosure?.url ||
      getItemUrl(item['media:content']) ||
      getItemUrl(item['media:thumbnail']) ||
      getItemUrl(item.image) ||
      getItemUrl(item.thumbnail) ||
      getItemUrl(item.thumb) ||
      imgUrl;

    // Use YouTube thumbnail if available and it's Naver D2 or no other image
    if (youtubeThumb && (feed.url.includes('d2.naver.com') || !thumbUrl)) {
      thumbUrl = youtubeThumb;
    }

    // Hero image for detail view - prioritize content image (full resolution)
    let heroUrl = imgUrl ||
      getItemUrl(item['media:content']) ||
      item.enclosure?.url ||
      getItemUrl(item['media:thumbnail']);

    if (youtubeThumb && (feed.url.includes('d2.naver.com') || !heroUrl)) {
      heroUrl = youtubeThumb;
    }

    if (thumbUrl && thumbUrl.startsWith('/') && !thumbUrl.startsWith('//') && feed.url.includes('d2.naver.com')) {
      thumbUrl = 'https://d2.naver.com' + thumbUrl;
    }
    if (heroUrl && heroUrl.startsWith('/') && !heroUrl.startsWith('//') && feed.url.includes('d2.naver.com')) {
      heroUrl = 'https://d2.naver.com' + heroUrl;
    }

    const cleanExcerpt = (item.contentSnippet || contentStr || '')
      .replace(/<[^>]*>/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    let processedContent = contentStr && contentStr.length > 50
      ? contentStr
      : `<div class="content-placeholder">
          <p>이 포스트는 요약 정보를 제공하지 않습니다. 전체 내용을 보려면 원본 사이트를 방문해 주세요.</p>
          <a href="${item.link}" target="_blank" class="placeholder-link">원본 기사 읽기 →</a>
         </div>`;

    if (thumbUrl && processedContent.includes(thumbUrl)) {
      try {
        const escapedUrl = thumbUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const imgTagRegex = new RegExp(`<img[^>]+src=['"]${escapedUrl}['"][^>]*>`, 'i');
        processedContent = processedContent.replace(imgTagRegex, '');
      } catch (e) { }
    }

    return {
      id: item.guid || item.link || Math.random().toString(),
      title: item.title?.trim() || '제목 없음',
      excerpt: cleanExcerpt ? (cleanExcerpt.substring(0, 160) + (cleanExcerpt.length > 160 ? '...' : '')) : '요약 정보 없음',
      author: item.creator || item.author || feed.name,
      date: item.pubDate ? new Date(item.pubDate).toLocaleString('ko-KR', { month: 'short', day: 'numeric' }) : '최근',
      source: feed.name,
      category: feed.category,
      content: processedContent,
      link: item.link,
      thumbnail: (thumbUrl && typeof thumbUrl === 'string' && thumbUrl.startsWith('http')) ? thumbUrl : null,
      heroImage: (heroUrl && typeof heroUrl === 'string' && heroUrl.startsWith('http')) ? heroUrl : null
    };
  };

  const handleFeedClick = (feed) => {
    setView('reader');
    fetchRss(feed);
  };

  const filteredArticles = useMemo(() => {
    return articles.filter(a =>
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [articles, searchTerm]);

  const currentIndex = useMemo(() =>
    filteredArticles.findIndex(a => a.id === selectedArticle?.id),
    [filteredArticles, selectedArticle]
  );

  const goToPrev = () => {
    if (currentIndex > 0) {
      setSelectedArticle(filteredArticles[currentIndex - 1]);
    }
  };

  const goToNext = () => {
    if (currentIndex < filteredArticles.length - 1) {
      setSelectedArticle(filteredArticles[currentIndex + 1]);
    }
  };

  const toggleBookmark = () => {
    if (!selectedArticle) return;
    const isBookmarked = bookmarks.some(b => b.id === selectedArticle.id);
    if (isBookmarked) {
      setBookmarks(bookmarks.filter(b => b.id !== selectedArticle.id));
    } else {
      setBookmarks([...bookmarks, selectedArticle]);
    }
  };

  const handleShare = () => {
    if (selectedArticle) {
      if (navigator.share) {
        navigator.share({
          title: selectedArticle.title,
          url: selectedArticle.link
        }).catch(() => { });
      } else {
        navigator.clipboard.writeText(selectedArticle.link);
        alert('링크가 클립보드에 복사되었습니다.');
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      // ⌘K or Ctrl+K for search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.querySelector('.search-bar input')?.focus();
      }
      // Arrow keys for navigation if not in input
      if (document.activeElement.tagName !== 'INPUT') {
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          e.preventDefault();
          goToPrev();
        }
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          e.preventDefault();
          goToNext();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, filteredArticles]);



  const getFallbackIcon = (article) => {
    const text = (article.title + ' ' + article.excerpt).toLowerCase();

    // Tech / Dev / AI
    if (text.match(/code|tech|dev|programming|ai|api|cloud|software|기술|개발|서버|데이터|인공지능|시스템/))
      return <Cpu size={48} strokeWidth={1.5} />;

    // Design / Creative
    if (text.match(/design|art|creative|color|ux|ui|디자인|아트|기획|사용자/))
      return <Palette size={48} strokeWidth={1.5} />;

    // Economy / Business
    if (text.match(/money|stock|economy|market|business|경제|주식|시장|투자|기업/))
      return <TrendingUp size={48} strokeWidth={1.5} />;

    // News / Media
    if (text.match(/news|press|report|update|latest|뉴스|보도|소식|속보/))
      return <Newspaper size={48} strokeWidth={1.5} />;

    // Life / Health
    if (text.match(/health|life|wellness|mind|건강|생활|일상|심리/))
      return <Heart size={48} strokeWidth={1.5} />;

    // Idea / Guide
    if (text.match(/idea|tip|how to|guide|팁|방법|가이드|소개/))
      return <Lightbulb size={48} strokeWidth={1.5} />;

    // Category fallbacks
    if (article.category === 'tech') return <Cpu size={48} strokeWidth={1.5} />;
    if (article.category === 'news') return <Newspaper size={48} strokeWidth={1.5} />;
    if (article.category === 'economy') return <TrendingUp size={48} strokeWidth={1.5} />;
    if (article.category === 'life') return <Heart size={48} strokeWidth={1.5} />;

    return <Image size={48} strokeWidth={1.5} />;
  };

  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <div className={`app-container ${theme}-version ${isMaximized ? 'is-maximized' : ''}`} data-theme={theme}>
      {/* Sidebar */}
      {!isMaximized && (
        <aside className="sidebar">
          <div className="logo-section">
            <div className="logo-icon" onClick={() => setShowSplash(true)}>
              <Rss size={18} color="white" />
            </div>
            <span className="logo-text" onClick={() => setView('reader')}>Vibe RSS</span>
            <button
              className={`gallery-toggle ${view === 'gallery' ? 'active' : ''}`}
              onClick={fetchGallery}
              title="Visual Gallery"
            >
              <Layout size={18} />
            </button>
          </div>

          <div className="nav-section">
            <div className="styles-area">
              <div className="section-title">Styles</div>
              <div className="theme-grid">
                {THEMES.map(t => (
                  <button key={t.id} onClick={() => setTheme(t.id)}
                    className={`theme-btn ${theme === t.id ? 'active' : ''}`} title={t.name}>
                    <t.icon size={18} />
                  </button>
                ))}
              </div>
            </div>

            <div className="channels-area">
              <div className="section-title">My Channels</div>
              {userFeeds.map(feed => (
                <div key={feed.id} className={`nav-item sub-item ${selectedFeed?.id === feed.id && view === 'reader' ? 'active' : ''}`} onClick={() => handleFeedClick(feed)}>
                  <span className="bullet">·</span>
                  <span className="feed-name">{feed.name}</span>
                  <button className="del-btn" onClick={(e) => handleDeleteFeed(e, feed.id)}><X size={12} /></button>
                </div>
              ))}

              <div className="section-title">Recommended</div>
              {Object.entries(CATEGORIES).map(([key, category]) => (
                <div key={key} className="category-group">
                  <div className="category-header">
                    <span className="category-icon">{category.icon}</span>
                    <span className="category-name">{category.name}</span>
                  </div>
                  {RECOMMENDATIONS.filter(r => r.category === key).map(feed => (
                    <div key={feed.id} className={`nav-item sub-item ${selectedFeed?.id === feed.id && view === 'reader' ? 'active' : ''}`} onClick={() => handleFeedClick(feed)}>
                      <span className="bullet">·</span>
                      <span>{feed.name}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="sidebar-footer">
            <button className="footer-btn" onClick={() => setShowSettings(true)}><Settings size={16} /> <span>Settings</span></button>
            <div className="v-badge">v1.2</div>
          </div>
        </aside>
      )}

      {/* Article List & Content Area or Gallery View */}
      {view === 'gallery' ? (
        <section className="gallery-view">
          <div className="gallery-header">
            <div className="gallery-info">
              <h2>Visual Discovery</h2>
              <div className="badge">{galleryArticles.length} Inspiring items</div>
            </div>
            <button className="refresh-gallery" onClick={() => fetchGallery(true)} title="New Inspiration">
              <RotateCcw size={18} />
            </button>
          </div>

          <div className="bento-grid">
            {loading && galleryArticles.length === 0 ? (
              <div className="gallery-loading">
                <div className="discovery-loader"></div>
                <p className="trivia-text">{randomTrivia}</p>
              </div>
            ) : (
              galleryArticles.map((article, idx) => {
                // Assign different sizes based on index pattern for bento feel
                let bentoClass = "bento-item";
                if (idx % 7 === 0) bentoClass += " bento-large";
                else if (idx % 11 === 0) bentoClass += " bento-wide";
                else if (idx % 13 === 0) bentoClass += " bento-tall";

                return (
                  <div
                    key={article.id}
                    className={bentoClass}
                    onClick={() => {
                      setSelectedArticle(article);
                      setView('reader');
                    }}
                  >
                    <div className="bento-media" style={{ backgroundImage: `url(${article.thumbnail})` }}>
                      <div className="bento-overlay">
                        <div className="bento-meta">
                          <span className="bento-source">{article.source}</span>
                          <span className="bento-date">{article.date}</span>
                        </div>
                        <h3 className="bento-title text-shadow">{article.title}</h3>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      ) : (
        <>
          {/* Article List */}
          {!isMaximized && (
            <section className="article-list">
              <div className="list-header">
                <div className="header-top">
                  <h2
                    className="clickable-site-title"
                    onClick={() => feedLink && window.open(feedLink, '_blank')}
                    title={feedLink ? "개발자/사이트 방문하기" : ""}
                  >
                    {selectedFeed?.name || 'Feed'}
                  </h2>
                  <div className="badge">{filteredArticles.length}</div>
                </div>
                <div className="search-bar">
                  <Search size={16} />
                  <input type="text" placeholder="Search articles... (⌘K)" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                  <div className="kb-hint"><Command size={10} />K</div>
                </div>
              </div>

              <div className={`articles ${theme === 'magazine' ? 'grid-view' : 'list-view'}`}>
                {loading ? (
                  <div className="loading-state">Loading articles...</div>
                ) : (
                  filteredArticles.map(article => (
                    <div key={article.id} className={`article-card ${selectedArticle?.id === article.id ? 'active' : ''}`} onClick={() => setSelectedArticle(article)}>
                      {(theme === 'magazine' || theme === 'dark' || theme === 'editorial') && (
                        <div className="article-thumb">
                          {(article.thumbnail && article.thumbnail.trim() !== '') ? (
                            <div className="thumb-img" style={{ backgroundImage: `url(${article.thumbnail})` }}></div>
                          ) : (
                            <div className="thumb-fallback">
                              {getFallbackIcon(article)}
                            </div>
                          )}
                        </div>
                      )}
                      <div className="card-content">
                        <div className="article-meta">
                          <span className="source">{article.source}</span>
                          <span className="dot">·</span>
                          <span>{article.date}</span>
                        </div>
                        <h3 className="article-title">{article.title}</h3>
                        <p className="article-excerpt">{article.excerpt}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </section>
          )}

          {/* Content Area */}
          <main className="content-area">
            <header className="content-top-nav">
              <div className="nav-controls">
                {isMaximized && (
                  <button onClick={() => setIsMaximized(false)} className="back-btn" style={{ marginRight: '16px' }}>
                    <ChevronLeft size={20} />
                    <span>Back to List</span>
                  </button>
                )}
                <button onClick={goToPrev} disabled={currentIndex <= 0} title="Previous Article">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={goToNext} disabled={currentIndex >= filteredArticles.length - 1 || currentIndex === -1} title="Next Article">
                  <ChevronRight size={20} />
                </button>
              </div>
              <div className="action-controls">
                <button
                  title="Bookmark"
                  onClick={toggleBookmark}
                  className={selectedArticle && bookmarks.some(b => b.id === selectedArticle.id) ? 'active' : ''}
                  style={{ color: selectedArticle && bookmarks.some(b => b.id === selectedArticle.id) ? 'var(--accent)' : 'inherit' }}
                >
                  <Bookmark size={18} fill={selectedArticle && bookmarks.some(b => b.id === selectedArticle.id) ? 'var(--accent)' : 'none'} />
                </button>
                <button title="Share" onClick={handleShare}><Share2 size={18} /></button>
                <button title="Add Feed" onClick={() => setShowAddModal(true)}><Plus size={18} /></button>
                <button
                  className={`primary-action ${isMaximized ? 'active' : ''}`}
                  onClick={() => setIsMaximized(!isMaximized)}
                >
                  {isMaximized ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                  <span>{isMaximized ? 'Minimize' : 'Maximize'}</span>
                </button>
              </div>
            </header>

            {selectedArticle ? (
              <article className="fade-in article-container" key={selectedArticle.id}>
                <div className="content-header">
                  <h1 className="content-title">{selectedArticle.title}</h1>
                  <div className="content-info">
                    <div className="author-img"></div>
                    <span>{selectedArticle.author}</span>
                    <span>·</span>
                    <span>{selectedArticle.source}</span>
                    <span>·</span>
                    <span>{selectedArticle.date}</span>
                    <a href={selectedArticle.link} target="_blank" rel="noopener noreferrer" className="external-link">
                      Open Original <ExternalLink size={14} />
                    </a>
                  </div>
                </div>

                <div className="content-body">
                  {(() => {
                    const youtubeId = getYouTubeVideoId(selectedArticle.link);
                    if (youtubeId) {
                      return (
                        <div className="video-container">
                          <iframe
                            src={`https://www.youtube.com/embed/${youtubeId}`}
                            title={selectedArticle.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      );
                    }
                    return (selectedArticle.heroImage || selectedArticle.thumbnail) && (
                      <div className="body-hero-wrapper">
                        <div className="body-hero" style={{ backgroundImage: `url(${selectedArticle.heroImage || selectedArticle.thumbnail})` }}></div>
                      </div>
                    );
                  })()}
                  <div className="article-text" dangerouslySetInnerHTML={{ __html: selectedArticle.content }}>
                  </div>
                </div>
              </article>
            ) : (
              <div className="empty-state">
                <BookOpen size={48} />
                <p>Select an article to read</p>
                <small>Press <kbd><Command size={10} /></kbd> + <kbd>J</kbd> to next</small>
              </div>
            )}
          </main>
        </>
      )}

      {/* Add Feed Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add New Channel</h3>
              <button onClick={() => setShowAddModal(false)}><X size={18} /></button>
            </div>
            <form onSubmit={handleAddFeed}>
              <div className="input-group">
                <label>Channel Name</label>
                <input type="text" value={newFeedName} onChange={e => setNewFeedName(e.target.value)} placeholder="e.g. Wired Tech" required />
              </div>
              <div className="input-group">
                <label>RSS URL</label>
                <input type="url" value={newFeedUrl} onChange={e => setNewFeedUrl(e.target.value)} placeholder="https://..." required />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit" className="submit-btn shadow-accent">Connect Feed</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="modal-overlay" onClick={() => setShowSettings(false)}>
          <div className="modal-content settings-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Preferences</h3>
              <button onClick={() => setShowSettings(false)}><X size={18} /></button>
            </div>
            <div className="settings-body">
              <div className="setting-group">
                <label>Visual Style</label>
                <div className="style-options">
                  {THEMES.map(t => (
                    <div
                      key={t.id}
                      className={`style-card ${theme === t.id ? 'selected' : ''}`}
                      onClick={() => setTheme(t.id)}
                    >
                      <t.icon size={24} />
                      <div className="style-info">
                        <span className="style-name">{t.name}</span>
                        <span className="style-desc">{t.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button className="submit-btn" onClick={() => setShowSettings(false)}>Done</button>
            </div>
          </div>
        </div>
      )}

      {/* Splash Modal */}
      {showSplash && (
        <div className="splash-overlay" onClick={closeSplash}>
          <div className="splash-modal" onClick={e => e.stopPropagation()}>
            <img src={`${import.meta.env.BASE_URL}splash.jpg`} alt="Vibe RSS" className="splash-image" />
            <div className="splash-header">
              <h1>Vibe RSS</h1>
              <p>Visual Feed Reader</p>
            </div>
            <div className="splash-footer">
              <div className="splash-info">
                <div className="info-row">
                  <strong>Tech Stack:</strong> React + Vite + Node.js + MySQL
                </div>
                <div className="info-row">
                  <strong>Developer:</strong> Jinho Jung
                </div>
                <div className="info-row">
                  <strong>Features:</strong> 4 Premium Themes · Gallery View · YouTube Support · Bookmarks
                </div>
              </div>
              <button className="splash-close" onClick={closeSplash}>Start Reading →</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
