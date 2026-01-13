# Hotel Tree - Hotel Booking System

A full-stack Hotel Booking Application built using the **MERN** stack (MongoDB, Express, React, Node.js). This platform allows users to browse hotels, view room details, book rooms, and allows hotel owners to list properties and manage bookings via a dedicated dashboard.

---

## 🚀 Features

### For Users (Guests)
-   **Search & Discover**: Find hotels by city or name using a simple search bar.
-   **Filtering**: Filter rooms by **Price Range**, **Room Type**, and **Amenities** on the Hotels page.
-   **Room Details**: View detailed information, multiple images, amenities, and pricing for each room.
-   **Booking System**: Book rooms for specific dates with real-time availability checks.
-   **Email Confirmations**: Receive automated booking confirmation emails (via Nodemailer).
-   **My Bookings**: View a history of all booked rooms and their status.

### For Hotel Owners
-   **Property Management**: List new hotels and add rooms with details and images.
-   **Owner Dashboard**: View real-time statistics including **Total Bookings**, **Total Revenue**, and **Total Rooms**.
-   **Recent Bookings**: Track latest bookings with guest details and status.

---

## 🛠️ Technology Stack

### Frontend (Client)
-   **React.js** (v19) with **Vite** for fast development and build.
-   **Tailwind CSS** for modern, responsive styling.
-   **React Router DOM** for client-side routing.
-   **Context API** for global state management.
-   **Clerk** (`@clerk/clerk-react`) for secure authentication.
-   **Axios** for API requests.

### Backend (Server)
-   **Node.js** & **Express.js** for the RESTful API.
-   **MongoDB** & **Mongoose** for database management.
-   **Clerk** (`@clerk/express`, `svix`) for backend authentication and webhook handling.
-   **Cloudinary** for image storage and management.
-   **Nodemailer** for sending booking confirmation emails.
-   **Multer** for handling file uploads.

---

## ⚙️ Prerequisites

Ensure you have the following installed on your machine:
-   **Node.js** (v16 or higher)
-   **npm** (Node Package Manager)
-   **MongoDB** (running locally or a Cloud Atlas connection string)

---

## 📦 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Priyank-Gaur/Hotel-Tree.git
cd hotel_booking
```

### 2. Backend Setup
Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory with the following variables:
```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
SMTP_USER=your_email_address
SMTP_PASS=your_email_password_or_app_password
SENDER_EMAIL=your_sender_email_address
```

Start the backend server:
```bash
npm run server
```
The server will run on `http://localhost:4000`.

### 3. Frontend Setup
Open a new terminal, navigate to the client directory, and install dependencies:
```bash
cd client
npm install
```

Create a `.env` file in the `client` directory (if needed for Vite/Clerk):
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

Start the frontend development server:
```bash
npm run dev
```
The application will run on `http://localhost:5173`.

---

## 🏃‍♂️ Usage

1.  **Register/Login**: Use the Clerk authentication to sign up or log in.
2.  **Browse Hotels**: Use the Home page "Destination" search or go to the "Hotels" page.
3.  **Book a Room**: Select a room, choose dates, and click "Book Now". Check your email for confirmation.
4.  **Become an Owner**: Navigate to "List your hotel" (if enabled) or use the owner route to access the dashboard.

---

## 🛡️ Project Structure
```
hotel_booking/
├── client/                 # Frontend (React + Vite)
│   ├── src/
│   │   ├── assets/         # Images and icons
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # App context (State management)
│   │   ├── pages/          # Page components (Home, Hotels, RoomDetails, etc.)
│   │   └── ...
│   └── ...
├── server/                 # Backend (Node + Express)
│   ├── configs/            # Configuration files (DB, Cloudinary, Nodemailer)
│   ├── controllers/        # Route logic
│   ├── models/             # Mongoose schemas (User, Hotel, Room, Booking)
│   ├── routes/             # API routes
│   └── ...
└── README.md
```

---

## 🔮 Future Goals & Roadmap

We are constantly working to improve Hotel Tree. Here are some features we plan to implement:

-   **Payment Gateway Integration**: Secure online payments using Stripe or Razorpay.
-   **Review & Rating System**: Allow guests to leave text reviews and star ratings for hotels.
-   **Availability Calendar**: Visual calendar to view room availability across dates.
-   **Admin Panel**: Comprehensive admin dashboard for platform-wide management.
-   **Social Login**: Enhanced authentication options with Google, Facebook, etc.
-   **Wishlist**: Ability for users to save hotels for future bookings.

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
