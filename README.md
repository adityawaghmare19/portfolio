# Aditya Waghmare — Developer Portfolio 🚀

> A sleek, dark-mode portfolio website showcasing my projects, certifications, skills, and work experience. Built with vanilla HTML, CSS, and JavaScript — zero dependencies, blazing fast.

**🌐 Live Site:** [https://adityawaghmare19.github.io/portfolio](https://adityawaghmare19.github.io/portfolio)

---

## ✨ Features

- 🌑 Premium dark mode with neon/gradient accents
- ✨ Animated particle canvas background
- ⌨️ Typing effect for role titles
- 🪟 Glassmorphism card design
- 🔢 Animated stat counters
- 📜 Scroll-reveal animations with stagger
- 🖱️ Mouse-tracked glow on project cards
- 🎴 3D tilt effect on certificate cards
- 📱 Fully responsive (mobile-first)
- ♿ Semantic HTML & accessible

---

## 📁 Project Structure

```
portfolio/
├── index.html      ← Main HTML file
├── styles.css      ← All styles (dark theme, animations, responsive)
├── script.js       ← Interactivity (particles, typing, scroll FX)
├── resume.pdf      ← Your resume (add this file!)
└── README.md       ← This file
```

---

## 🚀 How to Host on GitHub Pages

### Step 1 — Create a new GitHub repository
1. Go to [github.com/new](https://github.com/new)
2. Name it **`portfolio`** (or any name you like)
3. Set it to **Public**
4. Click **Create repository**

### Step 2 — Add your resume PDF
Place your `resume.pdf` file inside the `portfolio/` folder before uploading.

### Step 3 — Push this folder to GitHub

Open a terminal in the `portfolio/` folder and run:

```bash
git init
git add .
git commit -m "Initial portfolio commit"
git branch -M main
git remote add origin https://github.com/adityawaghmare19/portfolio.git
git push -u origin main
```

### Step 4 — Enable GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select **Branch: main** and folder **/ (root)**
4. Click **Save**
5. Wait ~60 seconds, then visit: `https://adityawaghmare19.github.io/portfolio`

---

## 🛠️ Local Preview

Simply open `index.html` in your browser — no build step required!

Or use VS Code's **Live Server** extension for hot reload.

---

## 📝 Customization Tips

| What to change | Where |
|---|---|
| Add a new project | `index.html` → `#projects` section |
| Update skills | `index.html` → `#skills` section |
| Change colors | `styles.css` → `:root` CSS variables |
| Add your photo | Replace the `.avatar-initials` div in `#about` |
| Add certificate images | Add `<img>` inside `.cert-card` elements |

---

*Built with ❤️ by Aditya Narendra Waghmare*
