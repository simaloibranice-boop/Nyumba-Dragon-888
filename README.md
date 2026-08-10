# Nyũmba Dragon 888

### Digital Platform for Connecting Clients with Trusted Skilled Service Providers

Nyũmba Dragon 888 is a full-stack web platform designed to connect clients with skilled technicians and service providers through a secure digital marketplace.

The platform supports service discovery, service requests, role-based accounts, technician job management, payments, technician wallets, and M-PESA integration.

---

## 🚀 Live Application

**Frontend:**  
https://nyumbadragon888.netlify.app/

**Backend API:**  
https://nyumba-dragon-api.onrender.com

**API Health Check:**  
https://nyumba-dragon-api.onrender.com/api/health

---

## 📌 Project Overview

Nyũmba Dragon 888 was built to solve a practical problem: making it easier for clients to find and engage reliable skilled service providers while giving technicians a digital platform to manage their work and earnings.

The system provides separate experiences for:

- Clients
- Technicians
- Administrators

The application follows a REST API architecture, with a React frontend communicating with a Flask backend.

---

## ✨ Key Features

### 👤 Authentication & User Management

- Client and technician registration
- Secure login
- Password hashing
- JWT-based authentication
- Role-based access control
- User profile management
- Password change functionality
- Kenyan phone number normalization

### 🔧 Service Marketplace

- Browse available services
- View service categories
- Submit service requests
- Track submitted requests
- Technician job management
- Accept jobs
- Complete jobs
- Technician availability/status management

### 💳 Payments

- Client payment workflow
- Payment records
- Payment confirmation
- M-PESA integration architecture
- M-PESA callback handling

### 💰 Technician Wallet

- Technician wallet
- Wallet transaction history
- Earnings tracking
- Withdrawal workflow
- M-PESA withdrawal integration

### 📊 Dashboards

- Client dashboard
- Technician dashboard
- Technician analytics
- Technician earnings
- Technician performance
- Administrator dashboard

### 🔐 Security

- JWT authentication
- Password hashing
- Protected API routes
- Role-aware authorization
- CORS configuration
- Environment-based secrets
- Secure API communication

---

## 🛠️ Technology Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- Framer Motion
- Lucide React
- Recharts

### Backend

- Python
- Flask
- Flask-SQLAlchemy
- Flask-Migrate
- Flask-JWT-Extended
- Flask-CORS
- Gunicorn

### Database

- PostgreSQL
- SQLite for local development
- SQLAlchemy ORM
- Alembic migrations

### Payments & Integrations

- M-PESA / Safaricom Daraja API
- REST APIs
- Payment callbacks

### Development & Deployment

- Git
- GitHub
- Netlify
- Render
- PostgreSQL on Render

---

## 🏗️ Architecture

