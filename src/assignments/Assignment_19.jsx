import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Assignment_19.css";

const Assignment_19 = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("https://apis.dnjs.lk/objects/quiz.php");
      setQuestions(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to load questions:", error);
      setIsLoading(false);
    }
  };

  const handleAnswer = (answerIndex) => {
    if (showResult) return;

    const currentQuestion = questions[currentIndex];
    setSelectedAnswer(answerIndex);
    setShowResult(true);

    if (answerIndex === currentQuestion.correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setIsComplete(true);
      }
    }, 1500);
  };

  const restart = () => {
    setCurrentIndex(0);
    setScore(0);
    setIsComplete(false);
    setSelectedAnswer(null);
    setShowResult(false);
    loadQuestions();
  };

  if (isLoading) {
    return (
      <div className="container">
        <div className="loading">Loading quiz...</div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="container">
        <div className="complete">
          <h1>🎉 Quiz Complete!</h1>
          <p className="final-score">
            You scored {score} out of {questions.length}
          </p>
          <p>{Math.round((score / questions.length) * 100)}%</p>
          <button className="restart-btn" onClick={restart}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="container">
        <div className="error">No questions available</div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="container">
      <div className="quiz">
        <div className="header">
          <h1>Assignment 19</h1>
          <p>
            Question {currentIndex + 1} of {questions.length} | Score: {score}
          </p>
        </div>

        <div className="progress">
          <div
            className="progress-bar"
            style={{
              width: `${((currentIndex + 1) / questions.length) * 100}%`,
            }}
          ></div>
        </div>

        <div className="question-card">
          <h2 className="question">{currentQuestion.question}</h2>

          <div className="answers">
            {currentQuestion.answers.map((answer, index) => {
              let buttonClass = "answer-btn";

              if (showResult) {
                if (index === currentQuestion.correct) {
                  buttonClass += " correct";
                } else if (index === selectedAnswer) {
                  buttonClass += " incorrect";
                } else {
                  buttonClass += " disabled";
                }
              }

              return (
                <button
                  key={index}
                  className={buttonClass}
                  onClick={() => handleAnswer(index)}
                  disabled={showResult}
                >
                  {answer}
                </button>
              );
            })}
          </div>

          {showResult && (
            <div className="feedback">
              {selectedAnswer === currentQuestion.correct
                ? "✅ Correct!"
                : "❌ Wrong answer"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assignment_19;