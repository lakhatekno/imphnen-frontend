# Kerja Merdeka – Frontend (Next.js)

## 🚀 Overview
Frontend aplikasi **Kerja Merdeka**, AI Agent pendamping pelamar kerja.  
Dibangun menggunakan **Next.js 14 (App Router)** dengan desain **one-page dark mode** yang clean dan responsif.

Aplikasi ini terhubung dengan backend service ([kerja-merdeka-be](https://github.com/your-repo/kerja-merdeka-be)) untuk:
- Generate **CV & Cover Letter** berbasis AI.
- Simulasi **mock interview**.
- Kirim **job pack via email**.

## ✨ Features
- 🎨 Modern UI dengan **Next.js + TailwindCSS**
- 🌙 **Dark mode** toggle
- 🔑 **Auth integration** (JWT dari backend)
- 📄 **Form input data diri & lowongan**
- 📊 **Dashboard hasil generate**
- 📧 **Notifikasi job pack terkirim**
- ⚡ Optimized build & deploy di Vercel

## 🌐 Demo
🔗 **Live Demo Frontend**: [https://your-frontend-demo.vercel.app](https://your-frontend-demo.vercel.app)  
📹 **Demo Video**: [YouTube Demo Link](https://youtu.be/your-video-link)  

## 📸 Screenshots
| Landing Page | Form Input | Dashboard |
|--------------|------------|-----------|
| ![landing](docs/screenshots/landing.png) | ![form](docs/screenshots/form.png) | ![dashboard](docs/screenshots/dashboard.png) |

## 🏗️ Tech Stack
- **Framework**: Next.js 14 (App Router)
- **UI**: TailwindCSS + shadcn/ui
- **Auth**: JWT (integrasi backend)
- **State Management**: React hooks + Context
- **Deployment**: Vercel

## ⚙️ Setup

### 1. Clone & Install
```bash
git clone https://github.com/your-repo/kerja-merdeka-fe.git
cd kerja-merdeka-fe
npm install
```
### 2. Environment variables
```bash
NEXT_PUBLIC_BASE_API_URL=https://your-backend-api-url
```
### 3. Run
Dev mode:
```bash
npm run dev
```
Akses di: [http://localhost:3000](http://localhost:3000)
Prod mode:
```bash
npm run build
npm start
```

## 📌 Pages
- **/** - Landing Page
- **/register** - Register
- **/login** - Login
- **/job-companion** - Dasbor Pendamping Kerja
- **/profile** - Profil Pengguna

## 👥 Team
- Backend: [Muhammad Iqbal Ghozy](https://github.com/qybbs) 
- Frontend: [Muhammad Islakha Khoiruzzaman Tekhno Agri](https://github.com/lakhatekno) 
- UI/UX: [Muhammad Iqbal Ghozy](https://github.com/Tenshi-X) 
