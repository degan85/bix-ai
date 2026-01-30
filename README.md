# BIX AI

> BIX5 비개발자를 위한 AI 코드 생성기

## 🚀 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

```bash
cp .env.example .env.local
```

`.env.local` 파일에 OpenAI API 키 입력:

```
OPENAI_API_KEY=sk-your-api-key-here
```

### 3. 개발 서버 실행

```bash
npm run dev
```

http://localhost:3000 접속

## 📋 기능

- 자연어로 BIX5 위젯 설명 → 코드 자동 생성
- 지원 위젯: KPI 카드, 버튼, 카드 그리드, 테이블, 검색/필터
- 복사 버튼으로 즉시 BIX5에 붙여넣기 가능

## 🛠 기술 스택

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- OpenAI GPT-4o-mini

## 📁 구조

```
app/
├── src/
│   ├── app/
│   │   ├── api/generate/route.ts  # AI 코드 생성 API
│   │   ├── page.tsx               # 메인 UI
│   │   ├── layout.tsx
│   │   └── globals.css
│   └── components/
├── package.json
└── ...
```

## 🔧 배포

Vercel 추천:

```bash
npm run build
vercel deploy
```

---

Made with 💪 by 우버 & 대근
