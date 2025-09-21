<img width="1536" height="1024" alt="ChatGPT Image Sep 21, 2025, 06_13_53 AM" src="https://github.com/user-attachments/assets/ba7e96e5-17d5-446b-8503-11631c5a2157" />


# 🎓 Intelloecto - AI Powered EdTech Platform with Interactive 3D AI Professor

![Intelloecto
Badge](https://img.shields.io/badge/Intelloecto-AI--Powered%2520EdTech-blueviolet)
![Frontend Badge](https://img.shields.io/badge/Frontend-React-61dafb)
![Backend Badge](https://img.shields.io/badge/Backend-FastAPI-009688)
![Database Badge](https://img.shields.io/badge/Database-MongoDB-47A248)
![AI Badge](https://img.shields.io/badge/AI-Gemini-412991)

------------------------------------------------------------------------

## 📖 Introduction

**Intelloecto AI** is a revolutionary educational technology platform
designed to solve the hardest problems in online learning. By combining
**state-of-the-art AI**, **immersive 3D visualization**, and **adaptive
learning systems**, Intelloecto AI delivers **deeply engaging, personalized,
and skill-oriented experiences**.

At the heart of Intelloecto AI is the **3D AI Professor**, a lifelike,
interactive instructor capable of delivering contextual explanations,
guiding learners, and providing real-time project evaluations.

------------------------------------------------------------------------

## 🎯 Problem Statement

Most online education platforms fail to deliver **engaging,
personalized, and skill-oriented learning experiences**, especially for
**technically demanding domains**. Traditional platforms rely on passive
content delivery and lack interactive, hands-on support.

Intelloecto AI solves this by introducing a **3D AI-powered professor**
that: - Generates **customized courses** using advanced search tags. -
Offers **real-time technical explanations and troubleshooting**. -
Provides **hands-on assessments** with instant evaluation. - Delivers
**granular analytics and personalized learning paths**.

------------------------------------------------------------------------

## ✨ Key Features

-   🤖 **AI-Driven Course Generation**\
    Create structured, multi-module courses using advanced tags
    (`#web-development`, `#machine-learning`, etc.).

-   👨‍🏫 **Interactive 3D AI Professor**\
    Lifelike professor that delivers interactive lessons, answers
    technical queries, and adapts to proficiency level.

-   🛠️ **Project-Based Assessments**\
    Real-world projects with detailed evaluation and instant feedback.

-   ❓ **Interactive Doubt Resolution**\
    AI professor resolves even complex, cross-domain technical
    questions.

-   📊 **Progress Tracking & Analytics**\
    Monitor module completion, assessment scores, and skill mastery.

-   📈 **Automated Report Generation**\
    Comprehensive performance insights with actionable recommendations.

------------------------------------------------------------------------

## 🚀 Objective

Develop an **MVP (Minimum Viable Product)** demonstrating the
feasibility of **immersive, personalized, and skill-intensive online
learning**, focusing on: - Hands-on learning.\
- Advanced customization.\
- Real-time AI-driven support.

------------------------------------------------------------------------

## 🏗️ System Architecture

    Intelloecto AI Architecture:
    ┌─────────────────┐    ┌──────────────────┐    ┌────────────────┐
    │   React Frontend│◄──►│   FastAPI Backend│◄──►│   MongoDB      │
    │   - 3D Avatar   │    │   - AI Processing │    │   Database     │
    │   - Course UI   │    │   - Business Logic│    │                │
    │   - Chat Interface│  │   - API Routes    │    │                │
    └─────────────────┘    └──────────────────┘    └────────────────┘
              │                         │
              │                         │
              ▼                         ▼
    ┌─────────────────┐    ┌──────────────────┐
    │   Firebase      │    │   Gemini API     │
    │   Authentication│    │   AI Services    │
    │   Firestore     │    │                  │
    └─────────────────┘    └──────────────────┘

------------------------------------------------------------------------

## 📁 Project Structure

    Intelloecto-ai/
    ├── backend/                 # FastAPI Backend
    │   ├── main.py              # FastAPI app entry point
    │   ├── models.py            # Pydantic models
    │   ├── database.py          # MongoDB configuration
    │   ├── requirements.txt     # Python dependencies
    │   └── .env                 # Environment variables
    │
    ├── frontend/                # React Frontend
    │   ├── public/              # Static files
    │   ├── src/
    │   │   ├── components/      # React components
    │   │   ├── services/        # API services
    │   │   │   └── gemini.js
    │   │   ├── firebase.js      # Firebase config
    │   │   └── App.js           # Main app component
    │   ├── package.json         # Node.js dependencies
    │   └── .env                 # Frontend environment variables
    │
    ├── database/                # Database config
    │   └── setup.js             # MongoDB setup script
    │
    └── README.md                # Project documentation

------------------------------------------------------------------------

## 🛠️ Technology Stack

**Frontend**\
- React (UI framework)\
- Three.js (3D visualization)\
- Firebase, MongoDB (authentication, real-time db)\
- Web Speech API (text-to-speech)

**Backend**\
- FastAPI (Python API framework)\
- MongoDB (NoSQL database)\
- Motor (async driver for MongoDB)\
- Gemini API (AI interaction & course generation)

------------------------------------------------------------------------

## 🚀 Installation & Setup

### Prerequisites

-   Node.js v14+\
-   Python v3.8+\
-   MongoDB (local or Atlas)\
-   Gemini API account\
-   Firebase account

### Backend Setup

``` bash
cd backend
pip install -r requirements.txt
```

Set environment variables in `.env`:

``` env
MONGODB_URL=mongodb://localhost:27017
GEMINI_API_KEY=gemini_api_key_here
```

Run backend:

``` bash
uvicorn main:app --reload
```

### Frontend Setup

``` bash
cd frontend
npm install
```

Set environment variables in `.env`:

``` env
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_API_BASE_URL=http://localhost:8000
```

Run frontend:

``` bash
npm start
```

### Database Setup

``` bash
mongosh database/setup.js
```

------------------------------------------------------------------------

## 🎮 Usage

-   Generate courses using hashtags (e.g., `#web-development`,
    `#machine-learning`).\
-   Interact with the **3D AI Professor** through the chat interface.\
-   Complete lessons and projects with instant feedback.\
-   Track progress with detailed analytics.\
-   Ask technical questions and receive real-time answers.

------------------------------------------------------------------------

## 🔧 API Endpoints

**Courses**\
- `GET /courses`\
- `GET /courses/{course_id}`\
- `GET /courses/{course_id}/modules`

**Modules & Lessons**\
- `GET /modules/{module_id}`\
- `GET /modules/{module_id}/lessons`\
- `GET /lessons/{lesson_id}`

**AI Interactions**\
- `POST /api/ask-professor`\
- `GET /ai-interactions/{user_id}`

**Progress Tracking**\
- `GET /progress/{user_id}/{course_id}`\
- `POST /progress/{user_id}/{course_id}/complete-lesson/{lesson_id}`

------------------------------------------------------------------------

## 🎨 3D AI Professor Implementation

-   Three.js for 3D rendering.\
-   ReadyPlayerMe for customizable avatars.\
-   Web Speech API for text-to-speech.\
-   Google Gemini for natural language processing.\
-   Custom animations for lifelike interactions.

------------------------------------------------------------------------

## 🔮 Future Enhancements

-   Voice recognition for natural interactions.\
-   VR/AR immersive learning experiences.\
-   Multi-language support.\
-   Advanced skill assessment algorithms.\
-   Social & collaborative learning features.\
-   Mobile application.\
-   Integration with certification programs.

------------------------------------------------------------------------

## 🤝 Contributing

We welcome contributions! Please read our guidelines before submitting
PRs.

------------------------------------------------------------------------

## 📄 License

Licensed under the **MIT License** -- see the LICENSE file.

------------------------------------------------------------------------

## 🏆 Tech Over Flow Team

Intelloecto AI is developed by:\
- Backend Developers\ Lakshya Saini, Pradeep Soni
- Frontend Developers\ Akshay Saini, Asutosh Kumar Maurya
- 3D Designers\ Pranshu Gupta

------------------------------------------------------------------------

> **Theme:** *"Mastery Through Immersion: Solving the Hardest Problems
> in Online Learning"*
