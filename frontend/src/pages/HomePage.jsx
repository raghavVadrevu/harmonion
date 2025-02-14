import React from "react";
import VideoCall from "../components/VideoCall";
import MusicPlayer from "../components/MusicPlayer";
import "../styles/HomePage.css"; // Add styles here

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="video-call-section">
        <VideoCall />
      </div>
      <div className="music-player-section">
        <MusicPlayer />
      </div>
    </div>
  );
};

export default HomePage;
