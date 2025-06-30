<div align="center">
  <!-- You can replace this with your own logo -->
  <h1 align="center">🩺 MediConnect 🩺</h1>
  <p align="center">
    A seamless real-time video consultation platform for doctors and patients.
    <br />
    <a href="https://github.com/prateeksha-yadav/Video-Calling-App/issues">Report Bug</a>
    ·
    <a href="https://github.com/prateeksha-yadav/Video-Calling-App/issues">Request Feature</a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/node.js-v18.x-green.svg" alt="Node.js">
    <img src="https://img.shields.io/badge/express.js-v4.x-blue.svg" alt="Express.js">
    <img src="https://img.shields.io/badge/socket.io-v4.x-yellow.svg" alt="Socket.IO">
    <img src="https://img.shields.io/badge/license-MIT-lightgrey.svg" alt="License">
  </p>
</div>

---

## 🌟 About The Project

MediConnect is a secure, real-time video consultation application designed to bridge the communication gap between doctors and patients. It provides a simple and intuitive interface for one-on-one video calls, complete with role selection and a consultation timer.

![MediConnect Screenshot](https://i.imgur.com/your-screenshot.png) 
*(Replace this with a screenshot of your application)*

### ✨ Key Features:
*   **Role Selection:** Join as a "Doctor" or a "Patient".
*   **Secure Rooms:** Private rooms using unique Consultation IDs.
*   **Real-time Video & Audio:** High-quality, low-latency communication via WebRTC.
*   **Consultation Timer:** Built-in timer to track consultation duration.
*   **Simple & Clean UI:** Intuitive interface for a seamless user experience.

---

## 🛠️ Built With

This project is built with modern web technologies to provide a robust and scalable solution.

*   **Frontend:**
    *   HTML5
    *   CSS3
    *   JavaScript (ES6+)
*   **Backend:**
    *   [Node.js](https://nodejs.org/)
    *   [Express.js](https://expressjs.com/)
*   **Real-time Engine:**
    *   [Socket.IO](https://socket.io/)
    *   WebRTC
---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (v14 or later) and npm installed.

### Installation

1.  **Clone the repo:**
    ```sh
    git clone https://github.com/prateeksha-yadav/Video-Calling-App.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd Video-Calling-App/server
    ```
3.  **Install NPM packages:**
    ```sh
    npm install
    ```

### Running the Application

1.  **Start the server:**
    ```sh
    npm start
    ```
    *Or for development with live reloading:*
    ```sh
    npm run dev
    ```
2.  **Open in your browser:**
    Navigate to `http://localhost:3000`

---

## 📖 Usage

1.  Open two browser tabs to simulate both sides of the consultation.
2.  In one tab, select **"I'm a Doctor"**. In the other, select **"I'm a Patient"**.
3.  Enter the same **Consultation ID** in both tabs and click **Join**.
4.  Once both users have joined, the doctor can click **Start Consultation**.
5.  Click **End Call** to terminate the session.

---

## 📂 Project Structure

```
video-call-app/
├── public/
│   ├── index.html       # Main application page
│   ├── style.css        # Styles for the application
│   └── script.js        # Frontend logic and WebRTC handling
└── server/
    ├── server.js        # Express server and Socket.IO logic
    ├── package.json     # Project dependencies and scripts
    └── ...
```

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 📜 License

Distributed under the MIT License. See `LICENSE` file for more information. (You may want to add a LICENSE file).

---

## 🙏 Acknowledgements

*   [Socket.IO](https://socket.io/)
*   [Express.js](https://expressjs.com/)
*   [Font Awesome](https://fontawesome.com/) 
