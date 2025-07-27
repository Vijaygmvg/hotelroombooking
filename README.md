
# 🏨 Hotel Room Booking Website

This is a full-stack hotel room booking web application built using **React.js** for the frontend and **Spring Boot** for the backend. The application supports **JWT-based authentication**, **Google OAuth2 login**, **online payment integration (Razorpay)**, and **email notifications** for booking confirmations and password recovery. It also includes an **admin panel** for managing rooms and bookings.

## 🚀 Features

### 👤 User Features
- Sign up / Login using **JWT** or **Google OAuth2**
- Browse available hotel rooms
- Book rooms with **Razorpay** payment integration
- Receive **email confirmation** after successful booking
- Reset and recover password via email link

### 🔐 Authentication & Security
- **Spring Security** with **JWT token-based** authentication
- Role-based access control for user and admin
- Secure password reset via email tokens

### 🧑‍💼 Admin Panel
- Add, update, and delete room listings
- View all bookings and manage users
- Dashboard with room availability and user analytics

### 💳 Payment Integration
- Integrated with **Razorpay** for secure online payments during room booking

### 📧 Email Services
- Booking confirmation sent via email
- Password reset and account recovery via secure email link

## 🛠️ Tech Stack

### 🔧 Backend
- **Spring Boot**
- **Spring Security + JWT**
- **Hibernate + MySQL**
- **JavaMailSender** for email services
- **Razorpay Java SDK** for payments
- **Google OAuth2** login

### 🎨 Frontend
- **React.js**
- **Axios** for API calls
- **React Router** for navigation
- **Bootstrap / Tailwind CSS** (customizable)

## 📦 Installation & Setup

### Backend (Spring Boot)
1. Clone the project
2. Configure `application.properties`:
   - MySQL DB credentials
   - Mail SMTP details
   - Razorpay API key
   - Google OAuth2 client ID and secret
3. Run the Spring Boot app

### Frontend (React.js)
1. Navigate to the frontend directory
2. Run:
   ```bash
   npm install
   npm start
   ```

## 📸 Screenshots
(Add screenshots of home page, booking page, admin panel, etc.)

n

## 🧑‍💻 Author
- **Vijay GM** – (https://github.com/Vijaygmvg)
