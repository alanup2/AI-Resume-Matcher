# AI Resume Matcher

A full-stack web application that analyzes resumes using Google Gemini AI and matches candidates to job roles.

## How It Works

1. **Upload** a PDF resume via the drag-and-drop interface.
2. The backend extracts text from the PDF and sends it to **Google Gemini 2.0 Flash** for analysis.
3. Gemini returns an overall **resume score**, extracted **skills**, **missing skills**, and **improvement suggestions**.
4. The extracted skills are matched against predefined job roles (Frontend Developer, Backend Developer, Full Stack Developer, Data Analyst).
5. Each job role gets a **match percentage**, with color-coded results showing matched vs. missing skills.

## Tech Stack

- **Frontend**: React 19, Vite 8, Framer Motion, Axios, Lucide React
- **Backend**: Node.js, Express 5, Multer, pdf-parse
- **AI**: Google Gemini 2.0 Flash API

## Getting Started

### Prerequisites

- Node.js 18+
- A Google Gemini API key

### Setup

1. Clone the repo.
2. Install server dependencies and run:
   ```bash
   cd server
   npm install
   # Add GEMINI_API_KEY to server/.env
   node index.js
   ```
3. Install client dependencies and run:
   ```bash
   cd client
   npm install
   npm run dev
   ```
4. Open `http://localhost:5173` in your browser.
