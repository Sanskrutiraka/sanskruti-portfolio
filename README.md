# Sanskruti Raka — Developer Portfolio

A personal portfolio website for **Sanskruti Raka**, Java & Spring Boot Backend Developer (MCA 2026).  
Built with React + Vite + TypeScript + Tailwind CSS, featuring scroll-driven animations, an auto-playing project carousel, and a serverless contact form via EmailJS.

---

## 🔗 Live Demo
 
👉 **[sanskruti-portfolio-nine.vercel.app](https://sanskruti-portfolio-nine.vercel.app/)**

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite 5 |
| Language | TypeScript |
| Styling | Tailwind CSS 3 |
| Animations | Framer Motion |
| Carousel | Embla Carousel + Autoplay |
| Icons | Lucide React |
| Contact form | EmailJS (serverless, no backend) |
| Scroll-spy | react-scroll |
| Intersection | react-intersection-observer |

---

## 📋 Sections

1. **Hero** — Animated typing role, passport-style photo with spinning border ring, CTA buttons
2. **About** — Narrative, stat cards, quote
3. **Skills** — 4-column technology grid with "Currently Learning" strip
4. **Projects** — Auto-scrolling carousel (3 s interval) with 3D tilt-on-hover cards
5. **Experience** — Amber vertical timeline with internship details
6. **Education** — Timeline cards for MCA, B.Sc., 12th, and 10th
7. **Certifications** — Auto-scrolling carousel of verified certificates
8. **Contact** — EmailJS form with honeypot spam protection and 60 s rate-limit

---

## 🚀 Setup

```bash
# 1. Clone the repo
git clone https://github.com/Sanskrutiraka/<repo-name>.git
cd <repo-name>

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Open .env and fill in your EmailJS credentials

# 4. Start the dev server
npm run dev
```

The site opens at `http://localhost:5173`.

---

## 🔑 Environment Variables

All sensitive credentials live in `.env` (git-ignored). Copy `.env.example` to get started:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Get your free keys at [emailjs.com](https://www.emailjs.com).

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── Experience.tsx
│   ├── Education.tsx
│   ├── Certifications.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── index.css       # Design tokens + global styles (Ink & Ember palette)
├── App.tsx
└── main.tsx
public/
├── resume.pdf      # Linked by the Download Resume button
├── Docs/photo.jpeg # Profile photo
└── og-image.png    # 1200×630 Open Graph preview image
```

---

## 📄 License

MIT © 2026 [Sanskruti Raka](mailto:sanskrutiraka1602@gmail.com)
