# 🚀 Sales CRM Lite

A modern **Sales CRM (Customer Relationship Management)** web application built with **Next.js, Express.js, Node.js, and MongoDB**. It helps sales teams efficiently manage leads, tasks, sales pipelines, user roles, and follow-up reminders through a secure and user-friendly interface.

---

## 📖 Project Overview

Sales CRM Lite is designed to simplify customer relationship management for small and medium-sized businesses. The application provides separate dashboards for administrators and sales users, allowing efficient lead tracking, task management, pipeline visualization, and follow-up scheduling.

---

## ✨ Features

### 🔐 Authentication & Authorization
- JWT Authentication
- Secure Password Hashing (bcrypt)
- Role-Based Access Control (Admin & User)
- Protected Routes

### 👤 Admin Features
- Dashboard Overview
- User Management
- Lead Management
- Sales Analytics
- Pipeline Monitoring
- Task Management
- Follow-up Tracking

### 👨‍💼 User Features
- Personal Dashboard
- Lead Management
- Task Management
- Sales Pipeline
- Follow-up Reminders
- Profile Management

### 📊 CRM Features
- Lead Creation & Tracking
- Kanban Pipeline
- Task Assignment
- Automated Follow-up Scheduling
- Analytics Dashboard
- Secure REST APIs

---

# 🛠️ Technology Stack

## Frontend
- Next.js
- React.js
- TypeScript
- Axios
- Context API
- CSS

## Backend
- Node.js
- Express.js
- TypeScript
- JWT Authentication
- Bcrypt
- Node Cron

## Database
- MongoDB
- Mongoose

---

# 📁 Project Structure

```
Sales-CRM-Lite
│
├── frontend
│   ├── src
│   ├── components
│   ├── contexts
│   ├── services
│   └── app
│
├── sales-crm-lite-backend
│   └── backend
│       ├── src
│       │   ├── admin
│       │   ├── user
│       │   ├── models
│       │   ├── middlewares
│       │   ├── config
│       │   └── utils
│       └── package.json
│
└── README.md
```

---

# 🔑 Main Modules

- Authentication
- User Management
- Lead Management
- Task Management
- Sales Pipeline
- Analytics
- Follow-up Reminder System

---

# 🔄 System Workflow

```
User Login
      │
      ▼
JWT Authentication
      │
      ▼
Role Verification
      │
      ▼
Admin / User Dashboard
      │
      ▼
Manage Leads
Manage Tasks
Track Pipeline
View Analytics
Schedule Follow-ups
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/rajdeep-mondal886/Sales-CRM-Lite.git
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## Backend Setup

```bash
cd sales-crm-lite-backend/backend
npm install
npm run dev
```

---

# 🔧 Environment Variables

Create a `.env` file inside the backend folder.

Example:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

JWT_EXPIRES_IN=7d
```

---

# 🌐 API Features

- User Authentication
- User Management
- Lead CRUD Operations
- Task CRUD Operations
- Pipeline Management
- Analytics
- Follow-up Scheduling

---

# 🔒 Security Features

- JWT Authentication
- Password Encryption using bcrypt
- Protected Routes
- Role-Based Authorization
- Input Validation
- Error Handling Middleware

---


# 🚀 Future Improvements

- Email Notifications
- SMS Reminders
- File Uploads
- Customer Notes
- Export Reports (PDF/Excel)
- Real-Time Notifications
- Mobile Responsive Enhancements
- Docker Deployment

---

# 👨‍💻 Author

**Rajdeep Mondal**

B.Tech in Computer Science and Engineering  
Specialization in Cyber Security

GitHub:
https://github.com/rajdeep-mondal886

---

# ⭐ If you like this project

Please consider giving this repository a ⭐ on GitHub.
