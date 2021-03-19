import React, {useState} from 'react';

import WelcomeScreen from './components/WelcomeScreen';
import GameScreen from './components/GameScreen';
import EndOfGame from './components/EndOfGame';

import BackGround from './img/theatre.jpg';

import './App.css';

function App() {
  const [display, setDisplay] = useState('welcome');
  const [score, setScore] = useState({
    points: null,
    lives: {
      left: 5,
      lost: 0,
    }
  });
  
  return (
    <div className="App" style={{backgroundImage: `url(${BackGround})`}}>
    {display === "welcome" && (
      <WelcomeScreen setDisplay={setDisplay} score={score}/>
    )}
    {display === "game" && (
      <GameScreen setDisplay={setDisplay} score={score} setScore={setScore}/>
    )}
    {display === "end" && (
      <EndOfGame setDisplay={setDisplay} score={score}/>
    )}
    </div>
  );
}

export default App;
