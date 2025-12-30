import { useState } from "react";
import "./ModeSwitch.css";

function ModeSwitch() {
  const [theme, setTheme] = useState("light");

  return (
    <div className="page-wrapper">
      <div className="main-screen" data-theme={theme} style={{overflow: 'hidden'}}>
        <div className="top-bar">
          <h2 className="title">
            {theme === "light" ? "Light Mode" : "Dark Mode"}
          </h2>
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="toggle-button"
            aria-label="Toggle theme"
          >
            <span className="toggle-slider" data-theme={theme}></span>
          </button>
        </div>
        
        <div className="search-wrapper">
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search..." 
              className="search-input"
            />
            <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2"/>
              <path d="M12.5 12.5L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>

        <div className="content-area">
          <div className="card">
            <div className="card-top">
              <div className="card-icon purple"></div>
              <div className="card-header"></div>
            </div>
            <div className="card-line"></div>
            <div className="card-line"></div>
            <div className="card-line short"></div>
          </div>

          <div className="card">
            <div className="card-top">
              <div className="card-icon orange"></div>
              <div className="card-header"></div>
            </div>
            <div className="card-line"></div>
            <div className="card-line"></div>
            <div className="card-line short"></div>
          </div>
        </div>

        <div className="chart-container">
          <div className="chart">
            <div className="bar" style={{height: '25%'}}></div>
            <div className="bar" style={{height: '30%'}}></div>
            <div className="bar" style={{height: '45%'}}></div>
            <div className="bar" style={{height: '60%'}}></div>
            <div className="bar" style={{height: '75%'}}></div>
            <div className="bar" style={{height: '90%'}}></div>
            <div className="bar" style={{height: '80%'}}></div>
            <div className="bar" style={{height: '65%'}}></div>
            <div className="bar" style={{height: '50%'}}></div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ModeSwitch;