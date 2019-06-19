import axios from 'axios';
import {
  SET_TOP_LIKED_IDEAS,
} from 'reducers/types'
import store from 'store'

export const addHashTagsToDB = tagNames => dispatch => {
    var tagObject = { tagNames: tagNames}
    axios.post(`/api/tagNames/create`,tagObject)
    .then(res =>
      {
        console.log('tag added to db')
      }
    );
  }