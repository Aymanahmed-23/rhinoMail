# RhinoMail

RhinoMail is a backend API for managing email subscriptions and newsletters.
It allows users to subscribe, verify their email, unsubscribe, and receive newsletters.

The API is built with **Node.js, Express, and MongoDB**, and uses **Resend** for sending emails.

---

## Features

* Email subscription system
* Email verification with secure token
* Unsubscribe functionality
* Newsletter broadcasting
* Admin subscriber management
* Resend email integration
* MongoDB database

---

## Tech Stack

* Node.js
* Express.js
* MongoDB + Mongoose
* Resend (Email API)
* Render (Backend Deployment)
* Vercel (Frontend Deployment)

---

## Branch Workflow

This project uses two main branches:

* **local** → Main development branch
* **master** → Deployment branch (used by Render)

Workflow:

1. Develop features in the `local` branch
2. Test locally
3. Merge or copy changes to `master`
4. Push `master` to GitHub
5. Render automatically deploys from `master`

Example workflow:

```bash
git checkout local
# develop features

git checkout master
git merge local
git push origin master
```

---

## Environment Variables

Create a `.env` file in the root directory.

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
RESEND_API_KEY=your_resend_api_key
BASE_URL=https://your-render-service.onrender.com
FRONTEND_URL=https://your-frontend.vercel.app
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Aymanahmed-23/rhinoMail.git
cd rhinoMail
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

---

## API Endpoints

### Auth

```
POST /api/v1/auth/sign-in
POST /api/v1/auth/sign-up
```

### Subscription

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

## Deployment

Backend is deployed on **Render**.

Deployment branch: `master`

Example base URL:

```
https://rhinomail.onrender.com
```

---

## License

MIT License
