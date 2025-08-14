# 🐝 WhistleBot – Anonymous Corruption Reporting Chatbot

WhistleBot is a **privacy-first**, multilingual chatbot for reporting corruption cases anonymously. It's built with **Node.js (Express)** for the backend, **Next.js (App Router)** for the frontend, and **Google Gemini** for AI-powered language processing.

## 📁 Project Structure

### Backend (`server/`)
- **index.js** - Entry point for backend
- **storage.js** - Data persistence layer
- **crypto.js** - Encryption/decryption utilities
- **pii.js** - Personally Identifiable Info (PII) detection
- **pow.js** - Proof-of-Work spam prevention
- **gemini.js** - Google Gemini API integration
- **.env.example** - Example backend environment variables
- **package.json** - Backend dependencies and scripts

### Frontend (`web/`)
- **app/layout.tsx** - Root layout
- **app/page.tsx** - Main landing/chat page
- **app/globals.css** - Global styles
- **lib/pow.ts** - Client-side Proof-of-Work logic
- **lib/pii.ts** - Client-side PII handling
- **next.config.js** - Next.js configuration
- **.env.local.example** - Example frontend environment variables
- **package.json** - Frontend dependencies and scripts

## 🚀 Features

- **Anonymous Reporting** – No personal info stored, PII detection + removal
- **Multilingual Support** – Report in local Indian languages (via Gemini)
- **Proof-of-Work** – Stops spam & bot submissions
- **Secure Storage** – Encrypted backend data
- **Modern UI** – Clean, mobile-friendly Next.js frontend

## 🛠️ Tech Stack

- **Backend:** Node.js, Express
- **Frontend:** Next.js (App Router) + Tailwind CSS
- **AI:** Google Gemini API
- **Security:** AES encryption, PII scrubbing, Proof-of-Work

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Google Gemini API key

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Copy the environment file:
```bash
cp .env.example .env
```

3. Edit `.env` and add your configuration:
```bash
PORT=5000
GEMINI_API_KEY=your_gemini_api_key
ENCRYPTION_KEY=your_32_char_secret
```

4. Install dependencies:
```bash
npm install
```

5. Start the development server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the web directory:
```bash
cd web
```

2. Copy the environment file:
```bash
cp .env.local.example .env.local
```

3. Edit `.env.local` and set the API URL:
```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
```

4. Install dependencies:
```bash
npm install
```

5. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:5000`.

## ✍️ Authors

This project is developed by:
- **Nikhil**
- **Keshav**
