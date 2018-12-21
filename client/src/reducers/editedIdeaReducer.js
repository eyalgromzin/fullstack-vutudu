import { 
  EDITED_IDEA_SET_MIN_PEOPLE, 
  EDITED_IDEA_SET_MAX_PEOPLE,
  EDITED_IDEA_SET_TIME,
  EDITED_IDEA_SET_TITLE,
  EDITED_IDEA_SET_CONTENT ,
  CLEAR_EDITED_IDEA,
  EDITED_IDEA_SET_PLACE,
  EDITED_IDEA_SET_ID,
  EDITED_IDEA_SET_TAGS,
  UPDATE_EDITED_IDEA,
} from 'reducers/types'

const initialState = {
    id: '',   //always empty
    title: '',
    content: '',
    place: '',
    time: 5,
    minNumOfPeople: 2,
    maxNumOfPeople: 4,
};

function reducer(state = initialState, action) {
  switch(action.type) {
    case EDITED_IDEA_SET_MIN_PEOPLE:
      return {
        ...state,
        minNumOfPeople: action.payload
      };
    case EDITED_IDEA_SET_MAX_PEOPLE:
      return {
        ...state,
        maxNumOfPeople: action.payload
      };
    case EDITED_IDEA_SET_PLACE:
      return {
        ...state,
        place: action.payload
      };
    case EDITED_IDEA_SET_TIME:
    return {
      ...state,
      time: action.payload,
    };
    case EDITED_IDEA_SET_TITLE:
    return {
      ...state,
      title: action.payload,
    };
    case EDITED_IDEA_SET_CONTENT:
    return {
      ...state,
      content: action.payload,
    };
    case EDITED_IDEA_SET_TAGS:
    return {
      ...state,
      content: action.payload,
    };
    case EDITED_IDEA_SET_ID:
    return {
      ...state,
      id: action.payload,
    };
  case UPDATE_EDITED_IDEA:
    //get a full idea, and updates the edited idea
    return {
      ...state,
      id: action.payload._id,
      title: action.payload.title,
      content: action.payload.content,
      place: action.payload.place,
      time: action.payload.time,
      minNumOfPeople: action.payload.minNumOfPeople,
      maxNumOfPeople: action.payload.maxNumOfPeople,
    };
    case CLEAR_EDITED_IDEA:
      return {
        ...state,
        title: "",
        content: ""
      };
    default:
      return state;
  }
}

export default reducer;