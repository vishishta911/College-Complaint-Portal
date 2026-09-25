# College Complaint Management System

A cloud-based College Complaint Management System that allows students to submit and track complaints while enabling administrators to manage complaints, update their status, and provide responses.

The system is developed using HTML, CSS, JavaScript, and Firebase, with Firebase providing authentication, cloud database, security, and hosting services.

## Project Overview

The College Complaint Management System provides a centralized online platform for handling student complaints.

Students can securely log in using their Google account, submit complaints, track their status, and view responses from the administration.

Administrators can log in through their Google account, view all complaints, filter and search complaints, update complaint status, and provide responses.

The application follows a serverless cloud architecture using Firebase services.

## Features

### Student Features

- Google Authentication
- Student dashboard
- Submit complaints
- Select complaint category
- View submitted complaints
- Track complaint status
- View administrator responses
- View detailed complaint information
- Secure access to personal complaints
- Logout functionality

### Administrator Features

- Google Authentication
- Role-based administrator access
- Administrator dashboard
- View all complaints
- Search complaints
- Filter complaints by status
- Filter complaints by category
- View complaint details
- Update complaint status
- Add administrative responses
- View complaint statistics

## Complaint Workflow

```text
Student Login
     |
     v
Submit Complaint
     |
     v
Pending
     |
     v
Under Review
     |
     v
Resolved
     |
     v
Student Views Status and Response

Technologies Used
Technology	Purpose
HTML5	Web page structure
CSS3	User interface and styling
JavaScript	Application logic
Firebase Authentication	Google-based authentication
Cloud Firestore	Cloud database
Firestore Security Rules	Access control and data security
Firebase Hosting	Cloud hosting
Git & GitHub	Version control and repository
Cloud Architecture
                    Student
                       |
                       v
              Firebase Hosting
                       |
                       v
           Firebase Authentication
                       |
                       v
                Role Detection
                 /           \
                /             \
               v               v
      Student Dashboard   Admin Dashboard
               \             /
                \           /
                 v         v
                 Cloud Firestore
                       |
                       v
              Complaint Management
Authentication and Authorization

The application uses Firebase Authentication with Google Sign-In.

After authentication, the system checks the user's role stored in Cloud Firestore.

Google Login
     |
     v
Firebase Authentication
     |
     v
User Profile
     |
     +----------------+
     |                |
     v                v
  Student           Admin
     |                |
     v                v
Student Portal    Admin Portal

The system uses Firestore Security Rules to control access to application data.

Student Permissions

Students can:

Create their own complaints.
Read their own complaints.

Students cannot:

Access other students' complaints.
Modify complaint status.
Change their role to administrator.
Administrator Permissions

Administrators can:

View complaints.
Update complaint status.
Add administrative responses.
Manage complaint records.
Firestore Database Structure
Users Collection
users
 └── {userId}
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
Complaint Categories
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
Project Structure
CollegeComplaintSystem/
|
├── index.html
├── dashboard.html
├── complaint.html
├── admin.html
├── admin-complaint.html
├── student-complaint.html
|
├── css/
|   └── style.css
|
├── js/
|   ├── firebase.js
|   ├── auth.js
|   ├── student.js
|   ├── complaint.js
|   ├── admin.js
|   ├── admin-complaint.js
|   └── student-complaint.js
|
├── firebase.json
├── .firebaserc
├── .gitignore
└── 404.html
Running the Project Locally
Prerequisites
Node.js
Firebase CLI
Git
VS Code
Clone the Repository
git clone https://github.com/YOUR-USERNAME/college-complaint-management-system.git
Open the Project
cd college-complaint-management-system

The application can be run locally using the VS Code Live Server extension.

Firebase Deployment

Login to Firebase:

firebase login

Initialize Firebase Hosting:

firebase init hosting

Deploy the application:

firebase deploy --only hosting

After successful deployment, Firebase provides a hosted URL for accessing the application.

Security

Security is implemented using Firebase Authentication and Firestore Security Rules.

The application follows role-based access control to ensure that:

Users must be authenticated.
Students can access only their own complaint records.
Administrators can manage complaint records.
Students cannot change their role to administrator.
Complaint status updates are restricted to administrators.
Cloud Computing Concepts Demonstrated
Authentication as a Service

Firebase Authentication provides Google-based authentication without requiring a custom authentication server.

Cloud Database

Cloud Firestore provides a cloud-based NoSQL database for storing users and complaints.

Serverless Architecture

The application uses managed Firebase services instead of requiring a traditional self-managed backend server.

Cloud Hosting

Firebase Hosting makes the application accessible through the internet.

Cloud Security

Firestore Security Rules provide access control for cloud-stored data.

Scalability

Firebase manages the underlying infrastructure, reducing the need to manually manage servers as application usage changes.

Future Enhancements
Email notifications for complaint status changes
Real-time complaint updates
Department-specific complaint assignment
Complaint priority levels
Analytics dashboard
Automatic complaint categorization
Serverless Cloud Functions for automated notifications
Complaint resolution time analytics
Project Objective

The main objective of this project is to develop a centralized, secure, and cloud-based complaint management platform that improves communication between students and college administration while demonstrating practical cloud computing concepts.

Author

K. Vishishta Reddy

B.Tech - Computer Science and Engineering
Artificial Intelligence and Machine Learning