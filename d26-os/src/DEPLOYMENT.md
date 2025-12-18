# ReactOS - Deployment Guide

Vodič za deployment ReactOS projekta na različite platforme.

## 📋 Pre Deploymenta

### 1. Proveri da sve radi lokalno
```bash
npm run build
npm run preview
```

### 2. Proveri package.json
Proveri da li je `version` broj ažuran i da li su svi dependenciji ispravni.

### 3. Optimizuj build
- Proveri bundle size
- Ukloni console.log() iz production koda
- Proveri da li su sve slike optimizovane

## 🚀 Netlify Deployment (Preporučeno - najlakše)

### Automatski Deploy sa Git-om

1. **Push na GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Na Netlify.com**
- Login/Register na https://netlify.com
- Click "Add new site" → "Import an existing project"
- Connect GitHub
- Izaberi svoj repo
- Build settings:
  - **Build command**: `npm run build`
  - **Publish directory**: `dist`
- Click "Deploy site"

3. **Gotovo!** 🎉
- Netlify će dati random URL (npr. `random-name-123.netlify.app`)
- Možeš promeniti naziv sajta u settings
- Svaki push na main će automatski deployovati

### Manual Deploy

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build projekat
npm run build

# Deploy
netlify deploy --prod
```

## 🌐 Vercel Deployment

### Sa Git-om (Preporučeno)

1. **Push na GitHub** (isto kao gore)

2. **Na Vercel.com**
- Login na https://vercel.com
- Click "Add New" → "Project"
- Import GitHub repo
- Framework preset: Vite
- Click "Deploy"

3. **Gotovo!** 🎉

### CLI Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Build
npm run build

# Deploy
vercel --prod
```

## 🔥 Firebase Hosting

### Setup

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting
```

Kada te pita:
- **Public directory**: `dist`
- **Single-page app**: `Yes`
- **GitHub integration**: Optional

### Deploy

```bash
# Build
npm run build

# Deploy
firebase deploy --only hosting
```

## 💻 GitHub Pages

### Setup

1. **Install gh-pages**
```bash
npm install --save-dev gh-pages
```

2. **Update package.json**
```json
{
  "homepage": "https://yourusername.github.io/reactos",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

3. **Update vite.config.ts**
```typescript
export default defineConfig({
  base: '/reactos/', // Ime tvog repo-a
  plugins: [react()],
})
```

### Deploy
```bash
npm run deploy
```

Sajt će biti na: `https://yourusername.github.io/reactos`

## 🐳 Docker Deployment

### Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Build i Run

```bash
# Build image
docker build -t reactos .

# Run container
docker run -p 8080:80 reactos
```

## ☁️ Custom VPS (DigitalOcean, AWS, etc.)

### Nginx Setup

1. **Build projekat**
```bash
npm run build
```

2. **Upload dist folder** na server

3. **Nginx config** (`/etc/nginx/sites-available/reactos`)
```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /var/www/reactos/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

4. **Enable site**
```bash
sudo ln -s /etc/nginx/sites-available/reactos /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 🔒 Environment Variables

Ako dodaš env variables, kreiraj `.env` fajl:

```env
VITE_API_URL=https://api.example.com
VITE_APP_VERSION=2.0.0
```

I koristi ih u kodu:
```typescript
const apiUrl = import.meta.env.VITE_API_URL;
```

**NIKAD ne commituj .env fajl!** Dodaj u `.gitignore`:
```
.env
.env.local
.env.production
```

## 📊 Post-Deployment Checklist

- [ ] Sajt se učitava bez grešaka
- [ ] Sve funkcionalnosti rade
- [ ] Responsive na svim uređajima
- [ ] Boot sequence radi
- [ ] Drag and drop radi
- [ ] LocalStorage radi
- [ ] Sve animacije su smooth
- [ ] Console nema errora
- [ ] SEO meta tagovi dodati (title, description)
- [ ] Favicon dodat
- [ ] SSL sertifikat aktivan (HTTPS)

## 🎨 Custom Domain

### Netlify
1. Domain Settings → Add custom domain
2. Update DNS kod registrara (Cloudflare, GoDaddy, etc.)
3. Dodaj A record ili CNAME

### Vercel
1. Project Settings → Domains
2. Add domain
3. Update DNS records

## 📈 Analytics (Optional)

### Google Analytics
```html
<!-- U index.html, pre closing </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🐛 Common Issues

### 1. "404 on refresh"
**Problem**: Refreshing page gives 404
**Solution**: Configure SPA routing in hosting platform

**Netlify**: Dodaj `netlify.toml`
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Vercel**: Dodaj `vercel.json`
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### 2. "Assets not loading"
**Problem**: CSS/JS not loading
**Solution**: Check `base` u `vite.config.ts`

### 3. "LocalStorage not working"
**Problem**: Data ne persists
**Solution**: Check CORS policy i da li je HTTPS

## 🎓 Tips

1. **Koristi CDN** za brže učitavanje
2. **Enable GZIP** compression
3. **Cache static assets** (Images, fonts)
4. **Monitor performance** (Lighthouse, PageSpeed)
5. **Setup error tracking** (Sentry optional)

## 📞 Help Resources

- **Netlify Docs**: https://docs.netlify.com
- **Vercel Docs**: https://vercel.com/docs
- **Vite Deploy Guide**: https://vitejs.dev/guide/static-deploy.html

---

**Pro Tip**: Za prvi deployment, koristi Netlify ili Vercel jer su najjednostavniji i imaju besplatne planove! 🚀
