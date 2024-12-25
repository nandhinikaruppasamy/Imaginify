"use client";
import React, { useState } from 'react';
import './GameResultCorrect.css';

interface GameResultCorrect {
  correct: true;
  facts: string[];
}

interface GameResultIncorrect {
  correct: false;
  answer: string;
  additionalDetails: string[];
}

type GameResult = GameResultCorrect | GameResultIncorrect | null;

const GuessTheImageChallenge = () => {
  // List of topics with corresponding images and answers
  const topics = [
    {
      name: 'Artificial Intelligence',
      imageUrl: 'https://media.istockphoto.com/id/1183329518/photo/cosmic-nebula-and-the-shining-stars.jpg?s=612x612&w=0&k=20&c=vUDLnwMgAfur-NimT59lWDWFzVkdlaiyzx4OPXG_hBU=',  // Replace with actual image URL
      answer: 'ai',  // The important keyword for AI
      clueKeywords: ['ai', 'advanced technology', 'automation', 'machine learning'], // Important terms
      facts: [
        'AI is being used in healthcare to diagnose diseases.',
        'It is also used in autonomous driving technologies.',
        'AI is transforming industries from finance to entertainment.'
      ]
    },
    {
      name: 'Space Exploration',
      imageUrl: 'https://example.com/space.jpg', 
      answer: 'rocket', 
      clueKeywords: ['space', 'rocket', 'NASA', 'moon landing'],
      facts: [
        'NASA was established in 1958.',
        'The first human landed on the moon in 1969.',
        'Space exploration helps us learn more about the universe.'
      ]
    },
    // Add more topics and images here
  ];

  // Randomly select a topic
  const randomTopic = topics[Math.floor(Math.random() * topics.length)];

  const [topic, setTopic] = useState(randomTopic);
  const [userGuess, setUserGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [gameResult, setGameResult] = useState<GameResult>(null);

  // Handle the user's guess
  const handleGuess = () => {
    setAttempts(attempts + 1);

    // Check if the guess matches the answer or any clue keyword
    const isCorrect = topic.clueKeywords.some((keyword) =>
      userGuess.toLowerCase().includes(keyword.toLowerCase())
    );

    if (isCorrect) {
      setGameResult({
        correct: true,
        facts: topic.facts,
      });
    } else if (attempts === 2) {
      setGameResult({
        correct: false,
        answer: topic.answer,
        additionalDetails: topic.facts, // Show facts when the user is out of tries
      });
    }
  };

  // Reset the game (e.g., after the game ends)
  const resetGame = () => {
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    setTopic(randomTopic);
    setUserGuess('');
    setAttempts(0);
    setGameResult(null);
  };

  return (
    <div className="game-container">
      <h1>Guess the Image Challenge</h1>
      <div className="game-content">
        <img src={topic.imageUrl} alt={topic.name} className="game-image" />

        {!gameResult && (
          <div className="guess-container">
            <input
              type="text"
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value)}
              placeholder="Guess a word from the topic"
              className="guess-input"
            />
            <div className="actions-container">
              <button className="guess-button" onClick={handleGuess}>
                Guess
              </button>
              <p className="game-attempts">Attempts left: {3 - attempts}</p>
            </div>
          </div>
        )}

        {gameResult && (
          <div>
            {gameResult.correct ? (
              <div className="correct-result">
                <h2>Correct! 🎉</h2>
                <p className="correct-answer">The correct answer was: {topic.answer}</p>
                <p>Here are some interesting facts about it:</p>
                <ul>
                  {gameResult.facts.map((fact, index) => (
                    <li key={index}>{fact}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="incorrect-result">
                <h2>Oops! You are out of tries. 😔</h2>
                <p className="correct-answer">The correct answer was: {gameResult.answer}</p>
                <p className="additional-details">Here are some additional details:</p>
                <ul>
                  {gameResult.additionalDetails.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>
            )}
            <button className="restart-button" onClick={resetGame}>Start New Challenge</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuessTheImageChallenge;
