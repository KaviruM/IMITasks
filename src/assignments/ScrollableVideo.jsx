import { useEffect, useRef, useState } from "react";
import iPhone16Reveal from "../assets/iPhone16Reveal.mp4";
import "./ScrollableVideo.css";

const ScrollableVideo = () => {
  const videoRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);


  useEffect(() => {
    document.body.style.height = "1000vh";
    return () => document.body.style.height = "auto";
  }, []);



  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleScroll = () => {
      const progress = Math.max(0, Math.min(1, 
        window.scrollY / (document.body.scrollHeight - window.innerHeight)
      ));
      
      if (video.duration) video.currentTime = progress * video.duration;
      setScrollProgress(progress);
    };

    const setup = () => {
      video.pause();
      video.currentTime = 0;
      window.addEventListener("scroll", handleScroll);
    };

    video.readyState >= 2 ? setup() : video.addEventListener("canplay", setup, { once: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  const section = Math.floor(scrollProgress * 6);
  const offset = (scrollProgress * 6) - section;
  
  const TextSection = ({ index, title, subtitle }) => {
    if (index !== section && index !== section + 1) return null;
    
    const translateY = index === section 
      ? -offset * 500 
      : (1 - offset) * 1000;
    
    return (
      <div className="text-item" style={{ transform: `translateY(${translateY}px)` }}>
        <h1 className="text-heading">{title}</h1>
        <p className="text-subtitle">{subtitle}</p>
      </div>
    );
  };



  return (
    <>
      <div className="video-container">
        <video ref={videoRef} className="video-element" muted playsInline preload="auto" src={iPhone16Reveal} />
      </div>

      <div className="text-overlay">
        <TextSection index={0} title="iPhone 16" subtitle="Hello, Apple Intelligence." />
        <TextSection index={1} title="Camera Control" subtitle="Get a grip on your camera." />
        <TextSection index={2} title="A18 Chip" subtitle="Crazy fast. Crazy efficient." />
        <TextSection index={3} title="Action Button" subtitle="Do more with less." />
        <TextSection index={4} title="All Day Battery" subtitle="Power that keeps up." />
        <TextSection index={5} title="iOS 18" subtitle="The best iOS yet." />
      </div>
    </>
  );
};

export default ScrollableVideo;