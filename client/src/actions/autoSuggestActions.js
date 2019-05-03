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
        console.log('tags added to their bucket');
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
export const getTagsStartingWith = tagName => dispatch => {
  console.log('in getTagsStartingWith')

  var tagNameObject = {tagName: tagName}

  axios.post('/api/tagNames/get',tagNameObject)
  .then(res => 
    store.dispatch({type: SET_TAG_SUGGESTIONS, payload: res.data.map(arr => arr.name)})
    )
}
