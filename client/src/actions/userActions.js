import axios from 'axios';
// import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING, ADD_USER } from 'reducers/types'
import { SAVE_IDEAS,NO_ITEMS_FOUND,UPDATE_CURRENT_IDEA,USER_SET_LIKED_IDEAS } from 'reducers/types'
import { LOGIN_USER, SET_LOGGED_IN_USER, SET_CURRENT_IDEA } from 'reducers/types'
import { SET_LOGGED_IN_USER_FIRST_NAME, SET_LOGGED_IN_USER_ID, SET_LOGGED_IN_USER_LAST_NAME } from '../reducers/types';

//works till the return
export const createUserIfNotExists = user => dispatch => {
  console.log('in createUserIfNotExists beginning:' + user)
  var isUserExists = false;
  console.log('sending get request');
  
  axios.get(`api/user/${user.id}`).then(res => {  // => dispatch => 
    console.log('in createUserIfNotExists response:' + res.data)
    // return res.data;
    if(res.data.length == 0){
      // dispatch => {
        console.log('sending post: api/user/create:' + res.data)

        axios.post(`/api/user/create`,user)
        .then(res => {
          console.log('sent post: api/user/create:' + res.data)
          dispatch({
            type: SET_LOGGED_IN_USER_ID,
            payload: res.data.id
          })
          dispatch({
            type: SET_LOGGED_IN_USER_FIRST_NAME,
            payload: res.data.firstName
          })
          dispatch({
            type: SET_LOGGED_IN_USER_LAST_NAME,
            payload: res.data.lastName
          })
        });
      // };
    }else{
      console.log('user exists, updating store')
          dispatch({
            type: SET_LOGGED_IN_USER_ID,
            payload: res.data[0].id
          })
          dispatch({
            type: SET_LOGGED_IN_USER_FIRST_NAME,
            payload: res.data[0].firstName
          })
          dispatch({
            type: SET_LOGGED_IN_USER_LAST_NAME,
            payload: res.data[0].lastName
          })
    }
  })
  .catch(error => 
    console.log('error: ' + error));
}

export const createUser = user => dispatch => {
  console.log('in userActions->create user')
  
  console.log('sending post: api/user/create:' + user)
  axios.post(`/api/user/create`,user)
  .then(res =>
    {
      console.log('sent post: api/user/create:' + res.data)
      dispatch({
        type: SET_LOGGED_IN_USER,
        payload: res.data
      })
    }
  );
}

export const getLikedIdeas = userID => dispatch => {
  console.log('sending post: api/Items/getUserLikedIdeas:' + userID)
  axios.post(`/api/items/getUserLikedIdeas`,userID)
  .then(res =>
    {
      console.log('got: api/Items/getUserLikedIdeas');
      dispatch({
        type: USER_SET_LIKED_IDEAS,
        payload: res.data
      })
    }
  );
}


