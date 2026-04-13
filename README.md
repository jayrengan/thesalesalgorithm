# The Sales Algorithm

Website for **The Sales Algorithm** by Rengan Jayakrishnan.

Live at: [thesalesalgorithm.org](https://thesalesalgorithm.org)

---

## How to Edit Content

All content lives in simple Markdown files in the `content/` folder. You can edit them directly on GitHub — no coding needed.

### Edit a Page

1. Go to the `content/` folder on GitHub
2. Click the `.md` file you want to edit (e.g., `about.md`, `book.md`)
3. Click the pencil icon (Edit) in the top right
4. Make your changes
5. Click **Commit changes**
6. The site rebuilds automatically in ~2 minutes

### Page Files

| File | What it controls |
|------|-----------------|
| `content/home.md` | Homepage hero text, stats, services, testimonials |
| `content/about.md` | About JK biography |
| `content/book.md` | Book page — description, forewords, chapters, journey |
| `content/gallery.md` | Gallery photos and captions |
| `content/site.md` | Site-wide settings (email, social links) |

---

## How to Add a New Podcast Episode

1. Go to `content/podcasts/` on GitHub
2. Click **Add file** > **Create new file**
3. Name it like `008-guest-name.md` (increment the number)
4. Paste this template and fill in the details:

```markdown
---
title: "Guest Name"
episode: 8
date: 2025-07-01
published: true
spotify_url: https://open.spotify.com/episode/...
youtube_url: https://www.youtube.com/watch?v=...
youtube_id: YOUTUBE_VIDEO_ID
---
Description of what this episode covers.
```

5. Click **Commit new file**
6. The site rebuilds automatically

### Where to find the YouTube video ID
From a URL like `https://www.youtube.com/watch?v=QlkJ-dTxTGk`, the ID is `QlkJ-dTxTGk` (everything after `v=`).

---

## How to Add a New Reel

1. Go to `content/reels/` on GitHub
2. Click **Add file** > **Create new file**
3. Name it like `002-reel-title.md`
4. Paste this template:

```markdown
---
title: "Sales Tip #1"
date: 2025-07-01
published: true
instagram_url: https://www.instagram.com/reel/...
---
Description of this reel.
```

5. Click **Commit new file**

---

## How to Add a New Photo

1. Go to the appropriate folder in `public/images/` on GitHub:
   - **Author photos** → `public/images/author/`
   - **Book images** → `public/images/book/`
   - **Branding/logos** → `public/images/branding/`
   - **Gallery photos** → `public/images/gallery/`
2. Click **Add file** > **Upload files**
3. Drag and drop your image
4. Click **Commit changes**
5. Then edit `content/gallery.md` to add a reference:

```markdown
![Description of the photo](/images/gallery/your-new-photo.jpg)
Caption text here
```

### Image Tips
- Use descriptive filenames (e.g., `jk-at-conference.jpg`, not `IMG_1234.jpg`)
- Keep images under 1MB for fast loading
- JPG for photos, PNG for logos/graphics

---

## Folder Structure

```
content/                  # All editable content (Markdown files)
  home.md                 # Homepage content
  about.md                # About JK page
  book.md                 # Book page content
  gallery.md              # Gallery photos and captions
  site.md                 # Site settings (email, social links)
  podcasts/               # One .md file per podcast episode
  reels/                  # One .md file per reel

public/images/            # All images
  author/                 # JK photos (portrait, with guests)
  book/                   # Book cover images
  branding/               # Logos, favicon
  gallery/                # Gallery/event photos

client/                   # React app source code (don't edit unless you know React)
.github/workflows/        # Auto-deploy configuration
```

---

## Development (for developers)

```bash
npm install
npm run dev       # Start dev server at http://localhost:5173
npm run build     # Build static site to dist/
npm run preview   # Preview the build
```

Built with React, Vite, Tailwind CSS, and shadcn/ui.
