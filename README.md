# Official Musician Website Template

A production-ready, rollout-ready template for building an official musician website using Vite + React + TypeScript. Inspired by modern artist websites with a focus on release rollouts, email capture, SEO, and easy rebranding.

## Features

- ✅ **Rollout-Ready**: Switch between pre-save, out-now, and video premiere modes via config
- ✅ **Fully Responsive**: Mobile-first design that works on all devices
- ✅ **SEO Optimized**: OpenGraph tags, Twitter Cards, structured data, sitemap, robots.txt
- ✅ **Email Capture**: Netlify Forms integration with mailto fallback
- ✅ **Config-Driven**: Single `siteConfig.json` file for all content
- ✅ **Accessible**: Keyboard navigation, focus management, ARIA labels, semantic HTML
- ✅ **Performance**: Lazy-loaded images, optimized assets, fast loading
- ✅ **Deploy Anywhere**: Works on Netlify, Cloudflare Pages, GitHub Pages

## Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone or download this repository
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Configuration

All content is managed through `src/content/siteConfig.json`. This is your single source of truth for rebranding the site.

### Essential Configuration Steps

1. **Update Artist Information**:
   - `artist.name`: Your artist name
   - `artist.tagline`: Tagline/slogan
   - `artist.heroImage`: Path to hero image (place in `public/assets/`)
   - `artist.socials`: Update all social media links

2. **Update SEO Settings**:
   - `seo.siteTitle`: Site title
   - `seo.description`: Meta description
   - `seo.canonicalBaseUrl`: **IMPORTANT** - Your production URL (e.g., `https://yourdomain.com`)
   - `seo.ogImage`: Path to OG image (1200x630px recommended, place in `public/`)

3. **Update Rollout Settings**:
   - `rollout.mode`: `"presave"`, `"outnow"`, or `"video"`
   - `rollout.campaignName`: Campaign name (e.g., "NEW SINGLE")
   - `rollout.primaryCtaLabel`: Primary CTA button text
   - `rollout.primaryCtaUrl`: Primary CTA URL
   - `rollout.bannerEnabled`: Enable/disable top banner
   - `rollout.bannerText`: Banner text

4. **Add Your Releases**:
   - Update `featuredReleases` array with your featured release(s)
   - Update `music` array with all your releases
   - Include artwork paths (place images in `public/assets/`)

5. **Add Videos**:
   - Update `videos` array with YouTube video IDs
   - Set `featured: true` for videos to show on homepage

6. **Configure Tour Dates**:
   - `tour.mode`: `"bandsintown"` or `"list"`
   - If `bandsintown`: Add `bandsintownWidgetUrl`
   - If `list`: Add dates to `tour.dates` array

7. **Update Contact Information**:
   - `contact.bookingEmail`: Booking email
   - `contact.pressEmail`: Press email (optional)
   - `contact.managementEmail`: Management email (optional)

8. **Configure Mailing List**:
   - `mailingList.provider`: `"netlify"` (recommended) or `"mailto"`
   - `mailingList.netlifyFormName`: Form name for Netlify (must match form name in component)

### Switching Rollout Modes

To switch between campaign modes, simply update `rollout.mode` in `siteConfig.json`:

- **Pre-Save Mode** (`"presave"`):
  - Primary CTA becomes "Pre-Save Now"
  - Status label shows "PRE-SAVE"
  - Perfect for upcoming releases

- **Out Now Mode** (`"outnow"`):
  - Primary CTA becomes "Listen Now"
  - Status label shows "OUT NOW"
  - Links to streaming platforms

- **Video Mode** (`"video"`):
  - Primary CTA becomes "Watch Premiere"
  - Focuses on video content
  - Links to YouTube/video platforms

You can also customize the primary CTA completely by setting `rollout.primaryCtaLabel` and `rollout.primaryCtaUrl` directly.

## Adding Assets

### Image Assets

Place all images in `public/assets/`:

- **Hero Image**: Recommended 1920x1080px or similar
- **Album/Single Artwork**: Square images, 1000x1000px recommended
- **Press Images**: Any format, place in `public/assets/press/` if needed
- **OG Image**: Place `og.png` (1200x630px) in `public/`
- **Favicon**: Place `favicon.ico` and `apple-touch-icon.png` (180x180px) in `public/`

### Video Thumbnails

Video thumbnails are automatically pulled from YouTube using the video ID. No manual thumbnails needed.

## Forms

### Netlify Forms (Recommended)

The site includes Netlify Forms markup. To use:

1. Deploy to Netlify
2. Forms will automatically be detected
3. View submissions in Netlify dashboard under "Forms"
4. Configure email notifications in Netlify settings

Form names:
- Mailing list: `mailing-list` (configurable in `siteConfig.json`)
- Contact: `contact`

### Mailto Fallback

If not using Netlify, forms will fall back to `mailto:` links. Update `mailingList.provider` to `"mailto"` in config.

## SEO Setup

### Update Sitemap and Robots.txt

1. Update `public/robots.txt`:
   - Replace `https://example.com` with your `canonicalBaseUrl`

