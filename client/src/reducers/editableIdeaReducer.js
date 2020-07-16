import { 
  EDITABLE_IDEA_SET_MIN_PEOPLE, 
  EDITABLE_IDEA_SET_MAX_PEOPLE,
  EDITABLE_IDEA_SET_MIN_TIME,
  EDITABLE_IDEA_SET_TITLE,
  EDITABLE_IDEA_SET_CONTENT ,
  CLEAR_EDITABLE_IDEA,
  EDITABLE_IDEA_SET_PLACES,
  EDITABLE_IDEA_SET_ID,
  EDITABLE_IDEA_SET_TAGS,
  UPDATE_EDITABLE_IDEA,
  EDITABLE_SET_IS_BUTTON_CLICKED_VALUE,
  EDITABLE_IDEA_SET_SUBJECTS,
  EDITABLE_IDEA_SET_MAX_TIME,
  EDITABLE_IDEA_SET_IMAGE_NAME,
  EDITABLE_IDEA_SET_IMAGE_BASE64,
  EDITABLE_IDEA_SET_IMAGE_LINK,
  SET_USER_EDITED_IDEA,
} from 'reducers/types'

const initialState = {
    id: '',   //always empty
    title: '',
    contentText: '',
    placesText: '',
    subjectsText: '',
    minTime: 10,
    maxTime: 10,
    minNumOfPeople: 10,
    maxNumOfPeople: 10,
    isButtonEnabled: false,   //refers to create / update
    isClickedButton: false,   //refers to create / update
    imageName: "",
    imageBase64: [],
    idea: {},
};

function reducer(state = initialState, action) {
  switch(action.type) {
    case EDITABLE_IDEA_SET_MIN_PEOPLE:
      return {
        ...state,
        minNumOfPeople: action.payload
      };   
    case EDITABLE_IDEA_SET_MAX_PEOPLE:
      return {
        ...state,
        maxNumOfPeople: action.payload
      };
    case SET_USER_EDITED_IDEA:
      return {
        ...state,
        idea: action.payload
      };
    case EDITABLE_IDEA_SET_PLACES:
      return {
        ...state,
        placesText: action.payload,
      };
    case EDITABLE_IDEA_SET_SUBJECTS:
      return {
        ...state,
        subjectsText: action.payload,
      };
    case EDITABLE_IDEA_SET_MIN_TIME:
      return {
        ...state,
        minTime: action.payload,
      };
    case EDITABLE_IDEA_SET_MAX_TIME:
      return {
        ...state,
        maxTime: action.payload,
      };
    case EDITABLE_IDEA_SET_TITLE:
    return {
      ...state,
      title: action.payload,
    };
    case EDITABLE_IDEA_SET_CONTENT:
      return {
        ...state,
        contentText: action.payload,
      };    
    case EDITABLE_IDEA_SET_ID:
    return {
      ...state,
      id: action.payload,
    };
  case UPDATE_EDITABLE_IDEA:
    //get a full idea, and updates the edited idea
    return {
      ...state,
      id: action.payload._id,
      title: action.payload.title,
      content: action.payload.content,
      placesText: action.payload.placesText,
      subjectsText: action.payload.subjectsText,
      time: action.payload.time,
      minNumOfPeople: action.payload.minNumOfPeople,
      maxNumOfPeople: action.payload.maxNumOfPeople,
    };
    case CLEAR_EDITABLE_IDEA:
      return {
        ...state,
        title: "",
        content: ""
      };    
    case EDITABLE_SET_IS_BUTTON_CLICKED_VALUE:
      return {
        ...state,
        isClickedButton: action.payload,
      };
    case EDITABLE_IDEA_SET_IMAGE_NAME:
      return {
        ...state,
        imageName: action.payload,
      };
    case EDITABLE_IDEA_SET_IMAGE_BASE64:
        return {
          ...state,
          imageBase64: action.payload,
        };
    default:
      return state;
  }

  var x = 4;
  x += 1;
}

export default reducer;