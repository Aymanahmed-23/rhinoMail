# RhinoMail

RhinoMail is a full-stack email subscription and newsletter platform.
Users can subscribe with their email, verify their subscription, receive newsletters, and unsubscribe anytime.

The project is built with **Node.js, Express, MongoDB, and Resend** for the backend, and a **frontend deployed on Vercel**.

---

## Live Deployment

Frontend (Vercel):
https://rhino-mail-f3wdf3432-ayman-ahmeds-projects-0acc1662.vercel.app/

Backend API (Render):
https://rhinomail.onrender.com

---

## Features

* Email subscription system
* Email verification using secure token
* Newsletter sending to verified subscribers
* Unsubscribe functionality
* Admin subscriber management
* Resend email integration
* MongoDB database storage

---

## Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Resend Email API
* Render (deployment)

### Frontend

* JavaScript / React (or your framework)
* Vercel (deployment)

---

## Project Structure

```
rhinoMail/
│
├── frontend/          # Frontend application (Vercel)
│
├── backend/           # Express API
│   ├── controllers/
│   ├── routes/
│   ├── middlewares/
│   ├── models/
│   ├── utils/
│   ├── database/
│   └── server.js / app.js
│
├── README.md
└── LICENSE
```

---

## Branch Workflow

This repository uses two main branches:

**local**

* Main development branch
* Used for writing and testing new features

**master**

* Production deployment branch
* Render deploys the backend from this branch

Typical workflow:

```
git checkout local
# develop and test features

git checkout master
git merge local
git push origin master
```

---

## Environment Variables

Create a `.env` file in the backend directory.

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
RESEND_API_KEY=your_resend_api_key
BASE_URL=https://rhinomail.onrender.com
FRONTEND_URL=https://your-vercel-app.vercel.app
```

---

## Installation

Clone the repository:

```
git clone https://github.com/Aymanahmed-23/rhinoMail.git
cd rhinoMail
```

Install backend dependencies:

```
cd backend
npm install
```

Run the development server:

```
npm run dev
```

---

## API Endpoints

### Authentication

```
POST /api/v1/auth/sign-in
POST /api/v1/auth/sign-up
```

### Subscriptions

```
POST /api/v1/subscriptions/subscribe
GET  /api/v1/subscriptions/verify/:token
POST /api/v1/subscriptions/unsubscribe
```

### Admin

```
GET  /api/v1/subscriptions
POST /api/v1/subscriptions/newsletter
```

---

## Email System

RhinoMail uses **Resend**
