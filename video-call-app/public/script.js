const socket = io();
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const joinBtn = document.getElementById('joinBtn');
const callBtn = document.getElementById('callBtn');
const hangupBtn = document.getElementById('hangupBtn');
const roomIdInput = document.getElementById('roomId');
const doctorBtn = document.getElementById('doctorBtn');
const patientBtn = document.getElementById('patientBtn');
const timerDisplay = document.getElementById('timer');
const localVideoContainer = document.getElementById('localVideoContainer');
const remoteVideoContainer = document.getElementById('remoteVideoContainer');

let localStream;
let peerConnection;
let roomId;
let userType = 'doctor';
let consultationTimer;
let seconds = 0;

// Set user type
doctorBtn.addEventListener('click', () => {
    userType = 'doctor';
    doctorBtn.classList.add('active');
    patientBtn.classList.remove('active');
    updateVideoLabels();
});

patientBtn.addEventListener('click', () => {
    userType = 'patient';
    patientBtn.classList.add('active');
    doctorBtn.classList.remove('active');
    updateVideoLabels();
});

function updateVideoLabels() {
    localVideoContainer.setAttribute('data-label', userType === 'doctor' ? 'DOCTOR' : 'PATIENT');
    remoteVideoContainer.setAttribute('data-label', userType === 'doctor' ? 'PATIENT' : 'DOCTOR');
}

// Join room button click handler
joinBtn.addEventListener('click', async () => {
    roomId = roomIdInput.value;
    if (!roomId) return alert('Please enter a consultation ID');
    
    try {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideo.srcObject = localStream;
        
        socket.emit('join-room', roomId, socket.id, userType);
        joinBtn.disabled = true;
        callBtn.disabled = false;
        
        // Update user info
        const userInfo = localVideoContainer.querySelector('.user-info');
        userInfo.textContent = userType === 'doctor' 
            ? 'Dr. Smith (Cardiologist)' 
            : 'Patient (ID: ' + Math.floor(Math.random() * 1000) + ')';
    } catch (err) {
        console.error('Error accessing media devices:', err);
        alert('Could not access camera/microphone');
    }
});

// Start call button click handler
callBtn.addEventListener('click', () => {
    createPeerConnection();
    callBtn.disabled = true;
    hangupBtn.disabled = false;
    startConsultationTimer();
});

// Hang up button click handler
hangupBtn.addEventListener('click', () => {
    if (peerConnection) {
        peerConnection.close();
        peerConnection = null;
    }
    hangupBtn.disabled = true;
    callBtn.disabled = false;
    stopConsultationTimer();
});

// Socket.io event handlers
socket.on('user-connected', (userId, connectedUserType) => {
    console.log('User connected:', userId, 'Type:', connectedUserType);
    
    const userInfo = remoteVideoContainer.querySelector('.user-info');
    userInfo.textContent = connectedUserType === 'doctor' 
        ? 'Dr. Connected (Specialist)' 
        : 'Patient Connected (ID: ' + Math.floor(Math.random() * 1000) + ')';
});

socket.on('user-disconnected', userId => {
    console.log('User disconnected:', userId);
    if (peerConnection) {
        peerConnection.close();
        peerConnection = null;
        hangupBtn.disabled = true;
        callBtn.disabled = false;
    }
    stopConsultationTimer();
    
    const userInfo = remoteVideoContainer.querySelector('.user-info');
    userInfo.textContent = 'Disconnected';
});

socket.on('offer', async (offer, remoteUserType) => {
    if (!peerConnection) createPeerConnection();
    
    await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(answer);
    socket.emit('answer', answer, roomId);
});

socket.on('answer', async answer => {
    await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
});

socket.on('ice-candidate', async candidate => {
    try {
        await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (err) {
        console.error('Error adding ICE candidate:', err);
    }
});

// Create peer connection
function createPeerConnection() {
    peerConnection = new RTCPeerConnection({
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' }
        ]
    });

    // Add local stream to connection
    localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream);
    });

    // Handle ICE candidates
    peerConnection.onicecandidate = ({ candidate }) => {
        if (candidate) {
            socket.emit('ice-candidate', candidate, roomId);
        }
    };

    // Handle remote stream
    peerConnection.ontrack = ({ streams: [remoteStream] }) => {
        remoteVideo.srcObject = remoteStream;
    };

    // Create and send offer
    if (userType === 'doctor') {
        peerConnection.createOffer()
            .then(offer => peerConnection.setLocalDescription(offer))
            .then(() => {
                socket.emit('offer', peerConnection.localDescription, roomId, userType);
            })
            .catch(err => console.error('Error creating offer:', err));
    }
}

// Consultation timer functions
function startConsultationTimer() {
    seconds = 0;
    consultationTimer = setInterval(() => {
        seconds++;
        updateTimerDisplay();
    }, 1000);
}

function stopConsultationTimer() {
    clearInterval(consultationTimer);
    timerDisplay.textContent = '00:00';
}

function updateTimerDisplay() {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const remainingSeconds = (seconds % 60).toString().padStart(2, '0');
    timerDisplay.textContent = `${minutes}:${remainingSeconds}`;
}

// Initialize
updateVideoLabels();