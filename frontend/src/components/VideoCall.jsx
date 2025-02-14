import React, { useRef } from "react";
import "../styles/VideoCall.css";

const VideoCall = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null); // Use useRef to persist peerConnection across renders

  const peerConfiguration = {
    iceServers: [
      { urls: "stun:stun.l.google.com:19302" },
      { urls: "stun:stun1.l.google.com:19302" },
    ],
  };

  // Create and configure the RTCPeerConnection
  const createPeerConnection = () => {
    const pc = new RTCPeerConnection(peerConfiguration);

    // Handle ICE candidate generation
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        console.log("ICE Candidate:", event.candidate);
      } else {
        console.log("All ICE candidates have been sent.");
      }
    };

    // Handle incoming remote tracks
    pc.ontrack = (event) => {
      console.log("Received remote track.");
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    return pc;
  };

  // Start the call and set up local media
  const startCall = async () => {
    // Get the local video and audio stream
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });

    // Display the local stream in the video element
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = localStream;
    }

    peerConnection.current = createPeerConnection();

    localStream.getTracks().forEach(track=>{
        peerConnection.current.addTrack(track, localStream)
    })

    try{
        console.log("Creating Offer...");
        const offer = peerConnection.current.createOffer();
        console.log(offer);
        peerConnection.current.setLocalDescription(offer);
    }catch(err){
        console.log("Error creating an offer", err);
    }

  };

  return (
    <div className="video-call">
      <h2>Video Call</h2>
      <div className="video-grid">
        <div className="video-box">
          <h4>Your Video</h4>
          <video ref={localVideoRef} autoPlay muted className="video-feed" />
        </div>
        <div className="video-box">
          <h4>Remote Video</h4>
          <video ref={remoteVideoRef} autoPlay className="video-feed" />
        </div>
      </div>
      <button onClick={startCall}>Start Call</button>
    </div>
  );
};

export default VideoCall;
