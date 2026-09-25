# 🏫 College Complaint Management System

A simple cloud-based web application that allows students to submit and track college complaints online, while administrators can review and manage them.

## 🚀 Features

- 🔐 Google Login using Firebase Authentication
- 📝 Submit college complaints
- 📊 Track complaint status
- 👨‍💼 Admin dashboard to manage complaints
- 💬 Admin can add responses
- ☁️ Cloud-based data storage using Firebase Firestore
- 🛡️ Role-based access using Firestore Security Rules
- 🌐 Hosted using Firebase Hosting

## 🔄 How It Works

```text
Student
   ↓
Google Login
   ↓
Student Dashboard
   ↓
Submit Complaint
   ↓
Cloud Firestore
   ↓
Admin Dashboard
   ↓
Update Status / Response
   ↓
Student Tracks Complaint
```
**📌 Complaint Status
**```text
Pending → Under Review → Resolved
```
**🛠️ Technologies Used
**HTML
CSS
JavaScript
Firebase Authentication
Cloud Firestore
Firebase Hosting
**☁️ Cloud Concepts Used
**
This project demonstrates:

Cloud Authentication
Cloud NoSQL Database
Serverless Architecture
Role-Based Access Control
Cloud Hosting
Database Security Rules
**👥 User Roles
**Student
Login using Google
Submit complaints
View submitted complaints
Track complaint status
View admin responses
Administrator
Login using Google
View all complaints
Filter complaints
Update complaint status
Add responses
**📂 Project Structure
**```text
CollegeComplaintSystem/
│
├── index.html
├── dashboard.html
├── complaint.html
├── admin.html
├── admin-complaint.html
├── student-complaint.html
│
├── css/
│   └── style.css
│
└── js/
    ├── firebase.js
    ├── auth.js
    ├── student.js
    ├── complaint.js
    ├── admin.js
    ├── admin-complaint.js
    └── student-complaint.js
```
**🎯 Objective
**
The main objective of this project is to replace manual complaint handling with a centralized cloud-based system that is simple, secure, and accessible to students and administrators.

**🔮 Future Enhancement
**Email notifications for complaint updates
Automatic complaint categorization using AI
Analytics dashboard
Cloud Functions for automated workflows
**👩‍💻 Developed By
**
K. Vishishta Reddy

B.Tech – Computer Science and Engineering (AI & ML)
