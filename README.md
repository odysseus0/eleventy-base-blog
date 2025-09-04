# TJ Zhang Blog - Project Status

**Live Site:** https://tj-zhang.com  
**Repository:** https://github.com/odysseus0/eleventy-base-blog  
**Local Dev:** `~/projects/tj-zhang-blog/`

---

## ✅ Completed (2025-08-31)

### Infrastructure & Deployment
- [x] **Platform Decision**: Chose Eleventy + Cloudflare Pages over alternatives (Bear Blog, Substack, etc.)
- [x] **Domain Registration**: Secured `tj-zhang.com` via Cloudflare Registrar
- [x] **Template Setup**: Forked and customized `11ty/eleventy-base-blog` 
- [x] **Local Development**: Moved to `~/projects/tj-zhang-blog/` with symlink to `4_Writing/eleventy-site/`
- [x] **Dependencies**: Converted from npm to pnpm, resolved iCloud sync issues
- [x] **Deployment**: Live on Cloudflare Pages with automatic builds
- [x] **Custom Domain**: Connected `tj-zhang.com` successfully

### Content & Branding
- [x] **Site Metadata**: Updated title, description, author info for tj-zhang.com
- [x] **Identity Architecture**: Documented pseudonym strategy (Outis Solberg) for future use
- [x] **Architecture Decision Log**: Complete documentation of technical choices

### Development Workflow
- [x] **Git Setup**: Proper fork with upstream tracking for template updates
- [x] **CLI Tools**: Wrangler installed and configured for deployments
- [x] **Build System**: Sub-0.2s builds with image optimization, RSS, sitemap

---

## 🔧 Current Issues

### Image Processing
- **Problem**: Fourth post image not rendering properly on deployed site
- **Context**: Local build works, deployment has image processing issues
- **Investigation needed**: Check Eleventy Image plugin configuration in production

---

## 📋 Next Steps

1. **Fix image rendering** in production environment
2. **Add real content** - publish from ready TEE portfolio:
   - `tee-performance-mental-models.md`
   - `sgx-sdk-vs-gramine.md`
   - `gramine-configuration-principles.md`
   - `signal-contact-discovery-sgx.md`
   - `vm-tee-boundary-convergence.md`
3. **Content workflow** - establish process for drafts → published posts
4. **SEO optimization** - verify meta tags, sitemap functionality
5. **Performance audit** - test loading speeds, Core Web Vitals
6. **Share with network** - distribute first published piece to 3-5 people

---

## 🛠 Technical Stack

- **SSG**: Eleventy v3.1.2 (forked from eleventy-base-blog v9)
- **Hosting**: Cloudflare Pages with automatic GitHub deployments  
- **Domain**: tj-zhang.com (Cloudflare Registrar + DNS)
- **Package Manager**: pnpm (converted from npm)
- **Features**: RSS feeds, image optimization, syntax highlighting, responsive design

---

## 📂 Project Structure

```
~/projects/tj-zhang-blog/           # Main project (outside iCloud)
├── content/blog/                   # Published blog posts
├── content/                        # Static pages (about, etc.)
├── _includes/layouts/              # Templates
├── _data/metadata.js              # Site configuration  
├── public/                        # Static assets
└── _site/                         # Built site (deployed)

4_Writing/eleventy-site/           # Symlink to main project
4_Writing/drafts/                  # Work-in-progress content
4_Writing/Architecture_Decision_Log.md  # Technical decisions doc
```

---

## 🚀 Deployment Process

```bash
# Local development
cd ~/projects/tj-zhang-blog
pnpm run start                     # Dev server at localhost:8081

# Deploy
pnpm run build                     # Build site
git add . && git commit -m "..."   # Commit changes  
git push origin main               # Triggers automatic deployment

# Direct deploy (alternative)
wrangler pages deploy _site --project-name=tj-zhang-blog
```

---

**Status**: ✅ **Production Ready** - Blog infrastructure complete, ready for content creation

*Last updated: 2025-08-31*
