import React, { useRef, useState } from "react";
import "./CustomVideoPlayer.css";
import videoSrc from "../assets/custom-video-player.mp4";

function CustomVideoPlayer() {
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);

  const updateProgress = () => {
    const video = videoRef.current;
    if (video && video.duration) {
      const progressPercent = (video.currentTime / video.duration) * 100;
      setProgress(progressPercent);
      setCurrentTime(video.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      setDuration(video.duration);
    }
  };

  const handleProgressClick = (e) => {
    const video = videoRef.current;
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const progressBarWidth = rect.width;
    const clickedProgress = (clickX / progressBarWidth) * 100;

    if (video && duration) {
      const newTime = (clickedProgress / 100) * duration;
      video.currentTime = newTime;
      setProgress(clickedProgress);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleStop = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleVolumeUp = () => {
    if (videoRef.current && videoRef.current.volume < 1) {
      videoRef.current.volume = Math.min(videoRef.current.volume + 0.1, 1);
    }
  };

  const handleVolumeDown = () => {
    if (videoRef.current && videoRef.current.volume > 0) {
      videoRef.current.volume = Math.max(videoRef.current.volume - 0.1, 0);
    }
  };

  const handleSpeedUp = () => {
    if (videoRef.current) {
      videoRef.current.playbackRate = Math.min(
        videoRef.current.playbackRate + 0.1,
        3
      );
    }
  };

  const handleSpeedDown = () => {
    if (videoRef.current) {
      videoRef.current.playbackRate = Math.max(
        videoRef.current.playbackRate - 0.1,
        0.1
      );
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current && videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className="main-container">

    <div className="video-player-container">

      <video ref={videoRef} controls width="620" height="350"
        onTimeUpdate={updateProgress}
        onLoadedMetadata={handleLoadedMetadata}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
        
      </video>

      <div className="progress-container">
        
        <div className="progress-bar" onClick={handleProgressClick}>
          
          <div className="progress-fill" style={{ width: `${progress}%` }} />
          
          <div className="progress-handle"
            style={{
              left: `${progress}%`,
              opacity: progress > 0 ? 1 : 0,
            }}
          />

        </div>

        <div className="time-display">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>

      </div>
      </div>

      <p>Custom Video Player</p>
      <div>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={handleStop}>Stop</button>

        <div>
          <button onClick={handleVolumeUp}>Increase Volume</button>
          <button onClick={handleVolumeDown}>Decrease Volume</button>
        </div>
        <div>
          <button onClick={handleSpeedUp}>Increase Speed</button>
          <button onClick={handleSpeedDown}>Decrease Speed</button>
        </div>
        <div>
          <button onClick={handleFullscreen}>Fullscreen</button>
        </div>
      </div>
    </div>
  );
}

export default CustomVideoPlayer;
