# MediConnect: Doctor-Patient Video Consultation App

MediConnect is a secure, real-time video consultation application designed to bridge the communication gap between doctors and patients. It provides a simple and intuitive interface for one-on-one video calls.

![MediConnect Screenshot](https://i.imgur.com/your-screenshot.png) 
*(You can replace this with a screenshot of your application)*

## ✨ Features

- **Role Selection:** Users can join as either a "Doctor" or a "Patient".
- **Secure Rooms:** Consultations are conducted in private rooms using unique Consultation IDs.
- **Real-time Video & Audio:** High-quality, low-latency communication powered by WebRTC.
- **Consultation Timer:** A built-in timer to track the duration of the consultation.
- **Simple UI:** Clean and intuitive interface for a seamless user experience.
- **Responsive Design:** Works on modern web browsers.

## 🛠️ Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Real-time Communication:** Socket.IO, WebRTC (PeerJS is not used, direct RTCPeerConnection)
- **STUN Server:** Google's public STUN server for NAT traversal.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have [Node.js](https://nodejs.org/) and npm (which comes with Node.js) installed on your system.

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/prateeksha-yadav/Video-Calling-App.git
    cd Video-Calling-App
    ```

2.  **Navigate to the server directory and install dependencies:**
    ```bash
    cd server
    npm install
    ```

### Running the Application

1.  **Start the server:**
    From inside the `server` directory, run:
    ```bash
    npm start
    ```
    For development with automatic server restarts on file changes, you can use:
    ```bash
    npm run dev
    ```

2.  **Open the application:**
    Open your web browser and navigate to `http://localhost:3000`.

##  kullanım

1.  **Open two browser tabs** to simulate a doctor and a patient.
2.  **Select Role:**
    - In the first tab, select "I'm a Doctor".
    - In the second tab, select "I'm a Patient".
3.  **Create & Join a Consultation:**
    - Enter a unique "Consultation ID" in both tabs (e.g., `consult123`).
    - Click the **Join** button in both tabs. You should see your local video feed.
4.  **Start the Call:**
    - Click the **Start Consultation** button. The doctor should initiate the call.
    - The video streams between the two users will be established.
5.  **End the Call:**
    - Click the **End Call** button to terminate the session. 