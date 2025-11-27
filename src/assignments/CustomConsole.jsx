import { useState, useEffect, useRef } from "react";
import "./CustomConsole.css";

export default function CustomConsole() {
  const [input, setInput] = useState("");
  const [outputs, setOutputs] = useState([]);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const outputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [outputs]);

  const executeCommand = (command) => {
    if (!command.trim()) return;

    setHistory((prev) => [...prev, command]);
    setHistoryIndex(-1);

    const commandOutput = {
      type: "command",
      content: command,
      id: Date.now(),
    };

    try {
      const executeFunction = new Function("return (" + command + ")");
      const result = executeFunction();

      const resultOutput = {
        type: "result",
        content: result,
        dataType: typeof result,
        id: Date.now() + 1,
      };

      setOutputs((prev) => [...prev, commandOutput, resultOutput]);
    } catch (error) {
      const errorOutput = {
        type: "error",
        content: error.message,
        id: Date.now() + 1,
      };

      setOutputs((prev) => [...prev, commandOutput, errorOutput]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      executeCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex =
          historyIndex === -1
            ? history.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      }
    }
  };

  const formatOutput = (content, dataType) => {
    if (dataType === "object" && content !== null) {
      return JSON.stringify(content, null, 2);
    }
    if (dataType === "string") {
      return `"${content}"`;
    }
    if (content === undefined) {
      return "undefined";
    }
    return String(content);
  };

  const getColorClass = (dataType) => {
    const colorMap = {
      string: "output-string",
      number: "output-number",
      boolean: "output-boolean",
      object: "output-object",
      undefined: "output-undefined",
    };
    return colorMap[dataType] || "";
  };

  return (
    <div className="console-container">
      <div className="console-header">
        <div className="console-title">Custom Console</div>
      </div>

      <div ref={outputRef} className="output-area">
        <div className="welcome-message">
          Welcome to Custom Console! Try these commands:
          <br />• 4 + 5
          <br />• 12 &gt; 5
          <br />• "Hello".length
          <br />• [4, 5, 12].includes(6)
          <br />• Array.from("XYZ")
          <br />• Math.random() * 10
          <br />• "Hello".concat(" World")
          <br />• "Hello".length.length
          <br />• "Hello".length.length.length
        </div>

        {outputs.map((output) => (
          <div key={output.id} className="output-line">
            {output.type === "command" && (
              <div className="command-line">
                <span className="prompt">&gt;</span>
                {output.content}
              </div>
            )}
            {output.type === "result" && (
              <div className={`result-line ${getColorClass(output.dataType)}`}>
                {formatOutput(output.content, output.dataType)}
              </div>
            )}
            {output.type === "error" && (
              <div className="error-line">Error: {output.content}</div>
            )}
          </div>
        ))}
      </div>

      <div className="input-area">
        <span className="input-prompt">&gt;</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter JavaScript command..."
          className="input-field"
        />
      </div>
    </div>
  );
}
