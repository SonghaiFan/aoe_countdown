# Paper Deadline Countdown

A Next.js application to track academic conference deadlines in Anywhere on Earth (AoE) timezone. Never miss a paper submission deadline again!

## Features

- Track multiple conference deadlines simultaneously
- Support for both abstract and full paper deadlines
- Visual indicators for deadline urgency
- Local storage persistence for user-added conferences
- Real-time countdown in AoE timezone
- Responsive design for all devices
- Dark mode support

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technology Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Date Handling**: date-fns
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Geist Mono

## Project Structure

```
src/
├── app/                # Next.js app directory
├── components/         # React components
│   ├── ui/            # Shadcn UI components
│   └── ...            # Custom components
├── lib/               # Utility functions
├── hooks/             # Custom React hooks
└── data/              # Conference data
```

## Features in Detail

### Time Display

- Shows both local time and AoE (UTC-12) time
- Displays user's location based on timezone

### Conference Management

- Built-in list of visualization conferences
- Add custom conferences with abstract/paper deadlines
- Persistent storage of user-added conferences

### Countdown Display

- Real-time countdown to deadlines
- Color-coded status indicators:
  - Green: Safe (> 30 days)
  - Blue: Approaching (≤ 30 days)
  - Yellow: Urgent (≤ 7 days)
  - Orange: Critical (≤ 3 days)
  - Red: Expired

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for your own purposes.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Fonts from [Vercel](https://vercel.com/font)
