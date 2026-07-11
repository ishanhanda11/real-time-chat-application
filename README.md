# Real-Time Chat Application

A high-performance, real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js) and Socket.io. Features a custom "Transmission Log" design system using Tailwind CSS, seamless optimistic UI updates, and robust real-time presence tracking.

![App Screenshot](./placeholder.png) <!-- Add your screenshot here and name it placeholder.png or update the path -->

## ✨ Features

- **Real-Time Messaging**: Instant message delivery using Socket.io.
- **Optimistic UI**: Messages appear instantly in the UI before server confirmation for a snappy feel.
- **Live Presence Tracking**: See who is online/offline in real-time in the sidebar.
- **Typing Indicators**: Animated, multi-user typing indicators (`Maverick is typing...`).
- **Read Receipts**: Visual status ticks for sent (`✓`) and read (`✓✓`) messages.
- **Persistent History**: Chat history is stored in MongoDB and loaded on connection.
- **Session Persistence**: Stay logged in securely across page reloads using `localStorage`.
- **Custom Design System**: Bespoke "Transmission Log" styling with deep canvas backgrounds, bright signal accents, and custom micro-animations.

## 🛠️ Tech Stack

**Frontend**
- React 18 (Vite)
- TypeScript
- Tailwind CSS
- Socket.io-client
- Context API (State Management)

**Backend**
- Node.js & Express
- Socket.io
- MongoDB & Mongoose
- CORS & Helmet

## ⚙️ Environment Variables

To run this project, you will need to add the following environment variables to your respective `.env` files.

### Backend (`backend/.env`)
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLIENT_ORIGIN=http://localhost:5173
```

### Frontend (`frontend/.env`)
```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ishanhanda11/real-time-chat-application.git
   cd real-time-chat-application
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Start the Backend Server** (in the `backend` directory)
   ```bash
   npm run dev
   ```

5. **Start the Frontend Client** (in the `frontend` directory)
   ```bash
   npm run dev
   ```

6. Open `http://localhost:5173` in your browser.

## 🏗️ Architecture & Design Decisions

- **Separation of Concerns**: Clean boundary between REST API (for auth and historical data fetching) and Socket.io (for real-time bidirectional events).
- **Socket Hooks**: Centralized `SocketProvider` wrapping the application, making real-time hooks (`useSocket`) accessible anywhere in the component tree.
- **Resilient Error Handling**: Built-in visual error banners for failed API requests or disrupted socket payloads.
- **UI/UX Aesthetics**: Bypassed generic templates to build a custom "Transmission Log" UI using Tailwind, demonstrating strong frontend design capabilities.

## 🤔 Assumptions Made

- **Single Global Room**: Assumed a single global chat room was sufficient to demonstrate real-time broadcasting and presence mechanics. No complex private routing was implemented to keep the scope focused on core real-time latency.
- **Dummy Authentication**: Implemented a frictionless find-or-create login system based strictly on unique usernames. Passwords and JWTs were omitted to focus purely on the chat UX.
- **Read Receipts**: Assumed that if a client receives a message while connected to the global channel, it counts as 'read' instantly.
