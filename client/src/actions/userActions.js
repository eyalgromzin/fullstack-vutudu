import axios from 'axios';
import { 
  SET_LOGGED_IN_USER, 
  SET_LOGGED_IN_USER_FIRST_NAME, 
  SET_LOGGED_IN_USER_ID, 
  SET_LOGGED_IN_USER_LAST_NAME, 
  UPDATE_PREVIEWED_IDEA,
  CHANGE_LOGGED_IN_STATE,
  SET_USER_LIKED_IDEAS,
  UPDATE_USER_CREATED_IDEA,
} from 'reducers/types'
import { EDITED_IDEA_SET_TITLE, SET_USER_CREATED_IDEAS } from '../reducers/types';
import store from 'store'

//works till the return
export const createUserIfNotExists = user => dispatch => {
  console.log('in createUserIfNotExists beginning:' + user)
  var isUserExists = false;
  console.log('sending get request: api/user/' + `${user.id}`);
  
  axios.get(`api/user/${user.id}`).then(res => {  // => dispatch => 
    console.log('in createUserIfNotExists response:' + res.data)
    // return res.data;
    if(res.data.length == 0){
      // dispatch => {
        console.log('sending post: api/user/' + `${user.id}` + 'create:' + res.data)

        axios.post(`/api/user/create`,user)
        .then(res => {
          console.log('sent post: api/user/create:' + user)
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
          dispatch({ type: CHANGE_LOGGED_IN_STATE, payload: true });

          updateUser(user.id);
          
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
          dispatch({ type: CHANGE_LOGGED_IN_STATE, payload: true });

          updateUser(user.id);
    }
  }).then(res => {

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

//run it on the beginning of the app load
//get user ideas - liked / created
export const copyUserIdeas = (reduxActionName) => dispatch => {
  store.dispatch({
          type: reduxActionName,
        });
}


export const updateUser = (userID) => {
  store.dispatch(getUserFromDB(userID));
}


// //'Liked' / 'Created' 
export const getUserFromDB = userID => dispatch => {
  console.log('sending post:  api/user/getUser/, userID: ' + userID)
  axios.post(`/api/user/getUser`,{userID})
  .then(res =>
    {
      console.log('got response from: api/Items/getUserLikedIdeas');
      dispatch({
        type: SET_USER_LIKED_IDEAS,
        payload: res.data[0].liked
      })
      dispatch({
        type: SET_USER_CREATED_IDEAS,
        payload: res.data[0].created
      })
    }
  );
}

//e.g. 
export const updateIdea = (ideaID, title, content, userID) => dispatch => {
  console.log('sending post: api/items/updateIdea: ideaID: ' + ideaID + ', title: ' + title + ', content: ' + content);
  axios.post(`/api/items/updateIdea`,{ideaID, title, content})
  .then(res =>
    {
      console.log('got reply: /api/items/updateIdea');
      dispatch({
        type: UPDATE_PREVIEWED_IDEA,
        payload: {ideaID, title, content}
      });
    }
  );
  
  console.log('sending post: api/user/updateUserCreatedIdea: userID: ' + userID + ', ideaID: ' + ideaID + ', title: ' + title + ', content: ' + content);
  axios.post(`/api/user/updateUserCreatedIdea`,{userID, ideaID, title, content})
  .then(res =>
    {
      console.log('got reply: /api/user/updateUserCreatedIdea');
      dispatch({
        type: UPDATE_USER_CREATED_IDEA,
        payload: res.data
      });
    }
  );
}

export const addUserToUserLikedIdea = (userIDToUpdate, ideaID, userIDToAdd) => dispatch => {
  console.log('sending post: api/user/addUserToUserLikedIdea: userIDToUpdate: ' + userIDToUpdate + ', ideaID: ' + ideaID + ', userIDToAdd: ' + userIDToAdd);
  axios.post(`/api/user/addUserToUserLikedIdea`,{userIDToUpdate, ideaID, userIDToAdd})
  .then(res =>
    {
      console.log('got reply: /api/user/updateUserCreatedIdea');
      dispatch({
        type: UPDATE_USER_CREATED_IDEA,
        payload: res.data
      });
    }
  );
}



