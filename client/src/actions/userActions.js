import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING, ADD_USER } from './types';
import { SAVE_IDEAS,NO_ITEMS_FOUND,UPDATE_CURRENT_IDEA } from 'reducers/types'
import { LOGIN_USER, SET_LOGGED_IN_USER } from 'reducers/types'

// require('axios-debug')(axios);

// export const createUserIfNotExists = user => {
//   var userFromDB = getUser(user);
//   if(userFromDB.length == 0){
//     createUser(user);
//   }
// }

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
            type: SET_LOGGED_IN_USER,
            payload: res.data
          })
        });
      // };
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
