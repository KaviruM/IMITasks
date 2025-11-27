import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Assignment_20.css";

const Assignment_20 = () => {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState(false);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [reviewing, setReviewing] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);

  useEffect(() => {
    loadQuiz();
  }, []);

  const loadQuiz = async () => {
    try {
      const res = await axios.get("https://apis.dnjs.lk/objects/quiz.php");
      setQuestions(res.data);
      setUserAnswers(new Array(res.data.length).fill(-1));
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleClick = (index) => {
    if (showAnswer) return;
    
    setSelected(index);
    setShowAnswer(true);
    
    const newAnswers = [...userAnswers];
    newAnswers[current] = index;
    setUserAnswers(newAnswers);
    
    if (index === questions[current].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (current < questions.length - 1) {
        setCurrent(current + 1);
        setSelected(null);
        setShowAnswer(false);
      } else {
        setDone(true);
      }
    }, 1000);
  };

  const restart = () => {
    setCurrent(0);
    setScore(0);
    setDone(false);
    setSelected(null);
    setShowAnswer(false);
    setReviewing(false);
    setReviewIndex(0);
    loadQuiz();
  };

  const startReview = () => {
    setReviewing(true);
    setReviewIndex(0);
  };

  const nextReview = () => {
    if (reviewIndex < questions.length - 1) {
      setReviewIndex(reviewIndex + 1);
    }
  };

  const lastReview = () => {
    if (reviewIndex > 0) {
      setReviewIndex(reviewIndex - 1);
    }
  };

  const backToScore = () => {
    setReviewing(false);
  };

  if (loading) {
    return <div className="container"><div className="loading">Loading...</div></div>;
  }

  if (done && reviewing) {
    const question = questions[reviewIndex];
    const userAnswer = userAnswers[reviewIndex];

    return (
      <div className="container">
        <div className="quiz">
          <div className="header">
            <h1>Assignment #20 - Review</h1>
            <p>Question {reviewIndex + 1} of {questions.length}</p>
          </div>

          <div className="question-card">
            <div className="review-answers">
              {question.answers.map((answer, i) => {
                let className = "review-option";
                if (i === question.correct) {
                  className += " correct-answer";
                } else if (i === userAnswer && i !== question.correct) {
                  className += " wrong-answer";
                } else {
                  className += " other-answer";
                }

                return (
                  <div key={i} className={className}>
                    {answer}
                  </div>
                );
              })}
            </div>

            <h2>{question.question}</h2>

            <div className="review-navigation">
              <button 
                onClick={lastReview} 
                disabled={reviewIndex === 0}
                className="nav-btn"
              >
                Last
              </button>
              <button 
                onClick={nextReview} 
                disabled={reviewIndex === questions.length - 1}
                className="nav-btn"
              >
                Next
              </button>
            </div>

            <button onClick={backToScore} className="back-btn">
              Back to Score
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="container">
        <div className="complete">
          <h1>🎉 Quiz Complete!</h1>
          <p className="final-score">
            You scored {score} out of {questions.length}
          </p>
          <p>{Math.round((score / questions.length) * 100)}%</p>
          <div className="complete-buttons">
            <button onClick={restart} className="restart-btn">
              Try Again
            </button>
            <button onClick={startReview} className="review-btn">
              Review Answers
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return <div className="container"><div className="error">No questions</div></div>;
  }

  const question = questions[current];

  return (
    <div className="container">
      <div className="quiz">
        <div className="header">
          <h1>Assignment #20</h1>
          <p>Question {current + 1} of {questions.length} | Score: {score}</p>
        </div>

        <div className="progress">
          <div className="progress-bar" style={{width: `${((current + 1) / questions.length) * 100}%`}}></div>
        </div>

        <div className="question-card">
          <h2 className="question">{question.question}</h2>
          
          <div className="answers">
            {question.answers.map((answer, i) => (
              <button
                key={i}
                className={`answer-btn ${showAnswer ? 
                  (i === question.correct ? 'correct' : 
                   i === selected ? 'incorrect' : 'disabled') : ''}`}
                onClick={() => handleClick(i)}
                disabled={showAnswer}
              >
                {answer}
              </button>
            ))}
          </div>

          {showAnswer && (
            <div className="feedback">
              {selected === question.correct ? "✅ Correct!" : "❌ Wrong answer"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assignment_20;