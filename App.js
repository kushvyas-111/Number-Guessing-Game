import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [secretNumber, setSecretNumber] = useState(null);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [maxAttempts] = useState(10);
  const [gameState, setGameState] = useState('welcome'); // welcome, playing, won, lost
  const [message, setMessage] = useState('');
  const [guessHistory, setGuessHistory] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (gameState === 'welcome') {
      setSecretNumber(Math.floor(Math.random() * 100) + 1);
    }
  }, [gameState]);

  const startGame = () => {
    setGameState('playing');
    setAttempts(0);
    setGuess('');
    setMessage('');
    setGuessHistory([]);
    setShowConfetti(false);
    setSecretNumber(Math.floor(Math.random() * 100) + 1);
  };

  const handleGuess = (e) => {
    e.preventDefault();
    if (!guess.trim()) return;

    const guessNum = parseInt(guess);
    if (isNaN(guessNum) || guessNum < 1 || guessNum > 100) {
      setMessage('Please enter a valid number between 1 and 100!');
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    setGuessHistory([...guessHistory, guessNum]);

    if (guessNum === secretNumber) {
      setGameState('won');
      setMessage(`🎉 Congratulations! You guessed it in ${newAttempts} attempts!`);
      setShowConfetti(true);
    } else if (newAttempts >= maxAttempts) {
      setGameState('lost');
      setMessage(`😔 Game Over! The number was ${secretNumber}`);
    } else {
      const hint = guessNum < secretNumber ? 'Too low! Try a higher number.' : 'Too high! Try a lower number.';
      setMessage(hint);
    }

    setGuess('');
  };

  const getEmoji = (guessNum) => {
    if (guessNum === secretNumber) return '🎯';
    if (guessNum < secretNumber) return '⬆️';
    return '⬇️';
  };

  const renderGame = () => {
    switch (gameState) {
      case 'welcome':
        return (
          <div className="welcome-screen">
            <h1>🎲 Number Guessing Game</h1>
            <p>I'm thinking of a number between 1 and 100.</p>
            <p>Can you guess it in {maxAttempts} attempts?</p>
            <button className="start-btn" onClick={startGame}>
              Start Game
            </button>
          </div>
        );

      case 'playing':
        return (
          <div className="game-screen">
            <div className="game-header">
              <h2>🎯 Guess the Number!</h2>
              <div className="attempts-info">
                <span>Attempts: {attempts}/{maxAttempts}</span>
                <span>Remaining: {maxAttempts - attempts}</span>
              </div>
            </div>

            <form onSubmit={handleGuess} className="guess-form">
              <input
                type="number"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                placeholder="Enter your guess (1-100)"
                min="1"
                max="100"
                className="guess-input"
                autoFocus
              />
              <button type="submit" className="guess-btn">
                Guess!
              </button>
            </form>

            {message && (
              <div className={`message ${message.includes('🎉') ? 'success' : 'info'}`}>
                {message}
              </div>
            )}

            {guessHistory.length > 0 && (
              <div className="guess-history">
                <h3>Your Guesses:</h3>
                <div className="guess-list">
                  {guessHistory.map((g, index) => (
                    <span key={index} className={`guess-item ${g === secretNumber ? 'correct' : ''}`}>
                      {g} {getEmoji(g)}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <button className="new-game-btn" onClick={startGame}>
              New Game
            </button>
          </div>
        );

      case 'won':
        return (
          <div className="result-screen won">
            <h2>🎉 You Won! 🎉</h2>
            <p className="result-message">{message}</p>
            <div className="stats">
              <p>Secret Number: <span className="highlight">{secretNumber}</span></p>
              <p>Total Attempts: <span className="highlight">{attempts}</span></p>
            </div>
            {showConfetti && <div className="confetti">🎊🎈🎉</div>}
            <button className="play-again-btn" onClick={startGame}>
              Play Again
            </button>
          </div>
        );

      case 'lost':
        return (
          <div className="result-screen lost">
            <h2>😔 Game Over</h2>
            <p className="result-message">{message}</p>
            <div className="stats">
              <p>Secret Number: <span className="highlight">{secretNumber}</span></p>
              <p>Attempts Used: <span className="highlight">{attempts}</span></p>
            </div>
            <button className="play-again-btn" onClick={startGame}>
              Try Again
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="App">
      <div className="container">
        {renderGame()}
      </div>
    </div>
  );
}

export default App;
