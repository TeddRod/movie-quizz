import React from 'react';

import styles from './EndOfGame.module.scss';

function EndOfGame (props) {
  
  const {setDisplay, score} = props;
  
  return (
    <div className={styles.endgame}>
      <span className={styles.gameover}>The End .</span>  
      <span className={styles.endgame_score}><span role="img" aria-label="">✨</span>Your score is: <span className={styles.endgame_points}>{score.points}</span>...<span role="img" aria-label="">✨</span></span>
      <button className={styles.endgame_button} onClick={() => setDisplay("welcome")}>Back to Home page</button> 
    </div>
  )
}

export default EndOfGame;
