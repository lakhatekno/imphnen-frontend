# Kerja Merdeka – Frontend (Next.js)

## 🚀 Overview
Frontend aplikasi **Kerja Merdeka**, AI Agent pendamping pelamar kerja.  
Dibangun menggunakan **Next.js 14 (App Router)** dengan desain **one-page dark mode** yang clean dan responsif.

Aplikasi ini terhubung dengan backend service ([kerja-merdeka-be](https://github.com/Contsol-dev/kerja-merdeka-be/)) untuk:
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
🔗 **Live Demo Frontend**: [https://kerjamerdeka.vercel.app/](https://kerjamerdeka.vercel.app/)  

## 📸 Screenshots
- Landing Page
  <img width="1888" height="941" alt="image" src="https://github.com/user-attachments/assets/830b2f2e-4265-4805-8f83-9b4ca012d135" />

- Generate CV & Cover Letter
  <img width="1889" height="944" alt="image" src="https://github.com/user-attachments/assets/4320a34a-ae9d-442a-9942-8443e3f4fd2b" />

- Mock Interview
  <img width="1909" height="940" alt="image" src="https://github.com/user-attachments/assets/0ca00530-66fe-4299-8a2c-b8e9a0b5ebda" />

- Email Job Pack
  <img width="1906" height="941" alt="image" src="https://github.com/user-attachments/assets/20694342-02e5-4b7a-9ba0-0251d7a04d35" />

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
