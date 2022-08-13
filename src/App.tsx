import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import words from 'an-array-of-english-words';

// min and max included 
function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const initialLives = 2;

function App() {
  const [guess, setGuess] = useState('');
  const [challenge, setChallenge] = useState('');
  const [lives, setLives] = useState(initialLives);
  const [score, setScore] = useState(0);
  const livesRef = useRef<any | null>(null);
  const timeoutIDRef = useRef<any | null>(null);

  const goNext = () => {
    console.log('goNext')
    const wordIndex = randomNumber(0, words.length - 1);
    const challengeLength = randomNumber(2, 3);
    const nextChallenge = words[wordIndex].substring(0, challengeLength);
    setChallenge(nextChallenge);
    setGuess('');
    clearTimeout(timeoutIDRef.current)
    timeoutIDRef.current = setTimeout(() => {
      if (livesRef.current - 1 > 0) {
        goNext();
      }
      setLives(lives => lives - 1);
    }, 5000);
  };

  useEffect(() => {
    console.log('useEffect');
    goNext();
  }, []);

  useEffect(() => {
    console.log('lives useEffect');
    livesRef.current = lives;
  }, [lives]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (guess.includes(challenge) && words.includes(guess)) {
        clearTimeout(timeoutIDRef.current);
        setGuess('');
        setScore(score => score + 1);
        goNext();
      }
    }
  }

  const playAgain = () => {
    setLives(initialLives);
    setScore(0);
    goNext();
  };

  if (lives === 0) {
    return <div>
      <div>Game Over</div>
      <button onClick={playAgain}>Play Again</button>
    </div>
  }

  return (
    <div>
      <div>lives are {lives}</div>
      <div>score is {score}</div>
      <div>
        challenge is {challenge}
      </div>
      <input type="text" value={guess} onChange={e => setGuess(e.target.value)}
        onKeyPress={handleKeyPress} />
    </div>
  );
}

export default App;
