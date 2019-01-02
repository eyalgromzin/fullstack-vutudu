import axios from 'axios';
import {
  ADD_CREATED_IDEA_TO_USER,
  SAVE_IDEAS,
  CLEAR_EDITED_IDEA,
  NO_ITEMS_FOUND, 
  SET_CURRENT_IDEA,
  CHANGE_SEARCHED_STATE,
  REMOVE_CREATED_IDEA_FROM_USER,
  SET_TOP_HARD_IDEAS,
  SET_TOP_LIKED_IDEAS
} from 'reducers/types'
import { emptyUserPreviewedIdea } from 'actions/userActions'
import { USER_COPY_CREATED_IDEAS_TO_CURRENT_IDEAS } from '../reducers/types';
import store from 'store'

export const updateIdeaIndicator = (loggedInUserID,idea,userPostUrl,addToUserReduxTypeName,ideaPostUrl,addToIdeaReduxTypeName) => dispatch => {
  console.log('in ideaActions -> updateIdeaData(userID,ideaID,userPostUrl,addToUserReduxTypeName,ideaPostUrl,addToIdeaReduxTypeName)')
  console.log(`addToIdeaReduxTypeName: ` + addToIdeaReduxTypeName)
  console.log(`addToUserReduxTypeName: ` + addToUserReduxTypeName)

  //update user - V
  console.log('ideaActions: adding idea to user: ' + idea._id)
  if(userPostUrl != null && userPostUrl != ''){
    console.log('sending post: ' + userPostUrl)
    var postObject = {userID: loggedInUserID, idea: idea}
    axios.post(userPostUrl, postObject)
    .then(res =>
      {
        console.log(`user was updated`)
        if(addToUserReduxTypeName != null && addToUserReduxTypeName != '')
        dispatch({
          type: addToUserReduxTypeName,
          payload: res.data
        })
      }
    );
  }

  console.log('ideaActions: adding user to idea: ' + idea._id)
  if(ideaPostUrl != null && ideaPostUrl != ''){
    console.log('sending post: ' + ideaPostUrl);
    var ideaPostObject = {userID: loggedInUserID, idea: idea}
    axios.post(ideaPostUrl,ideaPostObject)
    .then(res =>
      {
        console.log(`idea was updated`);
        dispatch({
          type: addToIdeaReduxTypeName,
          payload: loggedInUserID
        })
      }
    );
  }

  //update the idea in the user to show immidiately results.
  // console.log('updating idea in user created ideas, so the stats will be updated.');
  // store.dispatch({type: updateIdeaInUserReduxName, payload: {loggedInUserID, ideaID: idea._id} })
}

export const addIdeaToUserCreatedIdeas = (userID, idea) => dispatch => {
  //update user - V
  console.log('ideaActions: adding idea to user: ' + idea._id)
  var postObject = {userID: userID, idea: idea}
  axios.post('', postObject)
  .then(res =>
    {
      console.log(`user was updated`)
      dispatch({
        type: ADD_CREATED_IDEA_TO_USER,
        payload: res.data
      })
    }
  );
}

export const searchItems = (place,time,numOfPeople) => dispatch => {
  axios
  .get(`/api/items/search/${place}/${time}/${numOfPeople}`)
  .then(res =>{ 
    if(res.data.length > 0){
      console.log('got ideas from db');
      dispatch({ type: SET_CURRENT_IDEA, payload: res.data[0] })
      dispatch({ type: SAVE_IDEAS, payload: res.data });
      dispatch({ type: CHANGE_SEARCHED_STATE, payload: true });
      
    }else{
      console.log('got 0 items from db');
      dispatch({
        type: NO_ITEMS_FOUND
      })
    }
  }
  );
};



export const updateTags = (tags) => dispatch => {
  tags.forEach(tag => {
    //update the 1 letter 
    var firstLetters = tag.substring(0, 1);
    addTagToLettersBucketIfNotExists(firstLetters, tag);
    //updating 2 letters
    firstLetters = tag.substring(0, 2);
    addTagToLettersBucketIfNotExists(firstLetters, tag);

    //updating 3 letters
    firstLetters = tag.substring(0, 3);
    addTagToLettersBucketIfNotExists(firstLetters, tag);
  });
}

const addTagToLettersBucketIfNotExists = (firstLetters, tag) => {
  axios.post('/api/tags/update_bucket', {firstLetters,tag})
  .then(res => {
    console.log('tags added to their bucket');
  })
};

export const updateTopIdeas = () => dispatch => {
  axios.post('/api/items/getTopHardIdeas')
  .then(res => {
    console.log('tags added to their bucket');

    dispatch({
      type: SET_TOP_HARD_IDEAS,
      payload: res.data
    });
  })

  axios.post('/api/items/getTopLikedIdeas')
  .then(res => {
    console.log('tags added to their bucket');

    dispatch({
      type: SET_TOP_LIKED_IDEAS,
      payload: res.data
    });
  })
};

export const addIdeaToDB = (idea,userID) => dispatch => {
  console.log('adding item to mongo: ' + idea.title);

  axios.post('/api/items/createIdea', {idea,userID}).then(res =>
    {
      console.log('added item to mongo: ' + res.data.title);
      
      var idea = res.data
      var axiosObj = {userID, idea};

      axios.post('/api/user/addIdeaToUserCreatedIdeas', axiosObj).then(res =>
        {
          dispatch({
            type: ADD_CREATED_IDEA_TO_USER,
            payload: idea
          });

          dispatch({
            type: CLEAR_EDITED_IDEA,
          })

          console.log('added ideaID to user created array');
        }
      );
    }
  )
};

export const deleteIdea = (userID, ideaID) => dispatch => {
  console.log('ideaActions: deleting idea: ' + ideaID);
  axios.post('/api/items/deleteIdea', {ideaID}) //deletes idea but throws 404
  .then(res => {
    console.log('idea deleted from db');
    
    console.log('removing idea from user also:');
    console.log('{userID, ideaID}: ' + JSON.stringify({userID, ideaID}) );
    
    axios.post('/api/user/deleteCreatedIdea', {userID, ideaID})
    .then(res => {
      console.log('idea was removed from user');

      dispatch({
        type: REMOVE_CREATED_IDEA_FROM_USER,
        payload: ideaID
      });
      
      //update the drop down list
      dispatch({
        type: USER_COPY_CREATED_IDEAS_TO_CURRENT_IDEAS,
      });

      //empty current idea in user page
      emptyUserPreviewedIdea();
    })
  })

  

  
};


