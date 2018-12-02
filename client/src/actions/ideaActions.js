import axios from 'axios';
import {
  CREATE_IDEA,
  ADD_CREATED_IDEA_TO_USER,
  SAVE_IDEAS,
  EDITED_IDEA_CLEAR,
  NO_ITEMS_FOUND, 
  SET_CURRENT_IDEA
} from 'reducers/types'

export const updateIdeaIndicator = (userID,idea,userPostUrl,addToUserReduxTypeName,ideaPostUrl,addToIdeaReduxTypeName) => dispatch => {
  console.log('in ideaActions -> updateIdeaData(userID,ideaID,userPostUrl,addToUserReduxTypeName,ideaPostUrl,addToIdeaReduxTypeName)')
  console.log(`addToIdeaReduxTypeName: ` + addToIdeaReduxTypeName)
  console.log(`addToUserReduxTypeName: ` + addToUserReduxTypeName)

  //update user - V
  if(userPostUrl != '' && userPostUrl != null){
    console.log('sending post: ' + userPostUrl)
    var postObject = {userID: userID, idea: idea}
    axios.post(userPostUrl, postObject)
    .then(res =>
      {
        console.log(`got response from: ` + userPostUrl)
        dispatch({
          type: addToUserReduxTypeName,
          payload: res.data
        })
      }
    );
  }

  console.log('updating idea: ' + idea._id)
  if(ideaPostUrl != null && ideaPostUrl != ''){
    console.log('sending post: ' + ideaPostUrl);
    var ideaPostObject = {userID: userID, idea: idea}
    axios.post(ideaPostUrl,ideaPostObject)
    .then(res =>
      {
        console.log(`sent post to: ` + ideaPostUrl);
        dispatch({
          type: addToIdeaReduxTypeName,
          payload: idea._id
        })
      }
    );
  }
}

export const searchItems = (place,time,numOfPeople) => dispatch => {
  axios
  .get(`/api/items/search/${place}/${time}/${numOfPeople}`)
  .then(res =>{
    if(res.data.length > 0){
      console.log('got ideas from db');
      dispatch({
        type: SAVE_IDEAS,
        payload: res.data
      });
      dispatch({
        type: SET_CURRENT_IDEA,
        payload: res.data[0]
      })
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
  var ideaCreated = false;
  var ideaAddedToUser = false;

  axios.post('/api/items/createIdea', {idea,userID}).then(res =>
    {
      console.log('added item to mongo: ' + idea.title);

      dispatch({
        type: CREATE_IDEA,
        payload: res.data
      });

      var response = res.data;
      var ideaID = response._id;
      var axiosObj = {ideaID,userID};

      console.log('item added');

      axios.post('/api/user/addIdeaToUserCreatedIdeas', axiosObj).then(res =>
        {
          dispatch({
            type: ADD_CREATED_IDEA_TO_USER,
            payload: ideaID
          });

          dispatch({
            type: EDITED_IDEA_CLEAR,
          })

          console.log('added ideaID to user ..created.. array');
        }
      );
    }
  )
};

