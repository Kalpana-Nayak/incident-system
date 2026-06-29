# Incident Management System

A web-based **Incident Management System** built using **Node.js, Express.js, EJS, SQLite, Docker, and Nodemailer**. The application enables users to report, track, update, and close incidents through a user-friendly interface and RESTful APIs. It also includes role-based authentication and email notifications for incident creation.

---

## 🚀 Features

* 🔐 Role-based Login (Admin/User)
* 📝 Create New Incidents
* 📋 View All Incidents
* ✏️ Update Incident Details
* ✅ Close Incidents
* 🗄️ SQLite Database Integration
* 📧 SMTP Email Notifications (Nodemailer)
* 🔄 REST API Support
* 🐳 Dockerized Application
* ⚙️ GitHub CI/CD Integration

---

## 🛠️ Technologies Used

* Node.js
* Express.js
* EJS
* SQLite
* Express Session
* Nodemailer
* Docker
* Git & GitHub

---

## 📁 Project Structure

```text
incident-system/
│
├── config/
│   └── mail.js
├── views/
│   ├── index.ejs
│   ├── issues.ejs
│   └── login.ejs
├── database.js
├── app.js
├── package.json
├── Dockerfile
├── .env
├── .gitignore
└── README.md
```

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone <repository-url>
cd incident-system
```

### Install Dependencies

```bash
npm install
```

### Create a `.env` File

```env
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_16_character_app_password
```

### Start the Server

```bash
node app.js
```

Open your browser:

```text
http://localhost:3000
```

---

## 🐳 Docker Setup

### Build Docker Image

```bash
docker build -t incident-system .
```

### Run Docker Container

```bash
docker run -p 3000:3000 incident-system
```

---

## 📡 REST API Endpoints

| Method | Endpoint                   | Description            |
| ------ | -------------------------- | ---------------------- |
| GET    | `/api/incidents`           | Retrieve all incidents |
| POST   | `/api/incidents`           | Create a new incident  |
| PUT    | `/api/incidents/:id`       | Update an incident     |
| PUT    | `/api/incidents/:id/close` | Close an incident      |

---

## 📧 Email Notifications

The application uses **Nodemailer** with Gmail SMTP to send email notifications whenever:

* A new incident is created
* An incident is closed

---

## 📸 Screenshots

Include the following screenshots:

* Login Page
* Dashboard/Home Page
* Incident List
* Create Incident Form
* Closed Incident
* Email Notification
* Docker Container Running
* API Testing using Postman

---

## 🔮 Future Enhancements

* User Registration
* Password Encryption with Database Authentication
* Search and Filter Incidents
* Dashboard Analytics
* Incident Priority Levels
* File Attachments
* Deployment on Cloud Platforms

---

## 👩‍💻 Author

**Kalpana Nayak**

Information Technology Student

Veer Surendra Sai University of Technology (VSSUT), Burla

---

## 📄 License

This project was developed for learning and internship purposes.
