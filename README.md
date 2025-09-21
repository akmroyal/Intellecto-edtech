<img width="1536" height="1024" alt="Futuristic Banner" src="https://github.com/user-attachments/assets/ba7e96e5-17d5-446b-8503-11631c5a2157" />

# Genignite Pre-Hackathon Submission Template  
*2. The Submission Template for GenIgnite Pre-Hackathon IPEC*  

<img width="1920" height="480" alt="image" src="https://github.com/user-attachments/assets/979e1c99-2907-463d-a236-5aa585979ee0" />


---

## 1. Problem Statement Name  
AI-Powered EdTech Platform with Interactive 3D AI Professor  

---

## 2. Problem Statement Description  
Most online education platforms rely on passive video lectures and generic assessments, which fail to deliver personalized, skill-oriented, and engaging learning—especially in technically demanding fields.  
Our solution, **Intelloecto AI**, introduces a lifelike **3D AI Professor** who provides interactive lessons, real-time technical support, and project-based assessments. Students can generate custom courses using advanced hashtags (e.g., #web-development, #machine-learning, #cloud-native), receive instant evaluations, and track progress through analytics and auto-generated reports.  

---

## 3. Project Overview  
**Intelloecto AI** is an immersive EdTech platform that combines **AI-driven course generation**, **3D visualization**, and **adaptive learning systems**. It empowers students to:  

- Generate structured, niche courses via search tags.  
- Interact with a lifelike **3D AI Professor** capable of contextual explanations and code walkthroughs.  
- Solve project-based, real-world assessments with instant evaluation.  
- Resolve doubts interactively with advanced, domain-specific support.  
- Monitor learning progress via analytics and automated reports.  

---

## 4. Architecture  
**Frontend**: React.js with Three.js (3D AI Professor, Course UI, Chat Interface)  
**Backend**: FastAPI (Python) – Course APIs, AI processing, and analytics  
**Database**: MongoDB Atlas  
**AI Services**: Google Gemini API (NLP, contextual responses), Web Speech API (TTS)  
**Authentication**: Firebase  
**Deployment**: Dockerized microservices on Render (backend) & Netlify (frontend)  

---

## 5. Tech Stack  
- **Frontend**: React.js, Three.js, Firebase, Web Speech API  
- **Backend**: FastAPI, Python 3.11, Motor (MongoDB driver)  
- **Database**: MongoDB Atlas  
- **AI Services**: Google Gemini API, ReadyPlayerMe (3D avatars)  
- **DevOps**: Versal  

---

## 6. Team Name  
**Tech Over Flow**  

---

## 7. Team Members & Details  

| Name                  | Role                | Email                | LinkedIn | College Name |
|-----------------------|---------------------|----------------------|----------|--------------|
| Lakshya Saini         | Backend Developer   | LakshyaSainibtechcse22-26@liet.in          | [LinkedIn](https://www.linkedin.com/in/lakshya2513saini)   | LIET         |
| Pradeep Soni          | Backend Developer   | pradeepsoniofficial@gmail.com          | [LinkedIn](https://www.linkedin.com/in/pradeepsoniofficial/)   | LIET         |
| Akshay Saini          | Frontend Developer  | akshaysainibtechcse22-26@liet.in          | [LinkedIn](https://www.linkedin.com/in/akshay2513saini)   | LIET         |
| Asutosh Kumar Maurya  | Frontend Developer  | ashutoshmauryabtechcse22-26@liet.in          | [LinkedIn](https://www.linkedin.com/in/ashu-maurya-9026xxxx)   | LIET         |
| Pranshu Gupta         | 3D Designer         | pranshuguptabtechcse22-26@liet.in          | [LinkedIn](https://www.linkedin.com/in/pranshu-gupta-64b338370)    | LIET         |  

---

## 8. Additional Links  
- **GitHub Repository**: [Reference 1_(React Docs)](https://react.dev/learn),  [Reference 2 (MongoDB Docs)](https://www.mongodb.com/docs/atlas/),  [Reference 3_(FastAPI's Docs)](https://fastapi.tiangolo.com/)
- **Project Demo/Video**:  [Project Demo/Video](https://github.com/user-attachments/assets/c30950f9-6bc3-4770-8f5b-ad130a71b2fd)   
- **Deployed App**: https://intellecto-edtech.vercel.app/

---

## 9. Instructions for Evaluators  
1. Clone the repository.  
2. Backend setup:  
   ```bash
   cd Intellecto-Edtech-backend
   pip install -r requirements.txt
   uvicorn main:app --reload
   ```  
3. Frontend setup:  
   ```bash
   cd Intellecto_Edtech-frontend
   npm install
   npm run dev
   ```  
4. Configure `.env` files with MongoDB, Firebase, and Gemini API keys.  
5. Access the platform via `http://localhost:3000` (frontend) and `http://localhost:8000` (backend).  
6. Use `/admin` dashboard for evaluator access and API testing.  
