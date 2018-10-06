import axios from 'axios';
import { ADD_LIKED_IDEA_TO_USER, ADD_USER_TO_IDEA_LIKES } from 'reducers/types'

export const likeIdea = (userID,ideaID) => dispatch => {
    //need to change it to 1 post 
    console.log('in ideaActions -> likeIdea(user,idea)')
    console.log('sending post: api/userID/like/ideaID')
    axios.post(`/api/userLiked/${userID}/${ideaID}`)
    .then(res =>
      {
    axios.post(`/api/user/userLiked/${userID}/${ideaID}`)
        console.log(`sent post: /api/userLiked/${userID}/${ideaID}`)
        dispatch({
          type: ADD_LIKED_IDEA_TO_USER,
          payload: res.data
        })
      }
    );

    console.log('sending post: api/ideaLiked/ideaID/userID');
    axios.post(`/api/idea/ideaLiked/${ideaID}/${userID}`)
    .then(res =>
      {
        console.log(`/api/ideaLiked/${ideaID}/${userID}`);
        console.log(`/api/ideaLiked/${ideaID}/${userID}`);
        dispatch({
          type: ADD_USER_TO_IDEA_LIKES,
          payload: res.data
        })
      }
    );
  }
  