<p align="center">
  <h1 align="center">🚀 ResumeSenseAI</h1>
  <p align="center">
    AI Powered ATS Resume Analyzer Chrome Extension
  </p>
</p>

---

# 📌 ResumeSenseAI

**ResumeSenseAI** is an AI-powered **Chrome Extension** that helps job seekers evaluate how well their resume matches a job description.

It analyzes a **PDF resume** and a **selected job description from any webpage**, then generates an **ATS compatibility score**, identifies **matched and missing keywords**, and provides **improvement suggestions** to increase the chances of passing Applicant Tracking Systems (ATS).

---

# 🎯 Main Goal

Most companies use **ATS (Applicant Tracking Systems)** to filter resumes before they reach recruiters.

**ResumeSenseAI helps users:**

- Compare their **resume with a job description**
- Identify **ATS keyword matches**
- Detect **missing skills**
- Improve their resume for better ATS performance

---

# ✨ Features

- 📊 **ATS Score Calculation**
- 🔍 **Keyword Matching**
- ❌ **Missing Keyword Detection**
- 💡 **AI-Powered Resume Improvements**
- 📄 **PDF Resume Upload**
- 🌐 **Job Description Selection from Any Webpage**
- ⚡ **Real-time AI Analysis using Gemini**

---

# 🎥 Demo

![ResumeSenseAI Demo](assets/demo.gif)

# 🛠 Tech Stack

### Frontend
- HTML
- CSS
- JavaScript
- Chrome Extension APIs
- Manifest V3

### Backend
- Node.js
- Express.js

### AI Integration
- Google **Gemini AI API**

### Other Tools
- Base64 Encoding
- PDF Parsing
- Git & GitHub

---

# ⚙️ How It Works

### Step 1 — Upload Resume
The user uploads their **PDF resume** inside the Chrome extension.

### Step 2 — Resume Storage
The resume is stored securely using **Chrome Storage**.

### Step 3 — Select Job Description
The user highlights a **job description from any webpage**.

### Step 4 — Send Data to Backend
The extension sends:

- Resume (Base64 encoded)
- Selected Job Description text

to the backend server.

### Step 5 — Resume Processing
The backend processes the resume:

1. Converts **Base64 → Buffer**
2. Extracts **text from the PDF resume**
3. Combines **Resume Text + Job Description**

### Step 6 — AI Analysis
The combined data is sent to **Gemini AI**, which analyzes:

- ATS Score
- Matched Keywords
- Missing Keywords
- Resume Improvement Suggestions

### Step 7 — Results Displayed
The AI response is sent back to the extension UI and displayed to the user.

---

# 🔄 Process Flow
User Uploads Resume (PDF)\
↓\
Resume Stored in Chrome Storage\
↓\
User Selects Job Description from Webpage\
↓\
Resume + Job Description Sent to Backend
↓\
Base64 Resume → Buffer → Extract Text\
↓\
Resume Text + JD Sent to Gemini AI\
↓\
Gemini AI Analyzes the Data\
↓\
ATS Score + Keywords + Suggestions Generated\
↓\
Results Displayed in Chrome Extension UI

---

# 🚀 Future Improvements

- DOCX resume support
- Better ATS scoring algorithms
- Resume section analysis
- Skill gap visualization
- Resume rewriting suggestions
- Job portal integrations
