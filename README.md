# 🐝 WhistleBot – Anonymous Corruption Reporting Chatbot

WhistleBot is a **privacy-first**, multilingual chatbot for reporting corruption cases anonymously.  
It’s built with **Node.js (Express)** for the backend, **Next.js (App Router)** for the frontend, and **Google Gemini** for AI-powered language processing.

| Path / File                          | Description                                       |
|--------------------------------------|---------------------------------------------------|
| **server/**                          | Node.js backend (Express)                         |
| ├─ index.js                          | Entry point for backend                           |
| ├─ storage.js                        | Data persistence layer                            |
| ├─ crypto.js                         | Encryption/decryption utilities                   |
| ├─ pii.js                            | Personally Identifiable Info (PII) detection      |
| ├─ pow.js                            | Proof-of-Work spam prevention                     |
| ├─ gemini.js                         | Google Gemini API integration                     |
| ├─ .env.example                      | Example backend environment variables             |
| └─ package.json                      | Backend dependencies and scripts                  |
| **web/**                             | Next.js frontend (App Router)                     |
| ├─ app/layout.tsx                    | Root layout                                       |
| ├─ app/page.tsx                      | Main landing/chat page                            |
| ├─ app/globals.css                   | Global styles                                     |
| ├─ lib/pow.ts                        | Client-side Proof-of-Work logic                   |
| ├─ lib/pii.ts                        | Client-side PII handling                          |
| ├─ next.config.js                    | Next.js configuration                             |
| ├─ .env.local.example                | Example frontend environment variables            |
| └─ package.json                      | Frontend dependencies and scripts                 |




## 🚀 Features

- **Anonymous Reporting** – No personal info stored, PII detection + removal  
- **Multilingual Support** – Report in local Indian languages (via Gemini)  
- **Proof-of-Work** – Stops spam & bot submissions  
- **Secure Storage** – Encrypted backend data  
- **Modern UI** – Clean, mobile-friendly Next.js frontend

---

## 🛠️ Tech Stack

- **Backend:** Node.js, Express  
- **Frontend:** Next.js (App Router) + Tailwind CSS (optional)  
- **AI:** Google Gemini API  
- **Security:** AES encryption, PII scrubbing, Proof-of-Work

---

2️⃣ Backend Setup (server/)
bash
Copy
Edit
cd server
cp .env.example .env
# Edit the .env file and add your Gemini API key & other configs
npm install
npm run dev
3️⃣ Frontend Setup (web/)
bash
Copy
Edit
cd ../web
cp .env.local.example .env.local
# Edit the .env.local file and set NEXT_PUBLIC_API_URL
npm install
npm run dev
By default:

Frontend runs on: http://localhost:3000

Backend runs on: http://localhost:5000

🔐 Environment Variables
Backend (server/.env)
ini
Copy
Edit
PORT=5000
GEMINI_API_KEY=your_gemini_api_key
ENCRYPTION_KEY=your_32_char_secret
Frontend (web/.env.local)
ini
Copy
Edit
NEXT_PUBLIC_API_URL=http://localhost:5000
