import React, { useRef, useEffect } from "react";
import "../styles/VideoCall.css";

const VideoController = () => {
  const videoRef = useRef(null);

  const handlePlay = () => {
    videoRef.current.play();
  };

  const handlePause = () => {
    videoRef.current.pause();
  };

  useEffect(() => {
    // Access user's webcam and play the video
    const getWebcamStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true, // Access video stream
          audio: false, // You can enable this if audio is needed
        });
        videoRef.current.srcObject = stream; // Assign the stream to the video element
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    getWebcamStream();

    // Cleanup: Stop the video stream when the component unmounts
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="video-controller">
      <video ref={videoRef} width="600" controls>
        <source src="path-to-your-video-file.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* <div>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
      </div> */}
    </div>
  );
};

export default VideoController;
