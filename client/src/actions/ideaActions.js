import axios from 'axios';
import {
  ADD_CREATED_IDEA_TO_USER,
  REMOVE_IDEA_FROM_USER_CREATED_IDEAS,
  SAVE_IDEAS,
  CLEAR_EDITED_IDEA,
  NO_ITEMS_FOUND, 
  SET_CURRENT_IDEA,
  CHANGE_SEARCHED_STATE
} from 'reducers/types'

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
          payload: idea._id
        })
      }
    );
  }
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
            payload: res.data
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

export const deleteIdea = (ideaID) => dispatch => {
  console.log('ideaActions: deleting idea: ' + ideaID);
  axios.post('/api/items/deleteIdea', {ideaID})
  .then(res => {
    console.log('idea deleted');
  })

  axios.post('/api/user/deleteCreatedIdea', {userID, ideaID})
  .then(res => {
    console.log('idea was removed from user');

    dispatch({
      type: REMOVE_CREATED_IDEA_FROM_USER,
      payload: ideaID
    });
  })

  
};

// export const deleteIdea = (ideaID) => dispatch => {
//   axios.post('/api/items/delete', {ideaID})
//   .then(res => {
//     console.log('idea deleted');
//   })
// };

// export const deleteIdea = (ideaID) => dispatch => {
//   console.log('deleting item: ' + ideaID);
  
//   //goes to the wrong local ip 
//   axios.post('/api/items/delete',{ideaID}).then(res =>
//     {
//       console.log('idea ' + ideaID + ' deleted');
      
//       dispatch({
//         type: REMOVE_IDEA_FROM_USER_CREATED_IDEAS,
//         payload: ideaID
//       });

      
//     }
//   );
// }
