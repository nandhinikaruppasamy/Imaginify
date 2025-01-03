"use client";
import React, { useState, useEffect } from "react";
import "./GameResultCorrect.css";

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
      name: "Artificial Intelligence",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd-M_r7bEyuBQzUODeKwobumjZ2bnoB_uelw&s",
      answer: "ai",
      clueKeywords: ["ai", "advanced technology", "automation", "machine learning"],
      facts: [
        "AI is being used in healthcare to diagnose diseases.",
        "It is also used in autonomous driving technologies.",
        "AI is transforming industries from finance to entertainment.",
      ],
      hint: "It's an abbreviation for advanced automation and intelligence.",
    },
    {
      name: "Space Exploration",
      imageUrl:
        "https://media.licdn.com/dms/image/v2/D5612AQGlsxoBQz7egg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1703584655183?e=2147483647&v=beta&t=o3y76T4pNw1IXH6pUX3Gi8TN_9fko3pL9Hrylkpt2to",
      answer: "rocket",
      clueKeywords: ["space", "rocket", "NASA", "moon landing"],
      facts: [
        "NASA was established in 1958.",
        "The first human landed on the moon in 1969.",
        "Space exploration helps us learn more about the universe.",
      ],
      hint: "Think of something that flies beyond Earth's atmosphere.",
    },
    {
      name: "The Internet",
      imageUrl:
        "https://media.geeksforgeeks.org/wp-content/uploads/20230420093202/Internet-image-(2).webp",
      answer: "internet",
      clueKeywords: ["web", "network", "online", "www"],
      facts: [
        "The World Wide Web was invented by Tim Berners-Lee in 1989.",
        "The internet connects billions of devices worldwide.",
        "The internet has revolutionized communication and business.",
      ],
      hint: "It’s the global system of interconnected computer networks.",
    },
    {
      name: "Global Warming",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7E-4qY0oCeYh5otq5BKLqh-LidkXW4r_Mpw&s", // Replace with actual image URL
      answer: "climate change",
      clueKeywords: ["global warming", "climate change", "carbon emissions", "environment"],
      facts: [
        "Global warming is primarily caused by human activities like burning fossil fuels.",
        "It leads to rising temperatures and sea levels.",
        "Climate change poses risks to biodiversity and human health.",
      ],
      hint: "It’s the long-term heating of Earth's climate system.",
    },
    {
      name: "Electric Vehicles",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6oCMpdIzfciT3kznGHZqIkD_OAO9qgrsReA&s", // Replace with actual image URL
      answer: "electric car",
      clueKeywords: ["electric vehicle", "sustainable", "green energy", "electric car"],
      facts: [
        "Electric vehicles reduce greenhouse gas emissions.",
        "They are powered by rechargeable batteries instead of gasoline.",
        "Electric car sales have been growing rapidly in recent years.",
      ],
      hint: "It’s a car powered by electricity rather than fossil fuels.",
    },
    {
      name: "The Ocean",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq8Jt8fSnvTt8Gw1EO3jgtK9qrThaJ8SS66g&s", // Replace with actual image URL
      answer: "ocean",
      clueKeywords: ["water", "sea", "waves", "marine life"],
      facts: [
        "The ocean covers over 70% of Earth's surface.",
        "Oceans regulate global climate and weather patterns.",
        "Marine life in the ocean is incredibly diverse.",
      ],
      hint: "It’s the vast body of saltwater that covers most of the Earth.",
    },
    {
      name: "Blockchain",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREE5vnjhtXBYXqx1lSSI8u1XRq-SC4hPKiJQ&s", // Replace with actual image URL
      answer: "blockchain",
      clueKeywords: ["cryptocurrency", "decentralized", "bitcoin", "blockchain"],
      facts: [
        "Blockchain is a decentralized digital ledger.",
        "It is used for cryptocurrencies like Bitcoin and Ethereum.",
        "Blockchain can improve security, transparency, and efficiency in various industries.",
      ],
      hint: "It’s a digital ledger technology used in cryptocurrency.",
    },
    {
      name: "Vaccines",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaYI_CDZfB8JD_X2eBJNjKhNbGMY8VNmCGQQ&s", // Replace with actual image URL
      answer: "vaccine",
      clueKeywords: ["medicine", "immunity", "disease prevention", "health"],
      facts: [
        "Vaccines help prevent the spread of infectious diseases.",
        "They work by stimulating the immune system to recognize and fight pathogens.",
        "Vaccination has led to the eradication or control of many diseases like smallpox and polio.",
      ],
      hint: "It’s a substance that helps protect against diseases.",
    },
    {
      name: "The Moon",
      imageUrl:
        "https://media.istockphoto.com/id/1469618147/photo/full-moon-with-flower.jpg?s=612x612&w=0&k=20&c=KQiHxLCxdub4ZG-BqlDhwv_BCS51YY47Q4ZU16CcBaQ=", // Replace with actual image URL
      answer: "moon",
      clueKeywords: ["lunar", "moon", "satellite", "space"],
      facts: [
        "The moon is Earth's only natural satellite.",
        "It influences tides and stabilizes Earth's climate.",
        "The first human landing on the moon was in 1969 during the Apollo 11 mission.",
      ],
      hint: "It’s Earth's closest celestial neighbor.",
    },
  ];

  // State variables
  const [topicIndex, setTopicIndex] = useState(0); // Index for the current topic
  const [topic, setTopic] = useState(topics[0]); // Current topic
  const [userGuess, setUserGuess] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [gameResult, setGameResult] = useState<GameResult>(null);
  const [showHint, setShowHint] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // Timer starts at 30 seconds
  const [completedChallenges, setCompletedChallenges] = useState(0); // Progress tracker

  // Timer functionality
  useEffect(() => {
    if (timeLeft > 0 && !gameResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !gameResult) {
      setGameResult({
        correct: false,
        answer: topic.answer,
        additionalDetails: topic.facts,
      });
    }
  }, [timeLeft, gameResult, topic]);

  // Handle the user's guess
  const handleGuess = () => {
    setAttempts(attempts + 1);

    // Normalize guesses and answers for comparison
    const normalizedGuess = userGuess.trim().toLowerCase();
    const normalizedAnswer = topic.answer.toLowerCase();

    const isCorrect =
      normalizedGuess === normalizedAnswer || // Exact match with the answer
      topic.clueKeywords.some(
        (keyword) => normalizedGuess === keyword.toLowerCase() // Match with any clue keyword
      );

    if (isCorrect) {
      setCompletedChallenges(completedChallenges + 1); // Increment progress
      setGameResult({
        correct: true,
        facts: topic.facts,
      });
    } else if (attempts === 2) {
      setGameResult({
        correct: false,
        answer: topic.answer,
        additionalDetails: topic.facts,
      });
    }
  };

  // Reset the game (e.g., after the game ends)
  const resetGame = () => {
    const nextIndex = (topicIndex + 1) % topics.length; // Go to the next topic
    setTopicIndex(nextIndex);
    setTopic(topics[nextIndex]);
    setUserGuess("");
    setAttempts(0);
    setGameResult(null);
    setShowHint(false);
    setTimeLeft(30); // Reset the timer
  };

  return (
    <div className="game-container">
      {/* Progress Tracker */}
      <div className="progress-tracker-container">
        <div className="progress-wrapper">
          {/* Progress Bar Section */}
          <div className="progress-tracker">
            <p>
              Challenges Completed: {completedChallenges}/{topics.length}
            </p>
            <div className="progress-bar">
              <div
                className="progress"
                style={{
                  width: `${(completedChallenges / topics.length) * 100}%`,
                }}
              ></div>
            </div>
          </div>

          {/* Time Left Section */}
          <p className="time-left">Time Left: {timeLeft} seconds</p>
        </div>
      </div>

      {/* Main Game Content */}
      <div className="game-content">
        <img src={topic.imageUrl} alt={topic.name} className="game-image" />

        {!gameResult && (
          <div className="guess-container">
            {/* Input Field and Hint Button */}
            <div className="input-hint-wrapper">
              <input
                type="text"
                value={userGuess}
                onChange={(e) => setUserGuess(e.target.value)}
                placeholder="Guess a word from the image"
                className="guess-input"
              />
              <button
                className="hint-button"
                onClick={() => setShowHint(true)}
                disabled={showHint}
              >
                {showHint ? "Hint Shown" : "Get a Hint"}
              </button>
            </div>

            {/* Display Hint if enabled */}
            {showHint && (
              <div className="hint-container">
                <p className="hint-text">{topic.hint}</p>
              </div>
            )}

            {/* Guess Button and Attempts Left */}
            <div className="actions-container">
              <button className="guess-button" onClick={handleGuess}>
                Guess
              </button>
              <p className="game-attempts">Attempts left: {3 - attempts}</p>
            </div>
          </div>
        )}

        {/* Display Game Result */}
        {gameResult && (
          <div>
            {gameResult.correct ? (
              <div className="correct-result">
                <h2>Correct! 🎉</h2>
                <p className="correct-answer">
                  The correct answer was: {topic.answer}
                </p>
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
                <p className="correct-answer">
                  The correct answer was: {gameResult.answer}
                </p>
                <p className="additional-details">Here are some details:</p>
                <ul>
                  {gameResult.additionalDetails.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </div>
            )}
            <button className="restart-button" onClick={resetGame}>
              Start New Challenge
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuessTheImageChallenge;
