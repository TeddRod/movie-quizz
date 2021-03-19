const express = require('express');
const router = express.Router();
const axios = require('axios');

const fetch = require('node-fetch');

const {service, base_url, api_key} = require('../config/config.js') ;

// test the connection...
router.get('/test', async (req, res) => {
  return res.status(200).json({message: 'Hello World!'})
});


// create and send an object with 1 random movie and 1 random actor
router.get('/generate_question', async (req, res) => {
    
    let temp = [];
    
    // fetch 20 movies and 20 tv shows from TmDB
    await axios.get(`${base_url}/tv/popular?api_key=${api_key}`)
    .then(response => {
      
      response.data.results.map(r => {
        return temp.push(r);
        
      });
    })
    .catch (err => {
      console.log(err);
      return res.status(500).json({message: "Erreur au chargement des tv shows !"});
    });
    
    // fetch 20 movies and 20 movies from TmDB
    await axios.get(`${base_url}/movie/popular?api_key=${api_key}`)
    .then(response => {
      
      response.data.results.map(r => {
        return temp.push(r);
        
      });
    })
    .catch (err => {
      console.log(err);
      return res.status(500).json({message: "Erreur au chargement des movies !"});
    });
    
    // router.get will return an object
    let quizz = {
      show: {},
      actor: {}
    };
    
    // keep only 3 shows
    let two_shows = [];
    
    for (let i = 0 ; i < 2; i ++) {
      let one_random_movie = temp[Math.floor(Math.random() * temp.length)];
      
      two_shows.push(one_random_movie);
      
      temp.splice(temp.indexOf(one_random_movie),1);
    };
     
    
    // get one random show from the 3 shows above
    quizz.show = [...two_shows][Math.floor(Math.random() * two_shows.length)];
    
    
    // get all the catsing from the random show
    /* ==> determinate the url depending on the kind of show...*/
    const movieOrTv = (show) => {return show.name ? '/tv/' : '/movie/' };
    
    await axios.get(`${base_url}${movieOrTv(quizz.show)}${quizz.show.id}/credits?api_key=${api_key}`)
    .then(response => {
      
      quizz.show.cast = response.data.cast;
      quizz.show.image = `https://image.tmdb.org/t/p/original${quizz.show.poster_path}`;
      
    })
    .catch (err => {
      console.log(err)
      return res.status(500).json({message: 'Erreur au chargment du casting !'});
    });
    
    
    // get one random actor from the 3 shows above
    let temp_movie = [...two_shows][Math.floor(Math.random() * two_shows.length)];
    quizz.actor = {};
    
    const fetch_actor = async (show, quizz) => {
      await axios.get(`${base_url}${movieOrTv(show)}${show.id}/credits?api_key=${api_key}`)
      .then(response => {
          
        let casting = response.data.cast;
        quizz.actor = casting[Math.floor(Math.random() * casting.length)];
        
        if (quizz.actor === undefined 
          || quizz.actor.profile_path === null 
          || quizz.actor.profile_path === undefined) {
          return fetch_actor(temp_movie, quizz);
        } else {
          quizz.actor.image = `https://image.tmdb.org/t/p/w185${quizz.actor.profile_path}`;
        };
        
      })
      .catch(err => {
        console.log(err)
      })
    };
    
    await fetch_actor(temp_movie, quizz);
    
    
    // return object with one random show and one ramdom actor
    return res.status(200).json(quizz);
});


// verify if the actor is include in th movie's cast
router.post('/verify', async (req, res) => {
  const {show, actor, answer} = req.body;
  
  let score_from_frontend = req.body.score;
  
  let answer_validate = {};
 
  const checkAnswer = (answer, show, actor) => {
    
    if (answer === 'yes' && show.cast.some(a => a.id === actor.id)) {
      return true;
    } else if (answer === 'no' && !show.cast.some(a => a.id === actor.id)) {
      return true;
    } else {
      return false;
    };
  }
  
  if (checkAnswer(answer, show, actor) === true) {
    answer_validate = {
      good : true,
      score : {
        points : score_from_frontend.points + 10,
        lives : { 
          left: score_from_frontend.lives.left,
          lost: score_from_frontend.lives.lost,
          }
        }
    }
  } else if (checkAnswer(answer, show, actor) === false){
    answer_validate = {
      good : false,
      score : {
        points : score_from_frontend.points,
        lives : { 
          left: score_from_frontend.lives.left - 1,
          lost: score_from_frontend.lives.lost + 1,
          }
        }
    }
  };
  
  return res.status(200).json(answer_validate);
  
})

module.exports = router;