# 🏫 College Complaint Management System

> A secure, cloud-based platform for submitting, tracking, and managing college complaints using Firebase.

The **College Complaint Management System** is a serverless web application designed to simplify communication between students and college administration.

Students can securely sign in using Google, submit complaints, track their progress, and view administrative responses. Administrators have a dedicated dashboard to view, search, filter, update, and resolve complaints.

The application uses **Firebase Authentication, Cloud Firestore, Firestore Security Rules, and Firebase Hosting** to provide a complete cloud-based solution without maintaining a traditional backend server.

---

## ✨ Key Features

### 👨‍🎓 Student Portal

- 🔐 Google Sign-In authentication
- 📊 Personalized student dashboard
- 📝 Submit new complaints
- 🏷️ Select complaint categories
- 📋 View previously submitted complaints
- 🔎 Track complaint status
- 💬 View administrator responses
- 📄 View detailed complaint information
- 🚪 Secure logout

### 👨‍💼 Admin Portal

- 🔐 Google Sign-In authentication
- 👤 Role-based administrator access
- 📊 Complaint statistics dashboard
- 📋 View all submitted complaints
- 🔎 Search complaints
- 🏷️ Filter by category
- 📌 Filter by complaint status
- 📄 View complete complaint details
- 🔄 Update complaint status
- 💬 Add administrative responses
- 📈 Monitor complaint resolution

---

## 🔄 Complaint Lifecycle

Each complaint follows a simple workflow:

