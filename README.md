College Complaint Management System

A cloud-based College Complaint Management System that allows students to submit and track complaints while enabling administrators to manage complaints, update their status, and provide responses.

The system is developed using HTML, CSS, JavaScript, and Firebase, with Firebase providing authentication, cloud database, security, and hosting services.

Project Overview

In traditional college complaint systems, students may need to submit complaints manually or communicate with different departments separately. This can make complaint tracking and resolution difficult.

The College Complaint Management System provides a centralized online platform where:

Students can securely log in using Google.
Students can submit complaints online.
Students can track complaint status.
Students can view administrative responses.
Administrators can view and manage all complaints.
Administrators can update complaint status and provide responses.
Firestore Security Rules control access to student and administrator data.

The application follows a serverless cloud architecture using Firebase services.

Features
Student
Google Authentication
Student dashboard
Submit new complaints
Select complaint category
View submitted complaints
Track complaint status
View administrator responses
View detailed complaint information
Secure access to personal complaints
Logout functionality
Administrator
Google Authentication
Role-based administrator access
Administrator dashboard
View all complaints
Search complaints
Filter complaints by status
Filter complaints by category
View complaint details
Update complaint status
Add administrative responses
Track complaint statistics
Complaint Workflow

Student Login
↓
Submit Complaint
↓
Pending
↓
Under Review
↓
Resolved
↓
Student Views Status & Response

Technologies Used

HTML5 – Web page structure
CSS3 – User interface and styling
JavaScript – Application logic
Firebase Authentication – Google-based authentication
Cloud Firestore – Cloud database
Firestore Security Rules – Access control and data security
Firebase Hosting – Cloud hosting
Git & GitHub – Version control and project repository

Cloud Architecture

Student
↓
Firebase Hosting
↓
Firebase Authentication
↓
Role Detection
↓
Student Dashboard / Admin Dashboard
↓
Cloud Firestore
↓
Complaint Management

Authentication and Authorization

The application uses Firebase Authentication with Google Sign-In.

After authentication, the system checks the user's role stored in Firestore.

Google Login
↓
Firebase Authentication
↓
User Profile
↓
Student / Admin
↓
Student Portal / Admin Portal

The system uses Firestore Security Rules to restrict access to data.

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
Users
users
 └── {userId}
      ├── name
      ├── email
      ├── photoURL
      ├── role
      └── createdAt
Complaints
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
├── js/
│   ├── firebase.js
│   ├── auth.js
│   ├── student.js
│   ├── complaint.js
│   ├── admin.js
│   ├── admin-complaint.js
│   └── student-complaint.js
│
├── firebase.json
├── .firebaserc
├── .gitignore
└── 404.html
Running the Project Locally
Prerequisites
Node.js
Firebase CLI
Git
Clone the Repository
git clone https://github.com/YOUR-USERNAME/college-complaint-management-system.git
Open the Project
cd college-complaint-management-system

The application can be run locally using VS Code Live Server.

Firebase Deployment

Login to Firebase:

firebase login

Initialize Firebase Hosting:

firebase init hosting

Deploy the application:

firebase deploy --only hosting

After successful deployment, Firebase provides a hosted URL for the application.

Security

Security is implemented using Firebase Authentication and Firestore Security Rules.

The application follows role-based access control, ensuring that:

Users must be authenticated.
Students can access only their own complaint records.
Administrators can manage complaint records.
Students cannot promote themselves to administrator.
Complaint status updates are restricted to administrators.
Cloud Computing Concepts Demonstrated
1. Authentication as a Service

Firebase Authentication provides Google-based authentication without requiring a custom authentication server.

2. Cloud Database

Cloud Firestore provides a NoSQL cloud database for storing users and complaints.

3. Serverless Architecture

The application uses managed Firebase services instead of maintaining traditional application servers.

4. Cloud Hosting

Firebase Hosting makes the web application accessible through the internet.

5. Cloud Security

Firestore Security Rules provide access control for cloud-stored data.

6. Scalability

Firebase manages the underlying infrastructure, reducing the need to manually manage servers as usage changes.

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

B.Tech – Computer Science and Engineering
Artificial Intelligence and Machine Learning

License

This project is developed for academic and educational purposes.