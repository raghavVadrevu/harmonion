import React from "react";
import "../styles/MusicPlayer.css";

const MusicPlayer = () => {
  return (
    <div className="music-player">
      <h2>Now Playing</h2>
      <div className="music-info">
        <img
          src="https://via.placeholder.com/150"
          alt="Album Art"
          className="album-art"
        />
        <div className="track-details">
          <p>Song Title</p>
          <p>Artist Name</p>
        </div>
      </div>
      <div className="controls">
        <button>⏮️</button>
        <button>⏯️</button>
        <button>⏭️</button>
      </div>
    </div>
  );
};

export default MusicPlayer;
