import axios from 'axios';
import {
  SET_TOP_LIKED_IDEAS,
} from 'reducers/types'
import store from 'store'

//works till the return
export const createPlaceNameIfNotExists = placeName => dispatch => {
    console.log('in createPlaceNameIfNotExists')

    var placeNameObject = {name: placeName}

    axios.post('/api/placeNames/create',placeNameObject)
    .then(res => {
        console.log('tags added to their bucket');

        dispatch({
        type: SET_TOP_LIKED_IDEAS,
        payload: res.data
        });
    })
    .catch
  }