2. Update `public/sitemap.xml`:
   - Replace all instances of `https://example.com` with your `canonicalBaseUrl`
   - Optionally add more routes if you add custom pages

### Structured Data

Structured data (JSON-LD) is automatically generated for:
- MusicGroup (artist information)
- MusicAlbum (featured release)

This appears in the `<head>` via the `Layout` component.

### Meta Tags

Meta tags are automatically set per route using the `useSEO` hook. Update descriptions in each page component if needed.

## Analytics

Analytics tracking is disabled by default in development. To enable:

1. Set environment variable: `VITE_ANALYTICS=true`
2. Add your analytics code to `index.html`:

**For Google Analytics 4:**
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

**For Plausible:**
```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

CTA clicks and page views are automatically tracked via `src/utils/analytics.ts`.

## Deployment

### Netlify (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Connect repository to Netlify
3. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. The `public/_redirects` file is already included for SPA routing
5. Forms will work automatically (no setup needed)

### Cloudflare Pages

1. Push your code to GitHub/GitLab/Bitbucket
2. Connect repository to Cloudflare Pages
3. Build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (or your repo root)
4. For SPA routing, add a `_redirects` file or use Cloudflare's redirect rules:
   - Create a redirect rule: `/*` → `/index.html` with status code 200

### GitHub Pages

1. Update `vite.config.ts`:
   ```typescript
   export default defineConfig({
     plugins: [react()],
     base: '/your-repo-name/', // Add your repository name
   })
   ```

2. Update `siteConfig.json`:
   ```json
   {
     "seo": {
       "canonicalBaseUrl": "https://yourusername.github.io/your-repo-name/"
     }
   }
   ```

3. Build and deploy:
   ```bash
   npm run build
   ```

4. Use GitHub Actions or deploy `dist` folder contents to `gh-pages` branch

**Note**: GitHub Pages doesn't support server-side redirects, so deep links may not work perfectly without additional configuration.

## Project Structure

```
├── public/
│   ├── assets/          # Image assets (hero, covers, etc.)
│   ├── _redirects       # Netlify SPA redirects
│   ├── robots.txt       # SEO robots file
│   └── sitemap.xml      # SEO sitemap
├── src/
│   ├── app/
│   │   ├── App.tsx      # Router setup
│   │   ├── Layout.tsx   # Layout wrapper (header/footer)
│   │   └── seo.tsx      # SEO helpers and structured data
│   ├── components/      # Reusable components
│   │   ├── EnterGate.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── RolloutBanner.tsx
│   │   ├── ReleaseHero.tsx
│   │   ├── PlatformButtons.tsx
│   │   ├── VideoGrid.tsx
│   │   ├── VideoModal.tsx
│   │   ├── MusicGrid.tsx
│   │   ├── TourTeaser.tsx
│   │   ├── TourEmbed.tsx
│   │   ├── MailingListForm.tsx
│   │   ├── ContactForm.tsx
│   │   └── SocialLinks.tsx
│   ├── pages/           # Page components
│   │   ├── Home.tsx
│   │   ├── Music.tsx
│   │   ├── Videos.tsx
│   │   ├── Tour.tsx
│   │   ├── Links.tsx
│   │   ├── Contact.tsx
│   │   ├── Privacy.tsx
│   │   └── NotFound.tsx
│   ├── content/
│   │   └── siteConfig.json  # Main configuration file
│   ├── styles/
│   │   └── index.css        # Global styles + Tailwind
│   └── utils/
│       ├── analytics.ts     # Analytics helpers
│       └── config.ts        # Config exports
└── package.json
```

## Customization

### Styling

The site uses Tailwind CSS. Customize colors, fonts, and spacing in `tailwind.config.js`.

Default theme:
- Background: Black (`bg-black`)
- Text: White (`text-white`)
- Accents: Gray scale
- Buttons: White background with black text (primary), outlined (secondary)

### Adding New Pages

1. Create a new page component in `src/pages/`
2. Add route in `src/app/App.tsx`
3. Update `public/sitemap.xml` with new route
4. Add navigation link in `src/components/Header.tsx` if needed

### Adding New Components

Create reusable components in `src/components/` and import where needed. Follow existing patterns for consistency.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires JavaScript enabled
- Graceful degradation for older browsers

## Accessibility

The site follows WCAG 2.1 Level AA guidelines:
- Keyboard navigation throughout
- Focus indicators on all interactive elements
- Semantic HTML landmarks
- ARIA labels where needed
- Alt text for images
- Respects `prefers-reduced-motion`

## Performance

- Lazy-loaded images
- Code splitting via React Router
- Optimized builds with Vite
- Minimal JavaScript bundle
- No heavy dependencies

## License

This template is provided as-is. Customize freely for your projects.

## Support

For issues or questions:
1. Check the configuration in `siteConfig.json`
2. Review browser console for errors
3. Ensure all asset paths are correct
4. Verify `canonicalBaseUrl` is set correctly

## Credits

Built with:
- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Router](https://reactrouter.com/)

---

**Ready to launch?** Update `siteConfig.json`, add your assets, and deploy! 🚀

