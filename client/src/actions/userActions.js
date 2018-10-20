import axios from 'axios';
import { 
  SAVE_IDEAS,
  NO_ITEMS_FOUND,
  UPDATE_CURRENT_IDEA,
  USER_SET_LIKED_IDEAS_DATA,
  LOGIN_USER,
  SET_LOGGED_IN_USER, 
  SET_CURRENT_IDEA,
  SET_LOGGED_IN_USER_FIRST_NAME, 
  SET_LOGGED_IN_USER_ID, 
  SET_LOGGED_IN_USER_LAST_NAME, 
  SET_USER_CURRENT_PREVIEWED_IDEAS,
  EDITED_IDEA_SET_CONTENT,
  UPDATE_PREVIEWED_IDEAS_IDEA,
  RESET_USER_CURRENT_PREVIEWED_IDEAS,
  UPDATE_CREATED_IDEAS_IDEA
} from 'reducers/types'
import { EDITED_IDEA_SET_TITLE, SET_USER_CREATED_IDEAS } from '../reducers/types';

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
        type: USER_SET_LIKED_IDEAS_DATA,
        payload: res.data
      })
    }
  );
}

//e.g. 
export const updateUserIdeas = (userID, ideaType, reduxActionName) => dispatch => {
  console.log('sending post: api/Items/updateUserIdeas: userID: ' + userID + ', ideaType: ' + ideaType);
  axios.post(`/api/items/updateUserIdeas`,{userID,ideaType})
  .then(res =>
    {
      console.log('got: /api/items/updateUserIdeas');
      dispatch({
        type: reduxActionName,
        payload: res.data
      });
      dispatch({
        type: SET_USER_CURRENT_PREVIEWED_IDEAS,
        payload: res.data
      })
    }
  );
}

//e.g. 
export const updateIdea = (ideaID, title, content) => dispatch => {
  console.log('sending post: api/items/updateIdea: ideaID: ' + ideaID + ', title: ' + title + ', content: ' + content);
  axios.post(`/api/items/updateIdea`,{ideaID, title, content})
  .then(res =>
    {
      console.log('got reply: /api/items/updateIdea');
      dispatch({
        type: EDITED_IDEA_SET_TITLE,
        payload: res.data.title
      });
      dispatch({
        type: EDITED_IDEA_SET_CONTENT,
        payload: res.data.title
      });
      dispatch({
        type: UPDATE_PREVIEWED_IDEAS_IDEA,
        payload: res.data
      });
      dispatch({
        type: UPDATE_CREATED_IDEAS_IDEA,
        payload: res.data
      });
    }
  );
}



