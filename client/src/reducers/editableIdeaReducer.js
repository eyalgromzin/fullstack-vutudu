import { 
  EDITABLE_IDEA_SET_MIN_PEOPLE, 
  EDITABLE_IDEA_SET_MAX_PEOPLE,
  EDITABLE_IDEA_SET_TIME,
  EDITABLE_IDEA_SET_TITLE,
  EDITABLE_IDEA_SET_CONTENT ,
  CLEAR_EDITABLE_IDEA,
  EDITABLE_IDEA_SET_PLACE,
  EDITABLE_IDEA_SET_ID,
  EDITABLE_IDEA_SET_TAGS,
  UPDATE_EDITABLE_IDEA,
  EDITABLE_IDEA_SET_IS_PLACE_VALID,
  EDITABLE_IDEA_SET_IS_TITLE_VALID,
  EDITABLE_IDEA_SET_IS_CONTENT_VALID,
  EDITABLE_SET_IS_BUTTON_CLICKED_VALUE,
  CREATE_IDEA_SET_MAX_PEOPLE,
  CREATE_IDEA_SET_MIN_PEOPLE,
} from 'reducers/types'

const initialState = {
    id: '',   //always empty
    title: '',
    content: '',
    place: '',
    time: 5,
    minNumOfPeople: 2,
    maxNumOfPeople: 4,
    isButtonEnabled: false,   //refers to create / update
    isContentValid: false,
    isTitleValid: false,
    isPlaceValid: false,
    isClickedButton: false,   //refers to create / update
};

function validateCreateButton(state){
  return state.content.length > 0 && state.content.length > 0 && state.place.length > 2
}

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
    case EDITABLE_IDEA_SET_PLACE:
      return {
        ...state,
        place: action.payload,
        isCreateButtonEnabled: state.content.length > 0 && state.title.length > 0 && action.payload > 2,
        isPlaceValid: action.payload.length > 2
      };
    case EDITABLE_IDEA_SET_TIME:
    return {
      ...state,
      time: action.payload,
    };
    case EDITABLE_IDEA_SET_TITLE:
    return {
      ...state,
      title: action.payload,
      isCreateButtonEnabled: state.content.length > 0 && action.payload.length > 0 && state.place.length > 2,
      isTitleValid: action.payload > 2
    };
    case EDITABLE_IDEA_SET_CONTENT:
      return {
        ...state,
        content: action.payload,
        isCreateButtonEnabled: action.payload.length > 0 && state.title.length > 0 && state.place.length > 2,
        isContentValid: action.payload.length > 0
      };
    case CREATE_IDEA_SET_MIN_PEOPLE:
      return {
        ...state,
        minNumOfPeople: action.payload,
      };
    case CREATE_IDEA_SET_MAX_PEOPLE:
      return {
        ...state,
        maxNumOfPeople: action.payload,
      };
    case EDITABLE_IDEA_SET_TAGS:
    return {
      ...state,
      content: action.payload,
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
      place: action.payload.place,
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
    case EDITABLE_IDEA_SET_IS_PLACE_VALID:
      return {
        ...state,
        isPlaceValid: action.payload,
        isCreateButtonEnabled: state.content.length > 0 && action.payload.length > 0 && state.place.length > 2
      };
    case EDITABLE_IDEA_SET_IS_TITLE_VALID:
      return {
        ...state,
        isTitleValid: action.payload,
        isCreateButtonEnabled: state.content.length > 0 && action.payload.length > 0 && state.place.length > 2
      };
    case EDITABLE_IDEA_SET_IS_CONTENT_VALID:
      return {
        ...state,
        isContentValid: action.payload,
        isCreateButtonEnabled: state.content.length > 0 && action.payload.length > 0 && state.place.length > 2
      };
    case EDITABLE_SET_IS_BUTTON_CLICKED_VALUE:
      return {
        ...state,
        isClickedButton: action.payload,
        isCreateButtonEnabled: state.content.length > 0 && state.title.length > 0 && state.place.length > 2,
      };
    default:
      return state;
  }
}

export default reducer;