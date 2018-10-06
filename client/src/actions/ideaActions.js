import axios from 'axios';
import { ADD_LIKED_IDEA_TO_USER, ADD_USER_TO_IDEA_LIKES } from 'reducers/types'

export const likeIdea = (user,idea) => dispatch => {
    //need to change it to 1 post 

    console.log('in ideaActions -> likeIdea(user,idea)')
    console.log('sending post: api/userID/like/ideaID:' + user)
    axios.post(`/api/userLiked/${user.id}/${idea.id}`)
    .then(res =>
      {
    axios.post(`/api/userLiked/${user.id}/${idea.id}`)
        console.log(`sent post: /api/userLiked/${user.id}/${idea.id}`)
        dispatch({
          type: ADD_LIKED_IDEA_TO_USER,
          payload: res.data
        })
      }
    );

    console.log('sending post: api/idealiked/ideaID/userID:' + user)
    axios.post(`/api/idea/ideaLiked/${idea.id}/${user.id}`)
    .then(res =>
      {
        console.log(`/api/ideaLiked/${idea.id}/${user.id}`)
        dispatch({
          type: ADD_USER_TO_IDEA_LIKES,
          payload: res.data
        })
      }
    );
  }
  