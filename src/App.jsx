import { useState } from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Assignment_1 from "./assignments/Assignment_1.jsx";
import Assignment_2 from "./assignments/Assignment_2.jsx";
import Assignment_3 from "./assignments/Assignment_3.jsx";
import Assignment_4 from "./assignments/Assignment_4.jsx";
import Assignment_5 from "./assignments/Assignment_5.jsx";
import Assignment_6 from "./assignments/Assignment_6.jsx";
import Assignment_7 from "./assignments/Assignment_7.jsx";
import Assignment_8 from "./assignments/Assignment_8.jsx";
import Assignment_9 from "./assignments/Assignment_9.jsx";
import Assignment_10 from "./assignments/Assignment_10.jsx";
import Assignment_11 from "./assignments/Assignment_11.jsx";
import Assignment_12 from "./assignments/Assignment_12.jsx";
import Assignment_13 from "./assignments/Assignment_13.jsx";
import Assignment_14 from "./assignments/Assignment_14.jsx";
import Assignment_15 from "./assignments/Assignment_15.jsx";
import Assignment_16 from "./assignments/Assignment_16.jsx";
import Assignment_17 from "./assignments/Assignment_17.jsx";
import Assignment_18 from "./assignments/Assignment_18.jsx";
import Assignments_19 from "./assignments/Assignment_19.jsx";
import Assignments_20 from "./assignments/Assignment_20.jsx";
import Assignments_21 from "./assignments/Assignment_21.jsx";
import Assignments_22 from "./assignments/Assignment_22.jsx";
import CursorEffect from "./assignments/CursorEffect.jsx";
import DragDrop from "./assignments/DragDrop.jsx";
import ContextMenu from "./assignments/ContextMenu.jsx";
import ScrollableVideo from "./assignments/ScrollableVideo.jsx";
import PixelationFilter from "./assignments/PixelationFilter.jsx";
import BladeHit from "./assignments/BladeHit.jsx";
import CropIMG from "./assignments/CropIMG.jsx";
import SprintCursor from "./assignments/SprintCursor.jsx";
import WallBall from "./assignments/WallBall.jsx";
import SnakeGame from "./assignments/SnakeGame.jsx";
import FlipMatch from "./assignments/FlipMatch.jsx";
import StepScrollAnimation from "./assignments/StepScrollAnimation.jsx";
import ItemSlider from "./assignments/ItemSlider.jsx"
import WordJumbleGame from "./assignments/WordJumble.jsx";
import CustomConsole from "./assignments/CustomConsole.jsx";
import ScreenKeyboard from "./assignments/ScreenKeyboard.jsx";
import SlideShow from "./assignments/SlideShow.jsx";
import CustomVideoPlayer from "./assignments/CustomVideoPlayer.jsx";
import ZoomIN from "./assignments/ZoomIN.jsx";
import CanvasVideoRec from "./assignments/CanvasVideoRec.jsx";
import MusicPlayer from "./assignments/MusicPlayer.jsx";
import LocationTrack from "./assignments/LocationFetch.jsx";

