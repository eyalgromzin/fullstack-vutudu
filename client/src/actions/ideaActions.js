import axios from 'axios';
import { ADD_LIKED_IDEA_TO_USER, ADD_USER_TO_IDEA_LIKES } from 'reducers/types'
import { ADD_DISLIKED_IDEA_TO_USER, ADD_USER_TO_IDEA_DISLIKES } from 'reducers/types'

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

export const dislikeIdea = (userID,ideaID) => dispatch => {
  
  console.log('in ideaActions -> dislikeIdea(user,idea)')
  console.log('sending post: /api/user/userDisliked/')
  var postObject = {userID: userID, ideaID: ideaID}
  axios.post('/api/user/userDisliked/', postObject)
  .then(res =>
    {
      console.log(`sent post to: /api/user/userDisliked/`)
      dispatch({
        type: ADD_DISLIKED_IDEA_TO_USER,
        payload: ideaID
      })
    }
  );

  console.log('sending post: api/idea/ideaDisliked/');
  var ideaPostObject = {userID: userID, ideaID: ideaID}
  axios.post('/api/items/ideaDisliked/',ideaPostObject)
  .then(res =>
    {
      console.log(`sent post to: /api/idea/ideaDisliked/`);
      dispatch({
        type: ADD_USER_TO_IDEA_DISLIKES,
        payload: ideaID
      })
    }
  );
}
  