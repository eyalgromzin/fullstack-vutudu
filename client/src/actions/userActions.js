//user actions

import axios from 'axios';
import { 
  SET_LOGGED_IN_USER, 
  SET_LOGGED_IN_USER_FIRST_NAME, 
  SET_LOGGED_IN_USER_ID, 
  SET_LOGGED_IN_USER_LAST_NAME, 
  UPDATE_PREVIEWED_IDEAS,
  CHANGE_LOGGED_IN_STATE,
  SET_USER_LIKED_IDEAS,
  UPDATE_USER_CREATED_IDEA,
  SET_USER_CREATED_IDEAS,
  EMPTY_USER_PREVIEWED_IDEA,
  UPDATE_CURRENT_PREVIEWED_USER_IDEA,
  REMOVE_LIKED_IDEA_FROM_USER, 
  ADD_LIKED_IDEA_TO_USER,
  CHANGE_LOGGED_IN_TYPE,
} from 'reducers/types'
import store from 'store'
import { getTagsFromContent } from 'commonUtils'

export const emptyUserPreviewedIdea = () => {
  store.dispatch({type: EMPTY_USER_PREVIEWED_IDEA})
}

//works till the return
export const loadOrCreateUserIfNotExists = user => dispatch => {
  console.log('in loadOrCreateUserIfNotExists beginning:' + user)
  var isUserExists = false;
  console.log('sending get request: api/user/' + `${user.id}`);
  
  axios.get(`/api/user/${user.id}`).then(res => {  // => dispatch => 
    console.log('in loadOrCreateUserIfNotExists response')
    // return res.data;
    if(res.data.length == 0){
      // dispatch => {
        console.log('sending post: /api/user/create')
        // console.log('userObject: ' + JSON.stringify({firstName: user.firstName, lastName: user.lastName, id: user.id}))
        // axios.post(`/api/user/create`,user)
        // axios.post(`/api/user/create`,{firstName: user.firstName, lastName: user.lastName, id: user.id})
        
        console.log('userObject: ' + JSON.stringify(user))
        axios.post(`/api/user/create`,user)
        .then(res => {
          console.log('sent post: api/user/create: ' + user)
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

export const changeLoggedInWithType = (newType) => {
  store.dispatch({
    type: CHANGE_LOGGED_IN_TYPE,
    payload: newType
  })
}

// //'Liked' / 'Created' 
export const addLikedIdeaToUser = (userID, idea) => dispatch => {
  axios.post(`/api/user/userLiked`,{userID, idea})
  .then(res =>
    {
      console.log('got response from: api/Items/userLiked');
      dispatch({
        type: ADD_LIKED_IDEA_TO_USER,
        payload: idea
      })
    }
  );
}

// //'Liked' / 'Created' 
export const removeUserLikedIdea = (userID, idea) => dispatch => {
  axios.post(`/api/user/removeUserLiked`,{userID, idea})
  .then(res =>
    {
      console.log('got response from: api/Items/getUserLikedIdeas');
      dispatch({
        type: REMOVE_LIKED_IDEA_FROM_USER,
        payload: idea._id
      })
    }
  );
}

//e.g. 
export const updateIdea = (userID, ideaID, title, content, place, time, minNumOfPeople, maxNumOfPeople) => dispatch => {
  console.log('sending post: api/items/updateIdea: ideaID: ' + ideaID + ', title: ' + title + ', content: ' + content);

  if(place == '' || place === undefined){
    console.error('content is empty or undefined!!!!')
  }else{
    if(userID == '' || userID === undefined || ideaID == '' || ideaID === undefined){
      console.error('userID or ideaID are empty or undefined!!!!')
    }
  }

  //in case of missing fields
  if(place === undefined || time === undefined || minNumOfPeople === undefined){
    axios.post(`/api/items/updateIdeaContentAndTitle`,{ideaID, title, content})
    .then(res =>
      {
        console.log('got reply: /api/items/updateIdeaContentAndTitle');
        dispatch({
          type: UPDATE_PREVIEWED_IDEAS,
          payload: {ideaID, title, content}
        });
        dispatch({
          type: UPDATE_CURRENT_PREVIEWED_USER_IDEA,
          payload: {ideaID, title, content, place, time, minNumOfPeople, maxNumOfPeople}
        });
      });
        
    axios.post(`/api/user/updateUserCreatedIdeaBasic`,{ideaID, title, content})
    .then(res => {
      dispatch({
        type: UPDATE_USER_CREATED_IDEA,
        payload: {ideaID, title, content, place, time, minNumOfPeople, maxNumOfPeople}
      });
    });
  }

  //update all fields
  else if(userID !== undefined && ideaID  !== undefined && title !== undefined &&
      content !== undefined && place !== undefined && time !== undefined &&
       minNumOfPeople !== undefined &&  maxNumOfPeople !== undefined){


    axios.post(`/api/items/updateIdeaAllFields`,{ideaID, title, content, place, time, minNumOfPeople, maxNumOfPeople})
      .then(res =>
      {
        console.log('got reply from: /api/items/updateIdeaAllFields');
        dispatch({
          type: UPDATE_PREVIEWED_IDEAS,
          payload: {ideaID, title, content}
        });
        dispatch({
          type: UPDATE_CURRENT_PREVIEWED_USER_IDEA,
          payload: {ideaID, title, content, place, time, minNumOfPeople, maxNumOfPeople}
        });
      });

    axios.post(`/api/user/updateUserCreatedIdeaAllFields`,{userID, ideaID, title, content, place, time, minNumOfPeople, maxNumOfPeople})
      .then(res => {
        console.log('got reply from: /api/items/updateUserCreatedIdeaAllFields');
        dispatch({
          type: UPDATE_USER_CREATED_IDEA,
          payload: {ideaID, title, content, place, time, minNumOfPeople, maxNumOfPeople}
        });
      });
  }

  //upsert subjects to db
  var subjectNames = getTagsFromContent(content)
  axios.post(`/api/subjectNames/create`, {subjectNames} )
    .then(res =>
      {
        console.log('subject added to db')
      }
    );

  //set idea subjects
  axios.post(`/api/items/updateIdeaTags`, {ideaID: ideaID, subjects: subjectNames} )
    .then(res =>
      {
        console.log('idea subject were updated')
      }
    );
  
  //upsert place name to db
  console.log('in updateIdea - adding place to db')
  var placeNameObject = {placeName: place}

  axios.post('/api/placeNames/create',placeNameObject)
  .then(res => {
      console.log('place upserted to db');
  })
  
}

export const addUserToUserLikedIdea = (userIDToUpdate, ideaID, userIDToAdd) => dispatch => {
  console.log('sending post: api/user/addUserToUserLikedIdea: userIDToUpdate: ' + userIDToUpdate + ', ideaID: ' + ideaID + ', userIDToAdd: ' + userIDToAdd);
  axios.post(`/api/user/addUserToUserLikedIdea`,{userIDToUpdate, ideaID, userIDToAdd})
  .then(res =>
    {
      console.log('got reply: /api/user/addUserToUserLikedIdea');
      dispatch({
        type: UPDATE_USER_CREATED_IDEA,
        payload: res.data
      });
    }
  );
}



