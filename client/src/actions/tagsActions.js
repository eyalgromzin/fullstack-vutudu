import axios from 'axios';

export const addHashTagsToDB = tagNames => dispatch => {
    var tagObject = { tagNames: tagNames}
    axios.post(`/api/tagNames/create`,tagObject)
    .then(res =>
      {
        console.log('tag added to db')
      }
    );
  }