import axios from 'axios';
import { ADD_LIKED_IDEA_TO_USER, ADD_USER_TO_IDEA_LIKES } from 'reducers/types'
import { ADD_DISLIKED_IDEA_TO_USER, ADD_USER_TO_IDEA_DISLIKES } from 'reducers/types'

export const updateIdeaIndicator = (userID,ideaID,userPostUrl,addToUserReduxTypeName,ideaPostUrl,addToIdeaReduxTypeName) => dispatch => {
  console.log('in ideaActions -> updateIdeaData(userID,ideaID,userPostUrl,addToUserReduxTypeName,ideaPostUrl,addToIdeaReduxTypeName)')
  if(userPostUrl != '' && userPostUrl != null){
    console.log('sending post: ' + userPostUrl)
    var postObject = {userID: userID, ideaID: ideaID}
    axios.post(userPostUrl, postObject)
    .then(res =>
      {
        console.log(`sent post to: ` + userPostUrl)
        dispatch({
          type: addToUserReduxTypeName,
          payload: ideaID
        })
      }
    );
  }

  if(ideaPostUrl != null && ideaPostUrl != ''){
    console.log('sending post: api/idea/ideaDisliked/');
    var ideaPostObject = {userID: userID, ideaID: ideaID}
    axios.post(ideaPostUrl,ideaPostObject)
    .then(res =>
      {
        console.log(`sent post to: ` + ideaPostUrl);
        dispatch({
          type: addToIdeaReduxTypeName,
          payload: ideaID
        })
      }
    );
  }
}
  