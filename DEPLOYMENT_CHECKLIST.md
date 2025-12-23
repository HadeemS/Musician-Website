# Deployment Checklist

Use this checklist before deploying your site to production.

## Pre-Deployment

- [ ] Update `src/content/siteConfig.json` with your actual content
- [ ] Set `seo.canonicalBaseUrl` to your production URL
- [ ] Update `public/robots.txt` with your production URL
- [ ] Update `public/sitemap.xml` with your production URL
- [ ] Add all required image assets to `public/assets/`:
  - [ ] Hero image
  - [ ] Album/single artwork
  - [ ] OG image (`public/og.png` - 1200x630px)
  - [ ] Favicon (`public/favicon.ico`)
  - [ ] Apple touch icon (`public/apple-touch-icon.png` - 180x180px)

## Configuration Check

- [ ] Artist name and tagline updated
- [ ] All social media links updated and working
- [ ] Featured releases added with correct artwork paths
- [ ] Music catalog populated
- [ ] Videos added with correct YouTube IDs
- [ ] Tour dates configured (Bandsintown or list mode)
- [ ] Contact emails updated
- [ ] Mailing list provider configured (Netlify or mailto)

## Rollout Mode

- [ ] Rollout mode set correctly (`presave`, `outnow`, or `video`)
- [ ] Primary CTA label and URL configured
- [ ] Banner text updated (if enabled)
- [ ] Campaign name set

## Testing

- [ ] All pages load correctly
- [ ] Navigation works on desktop and mobile
- [ ] All links open correctly (social, streaming, external)
- [ ] Forms submit successfully (test in production)
- [ ] Video modal opens and plays correctly
- [ ] Images load correctly
- [ ] Site is responsive on mobile devices
- [ ] Enter gate appears on first visit

## SEO

- [ ] Meta tags display correctly (use browser dev tools or sharing debugger)
- [ ] OG image displays when sharing on social media
- [ ] Structured data validates (use Google Rich Results Test)
- [ ] Sitemap is accessible at `/sitemap.xml`
- [ ] Robots.txt is accessible at `/robots.txt`

## Analytics (Optional)

- [ ] Analytics code added to `index.html` (if using)
- [ ] `VITE_ANALYTICS=true` set in production environment
- [ ] Analytics tracking verified in dev tools

## Performance

- [ ] Build completes without errors (`npm run build`)
- [ ] Site loads quickly
- [ ] Images are optimized
- [ ] No console errors

## Final Steps

- [ ] Test production build locally: `npm run build && npm run preview`
- [ ] Deploy to hosting platform
- [ ] Test all functionality on production URL
- [ ] Submit sitemap to Google Search Console (optional)
- [ ] Set up form notifications (if using Netlify Forms)

## Post-Launch

- [ ] Monitor form submissions
- [ ] Check analytics (if enabled)
- [ ] Test on multiple devices/browsers
- [ ] Verify all external links work
- [ ] Update rollout mode as campaigns change

---

**Remember**: Always test your production build locally before deploying!
