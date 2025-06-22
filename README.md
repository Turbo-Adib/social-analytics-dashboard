# Social Analytics Dashboard

A modern web application for tracking social media statistics across multiple platforms including YouTube, Twitch, Instagram, and TikTok. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Multi-Platform Support**: Track analytics from YouTube, Twitch, Instagram, and TikTok
- **Real-time Stats**: Get up-to-date follower counts, views, and engagement metrics
- **Historical Data**: View growth trends with interactive charts
- **Growth Insights**: Daily, weekly, and monthly change tracking
- **Search Functionality**: Search by username or paste channel URLs
- **Mobile Responsive**: Clean, fast interface optimized for all devices
- **API Integration**: Leverages official platform APIs for accurate data
- **Caching**: Redis-powered caching to optimize API usage

## Tech Stack

- **Frontend**: Next.js 14, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Caching**: Redis
- **Charts**: Recharts
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Redis server
- API keys for platforms you want to support

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your database URL and API keys in `.env.local`

3. Set up the database:
   ```bash
   npm run db:push
   npm run db:generate
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## API Keys Setup

### YouTube Data API v3
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable YouTube Data API v3
4. Create credentials (API Key)
5. Add to `YOUTUBE_API_KEY` in `.env.local`

### Twitch API
1. Go to [Twitch Developer Console](https://dev.twitch.tv/console)
2. Register a new application
3. Get Client ID and Client Secret
4. Add to `TWITCH_CLIENT_ID` and `TWITCH_CLIENT_SECRET`

### Instagram & TikTok
- Instagram: Requires Instagram Basic Display API setup
- TikTok: Uses TikTok Research API (business approval required)

## Development Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio

## Usage

1. **Search**: Enter a channel name or paste a URL from supported platforms
2. **Platform Detection**: The app automatically detects the platform from URLs
3. **Analytics**: View comprehensive statistics including followers, views, and growth metrics
4. **Historical Data**: Explore growth trends over time with interactive charts
5. **Refresh**: Click refresh to get the latest data (cached for 1 hour)

## Architecture

- **Frontend**: React components with server-side rendering
- **API Routes**: Next.js API routes handle platform integrations
- **Database**: PostgreSQL stores channel data and historical metrics
- **Caching**: Redis caches API responses to respect rate limits
- **Platform Services**: Modular service classes for each social platform

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
