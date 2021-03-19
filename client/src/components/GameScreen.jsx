import React, {useState, useEffect} from 'react';

import API from '../api/API';

import styles from './GameScreen.module.scss';

function GameScreen (props) {
  
  const {setDisplay, score, setScore} = props;
  
  const [quizz, setQuizz] = useState(null);
  const [validate, setValidate] = useState(null);
  
  const  checkAnswer = (choice, q) => {
    let answer_to_verify = {
      show: q.show,
      actor: q.actor,
      score: score,
      answer: choice
    };
        
    API.validate(answer_to_verify)
    .then(new_score => {
      
      setValidate(new_score.good);
      
      setScore({
        points: new_score.score.points,
        lives: {
          left: new_score.score.lives.left,
          lost: new_score.score.lives.lost
        }
      });
      
      setTimeout(() => {
        if (new_score.score.lives.left === 0) {
          setDisplay("end");
        }
        setValidate(null);
        generateNewQuizz();
      }, 700);
      
    })
  };
  
  const generateNewQuizz = () => {
    API.generate_question()
    .then(quizzFromApi => {
      setQuizz(quizzFromApi);
    })
  }
  
  useEffect(() => {
    
    setScore({
      points: 0,
      lives: {
        left: 5,
        lost: 0
      }
    });
    
    generateNewQuizz();
  },[]);
  
            
  return (
    <>
      {!quizz && (
        <div>
          <span>Loading...</span>
        </div>
      )}
      
      {quizz && (
        <div
        style={ quizz.show.image && { backgroundImage: `url(${quizz.show.image})` }}
        className={styles.quizz_background}
        >
          
            <div className={styles.quizz_box}>
              <div className={styles.quizz_actor} style={quizz.actor.image && {backgroundImage: `url(${quizz.actor.image})`}}></div>
      
              <span className={styles.quizz_arrow}> ➡︎ </span>
      
              <div className={styles.quizz_poster} style={ {backgroundImage: `url(${quizz.show.image})`}} ></div>
      
              {validate !== null && validate === false && (<span className={styles.quizz_wrong}>WRONG</span>)}
              {validate !== null  && validate === true && (<span className={styles.quizz_good}>Good!</span>)}
              
            </div>
          
    
          <div className={styles.quizz_question}>
            <div>
              <span className="">Did {quizz.actor.name} act in "{quizz.show.name ? quizz.show.name : quizz.show.title}" ?</span>
            </div>
      
            <div>
              <button
                className={styles.quizz_button}
                onClick={() => checkAnswer('yes', quizz)}
              >
                <span>YES</span>
              </button>
              <button
                className={styles.quizz_button}
                onClick={() => checkAnswer('no', quizz)}
              >
                <span>NO</span>
              </button>
            </div>
          </div>
    
          <div>
            <div className={styles.quizz_lives}>
              <span>lives :</span>
              {Array.from(Array(score.lives.left), (_, i) => (
                <span className="" key={i}>❤️</span>
              ))}
              {Array.from(Array(score.lives.lost), (_, i) => (
                <span className=""  key={i}>💔</span>
              ))}
            </div>
    
            <div className={styles.quizz_score}>
              <span>score : </span><span>{score.points}</span>
            </div>
          </div>
        
      </div>
      )}
  </>
  )
};

export default GameScreen;
