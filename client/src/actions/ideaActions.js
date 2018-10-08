import axios from 'axios';
import { ADD_LIKED_IDEA_TO_USER, ADD_USER_TO_IDEA_LIKES } from 'reducers/types'

export const likeIdea = (userID,ideaID) => dispatch => {
    
    console.log('in ideaActions -> likeIdea(user,idea)')
    console.log('sending post: api/userID/like/ideaID')
    var postObject = {userID: userID, ideaID: ideaID}
    axios.post('/api/user/userLiked/', postObject)
    .then(res =>
      {
        console.log(`sent post: /api/userLiked/${userID}/${ideaID}`)
        dispatch({
          type: ADD_LIKED_IDEA_TO_USER,
          payload: ideaID
        })
      }
    );

    console.log('sending post: api/ideaLiked/ideaID/userID');
    var ideaPostObject = {userID: userID, ideaID: ideaID}
    axios.post('/api/items/ideaLiked/',ideaPostObject)
    .then(res =>
      {
        console.log(`/api/ideaLiked/${ideaID}/${userID}`);
        dispatch({
          type: ADD_USER_TO_IDEA_LIKES,
          payload: ideaID
        })
      }
    );
  }
  