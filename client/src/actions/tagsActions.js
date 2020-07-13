import axios from 'axios';

export const addHashTagsToDB = subjectNames => dispatch => {
    var subjectObject = { subjectNames: subjectNames}
    axios.post(`/api/subjectNames/create`,subjectObject)
    .then(res =>
      {
        console.log('subject added to db')
      }
    );
  }