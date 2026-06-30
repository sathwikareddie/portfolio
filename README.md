# Sathwika Reddy — Professional Portfolio Website

A modern, fully responsive personal portfolio website built with HTML5, CSS3, and vanilla JavaScript.

**Live Site:** _Add your deployment URL here_

---

## Features

| Feature | Status |
|---|---|
| Responsive design (mobile, tablet, desktop) | ✅ |
| Dark / Light mode toggle (saved to localStorage) | ✅ |
| Loading screen with animated progress bar | ✅ |
| Interactive floating particle background | ✅ |
| Animated typewriter hero | ✅ |
| Scroll-triggered reveal animations (AOS) | ✅ |
| Active nav link scroll spy | ✅ |
| Animated counters (CGPA, Projects, Certs) | ✅ |
| Animated skill progress bars | ✅ |
| Project cards with hover overlay & links | ✅ |
| Certifications section with status badges | ✅ |
| Achievements & activities section | ✅ |
| Resume preview + download button | ✅ |
| Contact form with validation & success state | ✅ |
| Social media links (LinkedIn, GitHub, Instagram) | ✅ |
| Back-to-top button | ✅ |
| SEO meta tags | ✅ |
| Accessibility (aria-labels, reduced-motion) | ✅ |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 (Custom Properties, Grid, Flexbox) |
| Scripting | Vanilla JavaScript (ES6+) |
| Animations | AOS Library v2.3.4 |
| Icons | Devicons CDN |
| Fonts | Google Fonts (Playfair Display + Space Grotesk) |

---

## File Structure

```
portfolio/
├── index.html      # Full single-page HTML
├── style.css       # All styles (tokens, layout, components, responsive)
├── script.js       # All JS (loader, particles, typewriter, scroll spy, form)
├── resume.pdf      # ← ADD YOUR RESUME HERE
└── README.md       # This file
```

---

## Setup & Running Locally

No build step required — just open the file.

```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
# Open index.html in browser, or use VS Code Live Server
```

---

## Deployment

### GitHub Pages (Recommended)
1. Push files to a GitHub repository
2. Go to **Settings → Pages → Source: main branch / root**
3. Save → live at `https://<username>.github.io/<repo>/`

### Netlify (Drag & Drop)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the `portfolio/` folder onto the page
3. Instant live URL

---

## Customisation Checklist

Before publishing, update these in `index.html`:

- [ ] Add your **profile photo** — replace the `about-img-placeholder` div with an `<img>` tag
- [ ] Add your **resume PDF** — place `resume.pdf` in the project folder
- [ ] Update **GitHub** username/link in hero socials and contact section
- [ ] Update **Instagram** link
- [ ] Replace `href="#"` in project cards with real GitHub/demo URLs
- [ ] Add more projects as you complete Future Interns tasks
- [ ] (Optional) Replace the `mailto:` form with [Formspree](https://formspree.io) for server-side delivery

---

## Photo Setup

Replace the placeholder in `index.html`:

```html
<!-- Find this div: -->
<div class="about-img-placeholder">
  <span>SR</span>
  <p class="img-hint">Replace with your photo</p>
</div>

<!-- Replace with: -->
<img src="photo.jpg" alt="Sathwika Reddy" class="about-photo" />
```

And add to `style.css`:
```css
.about-photo {
  width: 100%;
  max-width: 320px;
  border-radius: var(--radius);
  border: 2px solid var(--border);
  margin: 0 auto;
  display: block;
}
```

---