```text
                    ┌──────────────┐
                    │    Student   │
                    │ submits      │
                    │  complaint   │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │    Pending   │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │ Under Review │
                    └──────┬───────┘
                           │
                           ▼
                    ┌──────────────┐
                    │   Resolved   │
                    └──────┬───────┘
                           │
                           ▼
                    Student views
                  status & response

## ☁️ System Architecture

                         USERS
                           │
              ┌────────────┴────────────┐
              │                         │
           Student                    Admin
              │                         │
              └────────────┬────────────┘
                           │
                           ▼
                 Firebase Authentication
                      Google Sign-In
                           │
                           ▼
                    Role Verification
                     /              \
                    /                \
                   ▼                  ▼
          Student Dashboard     Admin Dashboard
                   │                  │
                   └────────┬─────────┘
                            │
                            ▼
                    Cloud Firestore
                     /            \
                    /              \
                 Users          Complaints
                            │
                            ▼
                  Firestore Security
                       Rules
                            │
                            ▼
                    Firebase Hosting
                            │
                            ▼
                         Internet

🧩 Main Modules
1. Authentication Module

Firebase Authentication is used to provide Google-based login.

After authentication, the application identifies the user's role from Firestore.

Google Login
     ↓
Firebase Authentication
     ↓
User UID
     ↓
users/{UID}
     ↓
Role
 ┌───┴────┐
 ▼        ▼
Student  Admin
2. Student Complaint Module

Students can submit complaints by providing:

Complaint category
Complaint title
Complaint description

The complaint is stored in Cloud Firestore with the student's authenticated UID.

3. Complaint Tracking Module

Students can view:

Complaint ID
Category
Title
Submission date
Current status
Administrative response
Last updated date

Complaint statuses are:

Pending
Under Review
Resolved
4. Administration Module

Administrators can manage complaints through a dedicated dashboard.

The dashboard provides:

Total complaints
Pending complaints
Complaints under review
Resolved complaints
Search
Category filtering
Status filtering

Administrators can open an individual complaint and update its status or add a response.

5. Role-Based Access Control

The application separates student and administrator functionality.

                 Authenticated User
                         │
                         ▼
                  Check User Role
                    /         \
                   /           \
                  ▼             ▼
             Student           Admin
                │                │
                ▼                ▼
       Student Dashboard    Admin Dashboard

Student access is restricted to the student's own complaints, while administrators can manage complaint records.

🔐 Security

Security is implemented using Firebase Authentication and Cloud Firestore Security Rules.

Student Access

A student can:

Create their own complaint.
Read their own complaint records.

A student cannot:

Read another student's complaints.
Modify complaint status.
Modify administrative responses.
Change their role from student to admin.
Administrator Access

An administrator can:

View complaint records.
Update complaint status.
Add administrative responses.
Manage complaints.

The user's Firebase Authentication UID is used to associate complaints with the correct student.

🗄️ Database Design

The project uses Cloud Firestore, a NoSQL cloud database.

Users Collection
users
 └── {uid}
      ├── name
      ├── email
      ├── photoURL
      ├── role
      └── createdAt
Complaints Collection
complaints
 └── {complaintId}
      ├── studentId
      ├── studentName
      ├── studentEmail
      ├── category
      ├── title
      ├── description
      ├── status
      ├── adminResponse
      ├── createdAt
      └── updatedAt
🏷️ Complaint Categories

The system currently supports:

Infrastructure
Laboratory
Academics
Transport
Cleanliness
Electricity
Internet / Wi-Fi
Hostel
Canteen
Other
🛠️ Technology Stack
Technology	Purpose
HTML5	Application structure
CSS3	User interface and responsive styling
JavaScript	Frontend logic and Firebase integration
Firebase Authentication	Google authentication
Cloud Firestore	Cloud-based NoSQL database
Firestore Security Rules	Data access control
Firebase Hosting	Cloud deployment
Git	Version control
GitHub	Source code management
☁️ Cloud Computing Concepts

This project demonstrates several important cloud computing concepts.

Authentication as a Service

Firebase Authentication provides managed authentication through Google Sign-In without implementing a custom authentication server.

Cloud Database

Cloud Firestore stores users, complaints, statuses, timestamps, and administrative responses in the cloud.

Serverless Architecture

The application uses managed cloud services instead of requiring a self-managed application server.

Cloud Hosting

Firebase Hosting makes the frontend application available through the internet.

Cloud Security

Firestore Security Rules enforce authentication and role-based access to cloud data.

Scalability

The infrastructure is managed by Firebase, reducing the need to manually configure and maintain servers.

📁 Project Structure
CollegeComplaintSystem/
│
├── index.html                  # Login page
├── dashboard.html              # Student dashboard
├── complaint.html              # Complaint submission
├── student-complaint.html      # Student complaint details
├── admin.html                  # Admin dashboard
├── admin-complaint.html        # Admin complaint management
│
├── css/
│   └── style.css               # Application styling
│
├── js/
│   ├── firebase.js             # Firebase configuration
│   ├── auth.js                 # Authentication and logout
│   ├── student.js              # Student dashboard logic
│   ├── complaint.js            # Complaint submission logic
│   ├── student-complaint.js    # Student complaint details
│   ├── admin.js                # Admin dashboard logic
│   └── admin-complaint.js      # Admin complaint management
│
├── firebase.json               # Firebase Hosting configuration
├── .firebaserc                 # Firebase project configuration
├── .gitignore                  # Git ignored files
└── 404.html                    # Firebase Hosting error page
🚀 Getting Started
Prerequisites

Make sure the following are installed:

Node.js
Firebase CLI
Git
Visual Studio Code
1. Clone the Repository
git clone https://github.com/YOUR-USERNAME/college-complaint-management-system.git
2. Open the Project
cd college-complaint-management-system
3. Open in VS Code
code .
4. Run Locally

The application can be run using the Live Server extension in Visual Studio Code.

Open:

index.html

and launch it using Live Server.

🔥 Firebase Configuration

The project requires a Firebase project configured with:

Firebase Authentication
Google Sign-In provider
Cloud Firestore
Firestore Security Rules
Firebase Hosting

The Firebase web configuration is placed in:

js/firebase.js

The application uses the Firebase modular JavaScript SDK.

🌐 Firebase Hosting Deployment

Login to Firebase:

firebase login

Initialize Firebase Hosting:

firebase init hosting

Deploy the project:

firebase deploy --only hosting

After deployment, Firebase provides a public HTTPS URL for the application.

🔒 Firestore Security Model

The application uses role-based Firestore access.

Conceptually:

Authenticated User
       │
       ▼
 Firebase UID
       │
       ▼
 users/{UID}
       │
       ▼
     role
    /    \
   /      \
  ▼        ▼
student   admin
  │         │
  ▼         ▼
Own data   Manage complaints

This prevents normal students from accessing or modifying administrative functionality through Firestore.

📸 Application Screens

Add screenshots of the application here after deployment.

Login Page

Add screenshot here.

Student Dashboard

Add screenshot here.

Complaint Submission

Add screenshot here.

Student Complaint Details

Add screenshot here.

Admin Dashboard

Add screenshot here.

Complaint Management

Add screenshot here.

🎯 Project Objectives

The main objectives of the project are:

To provide a centralized platform for college complaint management.
To simplify complaint submission and tracking.
To improve communication between students and administration.
To provide administrators with a structured complaint management system.
To implement secure role-based access control.
To demonstrate practical cloud computing concepts using Firebase.
To deploy a web application using cloud hosting services.
🔮 Future Enhancements

The system can be extended with:

📧 Email notifications for complaint updates
⚡ Real-time complaint status updates
🏢 Department-wise complaint assignment
🚨 Complaint priority levels
📊 Advanced analytics and reporting
🤖 Automatic complaint categorization
⚙️ Firebase Cloud Functions for automated workflows
⏱️ Complaint resolution time analysis
📱 Progressive Web App support
👩‍💻 Author

K. Vishishta Reddy

B.Tech – Computer Science and Engineering
Artificial Intelligence and Machine Learning

🎓 Academic Project

This project was developed as an academic Cloud Computing project to demonstrate the practical application of cloud-based authentication, database services, security rules, hosting, and serverless architecture.
