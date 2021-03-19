import React from 'react';

import styles from './WelcomeScreen.module.scss';

function WelcomeScreen (props) {
  const {setDisplay, score} = props;
  
  return (
    
      <div className={styles.welcome_text}>
              <span className={styles.welcome_title}>Welcome To The Movie Quizz</span> 
              <span className={styles.welcome_speech}>In this game <span role="img" aria-label="">🕹</span> you will have to choose if yes<span role="img" aria-label="">✅</span> or no<span role="img" aria-label="">❌</span> those people did have a role in the movie<span role="img" aria-label="">📽</span>.<br/>
              As we are in a generous mood <span role="img" aria-label="">☺️</span>, you will have 10<span role="img" aria-label="">❤️</span> attempts to prove your film knowledge <span role="img" aria-label="">🧠</span>.<br/>
              If you fail your reputation will remain locked in the limbs for eternity <span role="img" aria-label="">⏳</span>. But if you follow the right path then you will go straight to Valhalla with chrome and shiny teeth <span role="img" aria-label="">✨🦷✨</span>... "Witness Me !!!" <br/></span>
  
              {score.points !== null && (
                      <p id="theScore" ><span role="img" aria-label="">📯</span>...your previous score was : <span id="thisScore" className="txt-stamp"> {score.points}</span></p>
              )}
              
              <span className={styles.welcome_end}>May the force be with you... <span role="img" aria-label="">🚀</span></span>
              
              <button className={styles.welcome_button} onClick={() => setDisplay("game")}>start new game</button>
      </div>
  
  )
}

export default WelcomeScreen;
