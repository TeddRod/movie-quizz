import axios from 'axios';

const service = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  withCredentials: false
});

function errorHandler(error) {
  if (error.response) {
    console.log(error.response && error.response);
    throw error;
  };
  throw error;
};

export default {
   service, 
  
  test() {
    return service
    .get('/test')
    .then(res => res.data)
    .catch(errorHandler);
  },
  
  generate_question() {
    return service
    .get('/generate_question')
    .then(res => res.data)
    .catch(errorHandler);
  },
  
  validate(answer) {
    return service
    .post('/verify', answer)
    .then(res => res.data)
    .catch(errorHandler);
  },
  
};