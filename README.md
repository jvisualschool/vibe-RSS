# 🖼️ Vibe RSS (v1.2) - Premium Visual RSS Reader

**Vibe RSS**는 단순한 텍스트 나열을 넘어, 전 세계와 국내의 고품질 콘텐츠를 매거진 스타일로 즐길 수 있는 프리미엄 시각적 RSS 리더입니다. 알고리즘에 지워진 정보가 아닌, 내가 원하는 채널의 영감을 가장 아름다운 레이아웃으로 전달합니다.

## 🌐 Live Demo
**[https://jvibeschool.org/RSS](https://jvibeschool.org/RSS)**

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
*   **Library**: React (v19)
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
│   ├── index.css      # 테마 변수 및 글로벌 스타일
│   ├── splash.css     # 스플래시 모달 스타일
│   └── main.jsx       # React Entry point
├── server.js          # Express RSS Proxy 및 API 서버
├── .env.example       # 환경 변수 템플릿
├── package.json       # 종속성 관리
└── README.md          # 서비스 문서
```

---

## 🚀 설치 및 시작하기 (Getting Started)

### 1. 환경 설정
```bash
cp .env.example .env
# .env 파일에서 DB 정보 수정
```

### 2. 의존성 설치
```bash
npm install
```

### 3. 로컬 실행
```bash
npm run dev  # Frontend + Backend 동시 실행
```

### 4. 빌드 및 배포
```bash
npm run build
```

---

## 📰 제공 채널 (Standard Channels)
현재 **Tech, Design, Architecture, Fashion, Art, Photo, News, Entertainment** 등 50개 이상의 엄선된 글로벌/국내 채널이 기본으로 제공됩니다.

---

## 💡 RSS Trivia (30가지)
Vibe RSS는 로딩 중 다음과 같은 정보를 랜덤으로 제공합니다:

1. RSS는 'Really Simple Syndication'의 약자입니다.
2. 최초의 RSS 버전은 1999년 넷스케이프에서 개발되었습니다.
3. RSS는 웹사이트를 일일이 방문하지 않아도 새 콘텐츠를 받아보게 해줍니다.
4. RSS 리더는 '뉴스 어그리게이터'라고도 불립니다.
5. RSS는 XML(Extensible Markup Language) 형식을 기반으로 합니다.
6. 팟캐스트 구독의 핵심 기술도 바로 RSS입니다.
7. 구글 리더는 한때 가장 인기 있는 RSS 리더였으나 2013년에 종료되었습니다.
8. RSS 피드는 보통 .xml 또는 .rss 확장자를 가집니다.
9. 피드(Feed)라는 용어는 '정보를 공급한다'는 의미에서 유래했습니다.
10. RSS 아이콘의 주황색 사각형과 전파 모양은 전 세계 공통 표준입니다.
11. 아론 슈워츠는 14세의 나이로 RSS 1.0 사양 개발에 참여했습니다.
12. RSS를 사용하면 알고리즘의 방해 없이 원하는 정보만 순서대로 볼 수 있습니다.
13. Atom은 RSS의 한계를 극복하기 위해 만들어진 또 다른 피드 규격입니다.
14. 대부분의 블로그 플랫폼은 자동으로 RSS를 생성합니다.
15. RSS는 이메일 뉴스레터보다 개인정보 보호 측면에서 유리합니다.
16. '구독' 버튼 하나로 여러 사이트의 소식을 한곳에서 모아볼 수 있습니다.
17. RSS는 데이터 사용량을 절약하면서 가볍게 정보를 확인하기 좋습니다.
18. 신문사의 속보 서비스는 대개 RSS를 통해 가장 먼저 배포됩니다.
19. RSS는 '웹 2.0' 시대를 열었던 핵심 기술 중 하나입니다.
20. 데이브 위너는 RSS 2.0 사양을 확립한 주요 인물입니다.
21. RSS는 텍스트뿐만 아니라 미디어 정보도 포함할 수 있습니다.
22. 검색 엔진은 RSS 피드로 사이트의 업데이트를 빠르게 파악합니다.
23. RSS는 광고 없는 깨끗한 본문 읽기 환경을 제공하기도 합니다.
24. 많은 개발자들은 깃허브의 커밋 로그를 RSS로 추적합니다.
25. RSS는 20년이 넘은 기술이지만 여전히 강력한 큐레이션 도구입니다.
26. 나만의 맞춤형 신문을 만드는 것, 그것이 바로 RSS의 본질입니다.
27. RSS 피드에는 제목, 링크, 요약글, 발행 날짜 정보가 포함됩니다.
28. 'JSON Feed'는 XML 대신 JSON을 사용하는 현대적인 대안입니다.
29. RSS가 없는 사이트도 'RSS Bridge' 같은 도구로 피드 생성이 가능합니다.
30. Vibe RSS는 당신의 영감을 위해 가장 아름다운 RSS 경험을 제공합니다.

---

## 👨‍💻 Developer
**Jinho Jung**

---

**Vibe RSS**와 함께 당신만의 시각적 뉴스룸을 완성해보세요. 🚀✨
