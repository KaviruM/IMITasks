import { useState, useEffect } from "react";
import "./ScreenKeyboard.css";

const ScreenBoard = () => {
  const [text, setText] = useState("");
  const [pressedKeys, setPressedKeys] = useState([]);

  const keys = [
    [
      "~",
      "1",
      "@",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
      "(",
      ")",
      "-",
      "+",
      "Backspace",
    ],
    ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "|"],
    [
      "CapsLock",
      "A",
      "S",
      "D",
      "F",
      "G",
      "H",
      "J",
      "K",
      "L",
      ":",
      '"',
      "Enter",
    ],
    ["Shift", "Z", "X", "C", "V", "B", "N", "M", "<", ">", "?", "Shift"],
    ["Ctrl", "Alt", "Space", "Alt", "Ctrl"],
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      let key = e.key;
      if (key === " ") key = "Space";
      if (key === "Control") key = "Ctrl";
      key = key.toUpperCase();

      if (!pressedKeys.includes(key)) {
        setPressedKeys([...pressedKeys, key]);
      }
    };

    const handleKeyUp = (e) => {
      let key = e.key;
      if (key === " ") key = "Space";
      if (key === "Control") key = "Ctrl";
      key = key.toUpperCase();

      setPressedKeys(pressedKeys.filter((k) => k !== key));
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [pressedKeys]);

  const handleKeyClick = (key) => {
    if (key === "Backspace") {
      setText(text.slice(0, -1));
    } else if (key === "Enter") {
      setText(text + "\n");
    } else if (key === "Space") {
      setText(text + " ");
    } else if (key === "Tab") {
      setText(text + "    ");
    } else if (
      key === "Shift" ||
      key === "CapsLock" ||
      key === "Ctrl" ||
      key === "Alt"
    ) {
      return;
    } else {
      setText(text + key);
    }

    setPressedKeys([...pressedKeys, key]);
    setTimeout(() => {
      setPressedKeys(pressedKeys.filter((k) => k !== key));
    }, 150);
  };

  const isPressed = (key) => {
    return pressedKeys.includes(key.toUpperCase());
  };

  return (
    <div className="container">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your text here..."
        className="text-area"
      />

      <div className="keyboard">
        {keys.map((row, index) => (
          <div key={index} className="row">
            {row.map((key) => (
              <button
                key={key}
                onClick={() => handleKeyClick(key)}
                className={`key ${key.toLowerCase()} ${
                  isPressed(key) ? "pressed" : ""
                }`}
              >
                {key}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScreenBoard;
