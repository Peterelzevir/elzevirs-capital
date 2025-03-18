# Elzevir's Capital - Cryptocurrency Portfolio

A modern, professional cryptocurrency portfolio website featuring Bitcoin, Solana, BNB, and XRP holdings with real-time market data and interactive visualizations.

## Features

- **Modern Design**: Sleek dark and light theme with professional aesthetics
- **Interactive UI**: Smooth scrolling, animations, and transitions
- **Cryptocurrency Portfolio**: Display and track holdings with real-time market data
- **Price Charts**: Interactive price charts with multiple time ranges
- **Responsive Layout**: Optimized for all device sizes
- **Performance Optimized**: Fast loading and rendering

## Tech Stack

- **Next.js**: React framework for server-side rendering and optimized performance
- **TypeScript**: Type-safe JavaScript for improved development experience
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Shadcn UI**: Accessible and customizable UI components
- **GSAP**: Industry-standard animation library
- **Framer Motion**: Animation framework for React
- **Three.js**: 3D graphics library for immersive backgrounds
- **Recharts**: Responsive charting library for cryptocurrency data visualization
- **CoinGecko API**: Real-time cryptocurrency market data

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn installed

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Peterelzevir/elzevirs-capital.git
cd elzevirs-capital
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the website.

## Project Structure

```
elzevirs-capital/
├── public/                  # Static assets
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/          # UI components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   ├── styles/              # Custom styles
│   └── types/               # TypeScript type definitions
├── .env                     # Environment variables
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

## Deployment

This project is optimized for deployment on Vercel:

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Configure your environment variables
4. Deploy!

## API Usage

The website uses the CoinGecko API to fetch cryptocurrency data. The free tier has rate limits, so consider upgrading to a paid plan for production use with high traffic.

## License

MIT License

## Acknowledgements

- Icons provided by Lucide React
- Cryptocurrency data provided by CoinGecko
- UI components inspired by Shadcn UI