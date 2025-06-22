# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Social Analytics Dashboard - A Next.js 14 application for tracking YouTube channel statistics, subscriber growth, and engagement analytics.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio database viewer

## Architecture

### Tech Stack
- **Frontend**: Next.js 14 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS with Lucide React icons
- **Database**: PostgreSQL with Prisma ORM
- **Caching**: Redis for API response caching
- **Charts**: Recharts for data visualization

### Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── channel/           # Dynamic channel pages
│   └── page.tsx           # Homepage
├── components/            # React components
├── lib/                   # Utility libraries
│   ├── platforms/         # Platform API integrations
│   ├── prisma.ts         # Prisma client
│   ├── redis.ts          # Redis client
│   └── utils.ts          # Helper functions
└── types/                 # TypeScript type definitions
```

### Database Schema
- **Platform**: Stores supported platforms (YouTube, Twitch, etc.)
- **Channel**: Channel information and metadata
- **Metric**: Historical statistics data with timestamps

### API Integration
Platform services in `src/lib/platforms/`:
- YouTube Data API v3 for comprehensive channel analytics
- Smart URL parsing for all YouTube URL formats
- Intelligent channel name search and matching

### Key Features
- YouTube channel analytics and statistics
- Real-time stats with 1-hour caching
- Historical data visualization with interactive charts
- Growth tracking (daily/weekly/monthly changes)
- Flexible search: channel names or any YouTube URL format
- Mobile-responsive UI with YouTube branding

## Environment Setup

Required environment variables in `.env.local`:
- `DATABASE_URL` - PostgreSQL connection string
- `REDIS_URL` - Redis connection string
- `YOUTUBE_API_KEY` - YouTube Data API v3 key

## Development Workflow

1. Set up environment variables from `.env.example`
2. Install dependencies and generate Prisma client
3. Push database schema with `npm run db:push`
4. Start development server with `npm run dev`
5. Use Prisma Studio for database inspection

## API Routes

- `/api/channel/[platform]/[username]` - Fetch channel statistics
- Handles caching, database storage, and growth calculations
- Returns JSON with current stats and historical data