```text
                         ┌─────────────────────────┐
                         │        Client           │
                         │   Web Browser / UI      │
                         └────────────┬────────────┘
                                      │
                                      │ HTTPS / REST API
                                      ▼
                         ┌─────────────────────────┐
                         │      React Frontend     │
                         │       Vite + React      │
                         │      Tailwind CSS       │
                         └────────────┬────────────┘
                                      │
                                      │ Axios
                                      ▼
                         ┌─────────────────────────┐
                         │       Flask API         │
                         │       REST Backend      │
                         │                         │
                         │ JWT Authentication      │
                         │ Role Authorization      │
                         │ Service Management      │
                         │ Payments                │
                         │ Wallets                 │
                         └────────────┬────────────┘
                                      │
                         ┌────────────┴────────────┐
                         │                         │
                         ▼                         ▼
                ┌─────────────────┐       ┌─────────────────┐
                │   PostgreSQL    │       │  M-PESA /       │
                │    Database     │       │ Safaricom API   │
                └─────────────────┘       └─────────────────┘
📁 Project Structure
Nyumba-Dragon-888/
│
├── backend/
│   ├── app/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── extensions.py
│   │   └── __init__.py
│   │
│   ├── migrations/
│   ├── requirements.txt
│   └── wsgi.py
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── docs/
├── src/
├── README.md
└── .gitignore
🔑 API Overview

The backend exposes REST endpoints grouped by functionality.

Authentication
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/profile
PUT  /api/auth/profile
PUT  /api/auth/change-password
Client
GET  /api/client/services
POST /api/client/requests
GET  /api/client/requests
GET  /api/client/requests/<request_id>
Technician
GET  /api/technician/jobs
GET  /api/technician/profile
PUT  /api/technician/status
PUT  /api/technician/jobs/<id>/accept
PUT  /api/technician/jobs/<id>/complete
GET  /api/technician/earnings
GET  /api/technician/performance
Payments
POST /api/client/payments
GET  /api/client/payments
GET  /api/client/payments/<payment_id>
POST /api/client/payments/mpesa/callback
PUT  /api/client/payments/<payment_id>/confirm
Technician Wallet
GET  /api/technician/wallet
GET  /api/technician/wallet/transactions
POST /api/technician/wallet/withdraw
Health Check
GET /api/health

Example response:

{
  "status": "ok",
  "service": "Nyũmba Dragon 888 API"
}
🔐 Authentication Flow

The application uses JWT authentication.

User
  │
  ▼
Login / Register
  │
  ▼
Flask Authentication API
  │
  ▼
JWT Access Token
  │
  ▼
Frontend local storage
  │
  ▼
Axios Authorization Interceptor
  │
  ▼
Protected API Endpoint

Protected requests use:

Authorization: Bearer <JWT_TOKEN>
💳 M-PESA Integration

Nyũmba Dragon 888 includes an M-PESA payment architecture designed around Safaricom's Daraja API.

The payment flow is designed to support:

Client initiates payment
Backend creates payment record
M-PESA STK Push is initiated
Customer completes payment on their phone
Safaricom sends a callback
Backend processes the callback
Payment status is updated
Transaction can be reflected in the platform wallet

M-PESA functionality is currently being integrated and tested using the Safaricom Daraja sandbox environment.

☁️ Deployment
Frontend

The React frontend is deployed on Netlify.

https://nyumbadragon888.netlify.app/
Backend

The Flask API is deployed on Render using Gunicorn.

https://nyumba-dragon-api.onrender.com
Database

The production backend is configured to use PostgreSQL.

Local development can use SQLite.

⚙️ Local Development
1. Clone the repository
git clone git@github.com:simaloibranice-boop/Nyumba-Dragon-888.git

cd Nyumba-Dragon-888
2. Backend setup
cd backend

python3 -m venv venv

source venv/bin/activate

pip install -r requirements.txt

Create a .env file:

DATABASE_URL=your_database_url
JWT_SECRET_KEY=your_secret_key
FRONTEND_URL=http://localhost:5173

Run the Flask application:

python wsgi.py

The backend will be available at:

http://127.0.0.1:5000
3. Frontend setup

Open another terminal:

cd frontend

npm install

npm run dev

The frontend will normally be available at:

http://localhost:5173
🧪 Testing

The backend can be tested using Flask's test client and command-line tools such as curl.

Example health check:

curl https://nyumba-dragon-api.onrender.com/api/health

Expected response:

{
  "status": "ok",
  "service": "Nyũmba Dragon 888 API"
}

Frontend production builds can be tested with:

npm run build
🔄 Development Workflow

The project follows a Git-based development workflow.

Feature / Fix
     │
     ▼
Local Development
     │
     ▼
Testing
     │
     ▼
Git Commit
     │
     ▼
GitHub
     │
     ▼
Automatic Deployment
     │
     ├──────────────► Netlify
     │
     └──────────────► Render
🎯 Engineering Practices

The project demonstrates practical experience with:

REST API development
Full-stack application architecture
JWT authentication
Role-based authorization
Database modelling
PostgreSQL
SQLAlchemy ORM
API integration
Payment integration
Git version control
Cloud deployment
Environment variables
CORS configuration
Error handling
API testing
Responsive UI development
Frontend/backend separation
🔮 Future Improvements

Planned improvements include:

Expanded automated unit and integration testing
CI/CD test pipelines
Improved API documentation
Production-grade monitoring
Enhanced payment reconciliation
SMS and email transaction notifications
Improved technician matching
Advanced search and filtering
Service-provider ratings and reviews
Improved database indexing and optimization
Additional mobile application support
👩🏽‍💻 Developer

Branice Nashilu Simaloi

Software Engineering Graduate
Moringa School

GitHub:
https://github.com/simaloibranice-boop

📜 License

This project is currently maintained as a personal software engineering project and portfolio application.

⭐ Project Status

Active Development

Nyũmba Dragon 888 is an evolving full-stack platform. Core authentication, service management, dashboards, REST APIs, wallet functionality, PostgreSQL deployment, and cloud deployment infrastructure are implemented, while selected payment and production integrations continue to be developed and tested.

