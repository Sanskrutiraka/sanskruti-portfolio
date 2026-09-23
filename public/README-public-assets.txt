This folder should contain:

1. resume.pdf          — Your resume (the Download button links here)
2. og-image.png        — 1200×630 screenshot of your hero section (for LinkedIn/Twitter link previews)
3. photo.jpg or .webp  — Your profile photo (update the src in Hero.tsx)
                          ✅ Compress to WebP, target < 150KB

How to create a good og-image:
- Open your deployed site in Chrome
- Press F12 → Device toolbar → set to 1200×630 custom resolution
- Take a screenshot of the hero section
- Save as /public/og-image.png

How to compress your photo:
- Use https://squoosh.app (free, browser-based)
- Convert to WebP, quality ~80%, aim for < 150KB
- This alone can 10× your Lighthouse performance score
