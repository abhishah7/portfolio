# Developer Portfolio - React + Vite Version

This is a React.js version of the developer portfolio, converted from Next.js.

## Features

- ⚡ Built with **React 19** and **Vite**
- 🎨 Styled with **Tailwind CSS** and **SCSS**
- 🧭 Client-side routing with **React Router v6**
- 📱 Fully responsive design
- 🎯 Smooth animations with **Lottie React**
- 📝 Blog integration with Dev.to API
- ✉️ Contact form with email notification
- 🎪 Marquee effect for skills showcase

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or pnpm

### Installation

1. Install dependencies:

```bash
npm install
# or
pnpm install
```

2. Start the development server:

```bash
npm run dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
# or
pnpm build
```

The optimized files will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
# or
pnpm preview
```

## Project Structure

```
src/
├── components/         # React components
│   ├── helper/        # Helper components
│   ├── homepage/      # Homepage section components
│   ├── navbar.jsx
│   └── footer.jsx
├── pages/             # Page components
├── utils/             # Utility functions and data
├── css/               # Stylesheets
├── assets/            # Static assets (lottie, svgs)
├── App.jsx            # Main app component
└── main.jsx           # Entry point
```

## Key Changes from Next.js

1. **Routing**: Changed from Next.js file-based routing to React Router v6
2. **Images**: Changed from Next.js `Image` component to HTML `img` tags
3. **Link Navigation**: Changed from Next.js `Link` to React Router's `Link`
4. **Server Functions**: Removed server-side functions, all data fetching is now client-side
5. **API Routes**: Convert API routes to a separate backend (Node.js/Express recommended)

## Environment Variables

Create a `.env` file in the root directory:

```env
# API endpoint for contact form
VITE_API_URL=http://localhost:3001
```

## Dependencies

- **react**: UI library
- **react-dom**: React DOM rendering
- **react-router-dom**: Client-side routing
- **tailwindcss**: Utility-first CSS framework
- **lottie-react**: Animation library
- **react-icons**: Icon library
- **react-fast-marquee**: Marquee effect
- **axios**: HTTP client
- **react-toastify**: Toast notifications

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.

## Author

ABHISHEK GOND - [Portfolio](https://.vercel.app)

---

**Note**: This React version uses client-side rendering only. For the contact form to work properly, you'll need to set up a backend API endpoint.