function HomePage() {
  return (
    <div className="App">
      <h1>IMI Games Assignments - Kaviru</h1>
      <div className="button-container">
        <Link to="/assignment-1">
          <button>Assignment 1</button>
        </Link>
        <Link to="/assignment-2">
          <button>Assignment 2</button>
        </Link>
        <Link to="/assignment-3">
          <button>Assignment 3</button>
        </Link>
        <Link to="/assignment-4">
          <button>Assignment 4</button>
        </Link>
        <Link to="/assignment-5">
          <button>Assignment 5</button>
        </Link>
        <Link to="/assignment-6">
          <button>Assignment 6</button>
        </Link>
        <Link to="/assignment-7">
          <button>Assignment 7</button>
        </Link>
        <Link to="/assignment-8">
          <button>Assignment 8</button>
        </Link>
        <Link to="/assignment-9">
          <button>Assignment 9</button>
        </Link>
        <Link to="/assignment-10">
          <button>Assignment 10</button>
        </Link>
        <Link to="/assignment-11">
          <button>Assignment 11</button>
        </Link>
        <Link to="/assignment-12">
          <button>Assignment 12</button>
        </Link>
        <Link to="/assignment-13">
          <button>Assignment 13</button>
        </Link>
        <Link to="/assignment-14">
          <button>Assignment 14</button>
        </Link>
        <Link to="/assignment-15">
          <button>Assignment 15</button>
        </Link>
        <Link to="/assignment-16">
          <button>Assignment 16</button>
        </Link>
        <Link to="/assignment-17">
          <button>Assignment 17</button>
        </Link>
        <Link to="/assignment-18">
          <button>Assignment 18</button>
        </Link>
        <Link to="/assignment-19">
          <button>Assignment 19</button>
        </Link>
        <Link to="/assignment-20">
          <button>Assignment 20</button>
        </Link>
        <Link to="/assignment-21">
          <button>Assignment 21</button>
        </Link>
        <Link to="/assignment-22">
          <button>Assignment 22</button>
        </Link>
        <Link to="/cursor-effect">
          <button>Cursor Effect</button>
        </Link>
        <Link to="/drag-drop">
          <button>Drag and Drop</button>
        </Link>
        <Link to="/context-menu">
          <button>Context Menu</button>
        </Link>
        <Link to="/scrollable-video">
          <button>Scrollable Video</button>
        </Link>
        <Link to="/pixelation-filter">
          <button>Pixelation Filter</button>
        </Link>
        <Link to="/blade-hit">
          <button>Blade Hit</button>
        </Link>
        <Link to="/crop-img">
          <button>Crop Image</button>
        </Link>
        <Link to="/sprint-cursor">
          <button>Sprint Cursor</button>
        </Link>
        <Link to="/wall-ball">
          <button>Wall Ball</button>
        </Link>
        <Link to="/snake-game">
          <button>Snake Game</button>
        </Link>
        <Link to="/flip-match">
          <button>Flip Match</button>
        </Link>
        <Link to="step-scroll-animation">
          <button>Step Scroll Animation</button>
        </Link>
        <Link to="item-slider">
          <button>Item Slider</button>
        </Link>
        <Link to="/word-jumble">
          <button>Word Jumble</button>
        </Link>
        <Link to="/Custom-Console">
          <button>Custom Console</button>
        </Link>
        <Link to="/screen-keyboard">
          <button>Screen Keyboard</button>
        </Link>
        <Link to="/slide-show">
          <button>Slide Show</button>
        </Link>
        <Link to="/custom-video-player">
          <button>Custom Video Player</button>
        </Link>
        <Link to="/zoom-in">
          <button>Zoom In</button>
        </Link>
        <Link to="/canvas-video-rec">
          <button>Canvas Video Recorder</button>
        </Link>
        <Link to="/music-player">
          <button>Music Player</button>
        </Link>
        <Link to="/location-track">
          <button>Location Track</button>
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/assignment-1" element={<Assignment_1 />} />
        <Route path="/assignment-2" element={<Assignment_2 />} />
        <Route path="/assignment-3" element={<Assignment_3 />} />
        <Route path="/assignment-4" element={<Assignment_4 />} />
        <Route path="/assignment-5" element={<Assignment_5 />} />
        <Route path="/assignment-6" element={<Assignment_6 />} />
        <Route path="/assignment-7" element={<Assignment_7 />} />
        <Route path="/assignment-8" element={<Assignment_8 />} />
        <Route path="/assignment-9" element={<Assignment_9 />} />
        <Route path="/assignment-10" element={<Assignment_10 />} />
        <Route path="/assignment-11" element={<Assignment_11 />} />
        <Route path="/assignment-12" element={<Assignment_12 />} />
        <Route path="/assignment-13" element={<Assignment_13 />} />
        <Route path="/assignment-14" element={<Assignment_14 />} />
        <Route path="/assignment-15" element={<Assignment_15 />} />
        <Route path="/assignment-16" element={<Assignment_16 />} />
        <Route path="/assignment-17" element={<Assignment_17 />} />
        <Route path="/assignment-18" element={<Assignment_18 />} />
        <Route path="/assignment-19" element={<Assignments_19 />} />
        <Route path="/assignment-20" element={<Assignments_20 />} />
        <Route path="/assignment-21" element={<Assignments_21 />} />
        <Route path="/assignment-22" element={<Assignments_22 />} />
        <Route path="/cursor-effect" element={<CursorEffect />} />
        <Route path="/drag-drop" element={<DragDrop />} />
        <Route path="/context-menu" element={<ContextMenu />} />
        <Route path="/scrollable-video" element={<ScrollableVideo />} />
        <Route path="/pixelation-filter" element={<PixelationFilter />} />
        <Route path="/blade-hit" element={<BladeHit />} />
        <Route path="/crop-img" element={<CropIMG />} />
        <Route path="/sprint-cursor" element={<SprintCursor />} />
        <Route path="/wall-ball" element={<WallBall />} />
        <Route path="/snake-game" element={<SnakeGame />} />
        <Route path="/flip-match" element={<FlipMatch />} />
        <Route path="/step-scroll-animation" element={<StepScrollAnimation />} />
        <Route path="/item-Slider" element={<ItemSlider />} />
        <Route path="/word-jumble" element={<WordJumbleGame />} />
        <Route path="/Custom-Console" element={<CustomConsole />} />
        <Route path="/screen-keyboard" element={<ScreenKeyboard />} />
        <Route path="/slide-show" element={<SlideShow />} />
        <Route path="/custom-video-player" element={<CustomVideoPlayer />} />
        <Route path="/zoom-in" element={<ZoomIN />} />
        <Route path="/canvas-video-rec" element={<CanvasVideoRec />} />
        <Route path="/music-player" element={<MusicPlayer />} />
        <Route path="/location-track" element={<LocationTrack />} />
      </Routes>
    </Router>
  );
}

export default App;
