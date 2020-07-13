import axios from 'axios';
import {
  SET_PLACE_SUGGESTIONS,
  SET_TAG_SUGGESTIONS,
} from 'reducers/types'
import store from 'store'

//works till the return
export const addPlaceToDBIfNotExists = placeName => dispatch => {
    console.log('in addPlaceToDBIfNotExists')

    var placeNameObject = {placeName: placeName}

    axios.post('/api/placeNames/create',placeNameObject)
    .then(res => {
        console.log('subjects added to their bucket');
    })
  }

//works till the return
export const getPlacesStartingWith = placeName => dispatch => {
  console.log('in getPlacesStartingWith')

  var placeNameObject = {placeName: placeName}

  axios.post('/api/placeNames/get',placeNameObject)
  .then(res => 
    store.dispatch({type: SET_PLACE_SUGGESTIONS, payload: res.data.map(arr => arr.name)})
    )
}

//works till the return
export const getTagsStartingWith = subjectName => dispatch => {
  console.log('in getTagsStartingWith')

  var subjectNameObject = {subjectName: subjectName}

  axios.post('/api/subjectNames/get',subjectNameObject)
  .then(res => 
    store.dispatch({type: SET_TAG_SUGGESTIONS, payload: res.data.map(arr => arr.name)})
    )
}
