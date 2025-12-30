# 🖼️ Vibe RSS (v1.2) - Premium Visual RSS Reader

**Vibe RSS**는 단순한 텍스트 나열을 넘어, 전 세계와 국내의 고품질 콘텐츠를 매거진 스타일로 즐길 수 있는 프리미엄 시각적 RSS 리더입니다. 알고리즘에 지워진 정보가 아닌, 내가 원하는 채널의 영감을 가장 아름다운 레이아웃으로 전달합니다.

---

## ✨ 핵심 기능 (Key Features)

### 1. 🍱 Visual Discovery (Bento Gallery)
*   **Bento-style Layout**: 다양한 크기의 사각형이 정교하게 맞물린 디자인으로 전체 채널의 썸네일을 한눈에 탐색합니다.
*   **Smart Caching**: 10분 간격의 스마트 캐싱 시스템으로 시각적 탐색 속도를 극대화했습니다.
*   **Inspiration Randomizer**: 로딩 중 30가지 RSS 상식(Trivia)을 랜덤으로 보여주며 영감을 자극합니다.

### 2. 🎨 4가지 프리미엄 테마 (Themes)
*   **FeedHub (Magazine)**: 시원한 그리드 레이아웃과 대형 썸네일 중심의 매거진 스타일.
*   **FlowReader (Light)**: 깔끔하고 정제된 미니멀 화이트 레이아웃.
*   **NightReader (Dark)**: 우아한 보라색 포인트를 활용한 다크 모드 리스트 뷰.
*   **Chronicle (Editorial)**: 세리프 폰트를 활용한 프리미엄 신문/사설 스타일.

### 3. 🖼️ 고도화된 이미지 추출 엔진
*   **Multi-Source Extraction**: RSS 메타데이터뿐만 아니라 본문 HTML을 샅샅이 뒤져 가장 적절한 대표 이미지를 자동으로 찾아냅니다.
*   **Relative Path Fixer**: Naver D2 등 상대 경로 이미지를 사용하는 사이트들을 위해 자동 절대 경로 변환 로직이 포함되어 있습니다.
*   **Duplicate Preventer**: 상단 Hero 이미지와 본문 내 이미지가 중복되지 않도록 지능적으로 필터링합니다.

### 4. ⌨️ 생산성 및 편의성
*   **Keyboard Shortcuts**: 
    *   `⌘/Ctrl + K`: 검색창 즉시 포커스
    *   `방향키(←/→, ↑/↓)`: 기사 간 빠른 탐색
*   **Share & Bookmark**: 마음에 드는 기사는 로컬 스토리지에 북마크하거나 즉시 링크를 복사하여 공유할 수 있습니다.

---

## 🛠 기술 스택 (Tech Stack)

### **Frontend**
*   **Library**: React (v18+)
*   **Build Tool**: Vite
*   **Styling**: Vanilla CSS (Custom Design System)
*   **Icons**: Lucide React
*   **State Management**: React Hooks (useState, useEffect, useMemo)

### **Backend**
*   **Runtime**: Node.js
*   **Framework**: Express
*   **RSS Parsing**: `rss-parser` (Custom field mapping 적용)
*   **Database**: MySQL (유저 커스텀 피드 저장용)
*   **Process Management**: PM2

---

## 📂 프로젝트 구조 (Structure)

```text
/
├── src/
│   ├── App.jsx        # 핵심 서비스 로직 및 UI 컴포넌트
│   ├── App.css        # 테마 시스템 및 Bento 그리드 스타일링
│   └── main.jsx       # React Entry point
├── server.js          # Express RSS Proxy 및 API 서버
├── package.json       # 종속성 관리
└── README.md          # 서비스 문서
```

---

## 🚀 설치 및 시작하기 (Getting Started)

### 1. 환경 설정
MySQL 데이터베이스를 생성하고 `server.js`의 `dbConfig`를 수정합니다.

### 2. 의존성 설치
```bash
npm install
```

### 3. 로컬 실행
```bash
# Backend 실행 (Port 3001)
node server.js

# Frontend 실행
npm run dev
```

### 4. 빌드 및 배포
```bash
npm run build
```

---

## 📰 제공 채널 (Standard Channels)
현재 **Tech, Design, Architecture, Fashion, Art, Photo, News, Entertainment** 등 30개 이상의 엄선된 글로벌/국내 채널이 기본으로 제공됩니다.

---

## 💡 RSS Trivia
Vibe RSS는 로딩 중 다음과 같은 정보를 제공합니다:
- *최초의 RSS 버전은 1999년 넷스케이프에서 개발되었습니다.*
- *RSS는 'Really Simple Syndication'의 약자입니다.*
- *팟캐스트 구독의 핵심 기술도 바로 RSS입니다.*

---

**Vibe RSS**와 함께 당신만의 시각적 뉴스룸을 완성해보세요. 🚀✨
