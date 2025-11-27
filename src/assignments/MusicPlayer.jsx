import { useState, useRef, useEffect } from 'react';
import './MusicPlayer.css';

export default function MusicPlayer() {
  const [currentTime, setCurrentTime] = useState(0);
  const [subtitle, setSubtitle] = useState('');
  const [subtitles, setSubtitles] = useState([]);


  // Load SRT file and parse subtitles
  useEffect(() => {
    fetch('./Ordinary.srt')
      .then(res => res.text())
      .then(text => {
        const parsed = parseSRT(text);
        setSubtitles(parsed);
      });
  }, []);


  
  // Parse SRT format
  const parseSRT = (srt) => {

    const blocks = srt.trim().split(/\n\s*\n/);

    return blocks.map(block => {

      //split block into lines
      const lines = block.trim().split('\n');
      if (lines.length < 3) return null;

      // timeline detection
      const timeLine = lines.find(line => line.includes('-->'));
      if (!timeLine) return null;

      // extract start and end times
      const [start, end] = timeLine.split('-->').map(t => t.trim());
      const timeIndex = lines.indexOf(timeLine);
      const text = lines.slice(timeIndex + 1).join('\n');
      return {
        start: timeToSeconds(start),
        end: timeToSeconds(end),
        text
      };
    }).filter(Boolean);
  };


// Convert time to seconds
  const timeToSeconds = (time) => {
    const [h, m, s] = time.replace(',', '.').split(':');
    return parseInt(h) * 3600 + parseInt(m) * 60 + parseFloat(s);
  };


// Update subtitle based on current time
  useEffect(() => {
    const current = subtitles.find(s => currentTime >= s.start && currentTime < s.end);
    setSubtitle(current ? current.text : '');
  }, [currentTime, subtitles]);



  return (
    <div className="music-player-container">
      <h1 className="music-player-title">Music Player</h1>
      
      <div className="music-player-content">
        <audio
          src="./Ordinary.mp3"
          onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
          controls
          className="music-player-audio"
        />
        
        <div className="music-player-subtitle">
          {subtitle}
        </div>
      </div>
    </div>
  );
}