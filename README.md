This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Features

- 🤖 Google Gemini AI integration for content generation
- 🎨 Website builder with drag-and-drop interface
- 💬 Chat interface for AI-powered design assistance
- 🔐 Clerk authentication
- 📊 PostgreSQL database with Drizzle ORM

## Getting Started

### Prerequisites

- Node.js 20.x or later
- npm, yarn, pnpm, or bun
- Google Gemini API key ([Get one here](https://aistudio.google.com/apikey))

### Environment Setup

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Add your environment variables to `.env`:
```bash
GEMINI_API_KEY=your_gemini_api_key_here
# Add other required environment variables
```

### Installation

Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Run the Development Server

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## API Integration

### Google Gemini AI

This project uses Google's Gemini API for AI-powered content generation. The integration is implemented as a Next.js API route at `/api/ai-model`.

**API Endpoint**: `POST /api/ai-model`

**Request Body**:
```json
{
  "prompt": "Your prompt here"
}
```

**Response**:
```json
{
  "text": "Generated content",
  "success": true
}
```

**Usage in Components**:
```typescript
import useGenerateContentMutation from "@/api/ai-model/useGenerateContentMutation";

const { mutate: generateContent, isPending } = useGenerateContentMutation();

generateContent(
  { prompt: "Your prompt" },
  {
    onSuccess: (response) => {
      console.log(response.text);
    }
  }
);
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
