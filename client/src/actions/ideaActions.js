import axios from 'axios';
import { ADD_LIKED_IDEA_TO_USER, 
  ADD_USER_TO_IDEA_LIKES,
  CREATE_IDEA,
  ADD_USER_TO_IDEA_DISLIKES,
  ADD_CREATED_IDEA_TO_USER
} from 'reducers/types'


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

export const addIdeaToDB = (idea,userID) => dispatch => {
  console.log('adding item to mongo: ' + idea.title);
  var ideaCreated = false;
  var ideaAddedToUser = false;

  axios.post('/api/items/createIdea', {idea,userID}).then(res =>
    {
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

          console.log('added ideaID to user ..created.. array');
        }
      );
    }
  )

  

  
};

