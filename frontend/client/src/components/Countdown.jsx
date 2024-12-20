import React, { useEffect, useState } from 'react';
import '../App.css'; // For styling

const Countdown = ({ targetTime }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [completed, setCompleted] = useState(false);
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [showBlur, setShowBlur] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = targetTime - now;

      if (diff <= 0) {
        clearInterval(timer);
        setCompleted(true);
        setShowBlur(true); // Show the blur overlay when countdown completes
      } else {
        const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
        const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
        const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');
        setTimeLeft(`${hours}:${minutes}:${seconds}`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetTime]);

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    // Handle rating submission logic (e.g., save to backend)
  };

  const handleRestart = () => {
    
    setSubmitted(false);
    setShowBlur(false);
    
  };
  const handleStarClick = (starIndex) => {
    setRating(starIndex); // Set rating based on clicked star index
  };


  return (
    <div className="relative">
      {/* Countdown timer */}
      <div className="bg-white p-6 rounded shadow-md text-center">
        {!completed ? (
          <>
            <h2 className="text-2xl font-bold mb-4">⏳ Time Remaining:</h2>
            <div className="text-4xl font-mono mb-6">{timeLeft}</div>
          </>
        ) : (
          <div>
            <h2 className="text-3xl font-bold text-green-500 mb-4 animate-bounce">
              🎉 Countdown Complete! 🎉
            </h2>
            <p className="text-gray-600">Thanks for cumming!!</p>
          </div>
        )}
      </div>

      {/* Full-Screen Blur and Rating Form */}
      {showBlur && (
        <div className="blur-overlay">
          <div className="modal">
            {!submitted ? (
              <>
                <h2 className="text-2xl font-bold mb-4">Please Rate Us:</h2>
                <div className="star-rating mb-4">
                  {[1, 2, 3, 4, 5].map((starIndex) => (
                    <span
                      key={starIndex}
                      className={`star ${rating >= starIndex ? 'filled' : ''}`}
                      onClick={() => handleStarClick(starIndex)}
                    >
                      ★
                    </span>
                  ))}
                  </div>
                <button
                  onClick={handleSubmit}
                  className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                  Submit Rating
                </button>
              </>
            ) : (
              <div>
                <p className="text-xl font-bold mb-4">Thank you for your rating of {rating} stars!</p>
                <button
                  onClick={handleRestart}
                  className="p-2 bg-green-500 text-white rounded hover:bg-green-700"
                >
                Next          
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Countdown;
