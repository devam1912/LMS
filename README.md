# 🚀 Virtual Course – AI Powered Multilingual LMS (MERN SaaS Platform)

**Virtual Course** is a full-scale AI-powered Learning Management System (LMS) built on the MERN Stack that enables multilingual intelligent course discovery, secure online payments, Google OAuth login, and a complete educator–student learning ecosystem.

🌐 **Live Demo:** https://lms-frontend-ko82.onrender.com  
💻 **GitHub Repo:** https://github.com/devam1912/LMS

---

## ✨ Key Highlights

### 🎙 AI Optimized Multilingual Search
Students can search in any language or voice:
- “Muje React sikhna hai”
- “Best backend course in Hindi”
- “Curso de Python para IA en Español”

AI understands user intent, optimizes queries, ranks courses, and returns best results instantly.

---

## 👨‍🏫 Educator Features
- Create & publish courses  
- Upload lectures & thumbnails  
- Edit & delete courses  
- Track engagement  
- View reviews & ratings  

## 🎓 Student Features
- AI-powered course discovery  
- Razorpay secure checkout  
- Rate & review courses  
- Profile management  

---

## 🔐 Security & Payments
- Google OAuth Authentication  
- JWT-based session handling  
- Razorpay Payment Gateway  
- OTP Password Reset System  

---

## 🧠 AI Capabilities
- Multilingual NLP  
- Intent Detection  
- Smart Ranking Engine  
- Recommendation System  

---

## 🛠 Tech Stack

| Layer | Technologies |
|------|------------|
| Frontend | React, Tailwind CSS |
| Backend | Node.js, Express |
| Database | MongoDB Atlas |
| Auth | Google OAuth, JWT |
| Payments | Razorpay |
| AI | NLP Intent Engine |
| Deployment | Render |

---
## 📁 Project Structure

### Backend

```bash
Backend/
├── config/
│   ├── cloudinary.js
│   ├── connectDB.js
│   ├── sendMail.js
│   └── token.js
├── controller/
│   ├── authController.js
│   ├── courseController.js
│   ├── orderController.js
│   ├── reviewController.js
│   ├── searchController.js
│   └── userController.js
├── middleware/
│   ├── isAuth.js
│   └── multer.js
├── model/
│   ├── courseModel.js
│   ├── lectureModel.js
│   ├── reviewModel.js
│   └── userModel.js
├── route/
│   ├── authRoute.js
│   ├── courseRoute.js
│   ├── paymentRoute.js
│   ├── reviewRoute.js
│   └── userRoute.js
├── index.js
└── package.json
```
### Frontend
```bash
Frontend/
├── public/
│   ├── .gitkeep
│   └── logo.jpg
├── src/
│   ├── assets/
│   │   ├── SearchAi.png
│   │   ├── SearchAi - Copy.png
│   │   ├── about.jpg
│   │   ├── about.mp4
│   │   ├── ai.png
│   │   ├── empty.jpg
│   │   ├── google.jpg
│   │   ├── home.jpg
│   │   ├── home1.jpg
│   │   ├── logo.jpg
│   │   ├── mic.png
│   │   └── start.mp3
│   ├── components/
│   │   ├── About.jsx
│   │   ├── Card.jsx
│   │   ├── CardPage.jsx
│   │   ├── ExploreCourses.jsx
│   │   ├── Footer.jsx
│   │   ├── Logos.jsx
│   │   ├── Nav.jsx
│   │   ├── ReviewCard.jsx
│   │   ├── ReviewPage.jsx
│   │   └── ScrollToTop.jsx
│   ├── customHooks/
│   │   ├── getAllReviews.js
│   │   ├── getCreatorCourse.js
│   │   ├── getCurrentUser.js
│   │   └── getPublishedCourse.js
│   ├── pages/
│   │   ├── Educator/
│   │   ├── Courses.jsx
│   │   ├── CreateCourses.jsx
│   │   ├── CreateLecture.jsx
│   │   ├── Dashboard.jsx
│   │   ├── EditCourse.jsx
│   │   ├── EditLecture.jsx
│   │   ├── AllCourses.jsx
│   │   ├── EditProfile.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── Home.jsx
│   │   ├── LogIn.jsx
│   │   ├── MyEnrolledCourses.jsx
│   │   ├── Profile.jsx
│   │   ├── SearchWithAI.jsx
│   │   ├── SignUp.jsx
│   │   ├── ViewCourse.jsx
│   │   └── ViewLecture.jsx
│   ├── redux/
│   │   ├── courseSlice.js
│   │   ├── lectureSlice.js
│   │   ├── reviewSlice.js
│   │   ├── store.js
│   │   └── userSlice.js
│   ├── utils/
│   │   └── firebase.js
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

## 🌐 API Routes

### 🔐 Auth Routes (`/api/auth`)

| Method | Endpoint | Description |
|-------|----------|-------------|
| POST | /signup | Register new user |
| POST | /login | Login user |
| GET | /logout | Logout user |
| POST | /sendotp | Send password reset OTP |
| POST | /verifyotp | Verify OTP |
| POST | /resetpassword | Reset password |
| POST | /googleauth | Login/Register via Google OAuth |

---

### 👤 User Routes (`/api/user`)

| Method | Endpoint | Description |
|-------|----------|-------------|
| GET | /getcurrentuser | Fetch currently logged-in user |
| POST | /profile | Update user profile & photo |

---

### 📚 Course Routes (`/api/course`)

| Method | Endpoint | Description |
|-------|----------|-------------|
| POST | /create | Create new course |
| GET | /getpublished | Get all published courses |
| GET | /getcreator | Get courses created by logged-in instructor |
| GET | /getcourse/:courseId | Get single course details |
| POST | /editcourse/:courseId | Edit course details |
| DELETE | /remove/:courseId | Delete course |
| POST | /createlecture/:courseId | Add lecture to course |
| GET | /courselecture/:courseId | Get all lectures of course |
| POST | /editlecture/:lectureId | Edit lecture |
| DELETE | /removelecture/:lectureId | Delete lecture |
| POST | /creator | Get creator profile |
| POST | /search | AI multilingual course search |

---

### 💳 Order Routes (`/api/order`)

| Method | Endpoint | Description |
|-------|----------|-------------|
| POST | /razorpay-order | Create Razorpay payment order |
| POST | /verifypayment | Verify Razorpay payment |

---

### ⭐ Review Routes (`/api/review`)

| Method | Endpoint | Description |
|-------|----------|-------------|
| POST | /createreview | Add course review |
| GET | /getreview | Get all reviews |

---

## ⚙ Installation

```bash
git clone https://github.com/devam1912/LMS.git
cd LMS
npm install
cd Frontend
npm install
```
## Environment Variables (Backend/.env)
```bash
MONGO_URI=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
JWT_SECRET=
```
```bash
npm run dev
```
## 🚀 Future Enhancements

- 🤖 **AI Chatbot Tutor** – Real-time doubt solving assistant  
- 🗺️ **Learning Roadmaps** – Personalized learning paths  
- 📊 **Instructor Analytics** – Course performance insights  
- 📜 **Certificates** – Auto-generated completion certificates  
- 📱 **Mobile App** – Android & iOS application  

---

## 👨‍💻 Author

**Devam**  
🔗 GitHub: https://github.com/devam1912  

---

⭐ **If you like this project, don’t forget to star the repository!**

