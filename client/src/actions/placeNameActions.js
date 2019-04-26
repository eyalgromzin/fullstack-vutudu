import axios from 'axios';
import {
  SET_TOP_LIKED_IDEAS,
} from 'reducers/types'
import store from 'store'

//works till the return
export const addPlaceToDBIfNotExists = placeName => dispatch => {
    console.log('in addPlaceToDBIfNotExists')

    var placeNameObject = {placeName: placeName}

    axios.post('/api/placeNames/create',placeNameObject)
    .then(res => {
        console.log('tags added to their bucket');
    })
  }

//works till the return
export const getPlacesStartingWith = placeName => dispatch => {
  console.log('in addPlaceToDBIfNotExists')

  var placeNameObject = {placeName: placeName}

  axios.post('/api/placeNames/create',placeNameObject)
  .then(res => {
      console.log('tags added to their bucket');
  })
}
