import React from 'react';
import { combineReducers } from 'redux';
import update from 'react-addons-update';
import {
	SET_LOGGED_IN_USER_ID,
	SET_LOGGED_IN_USER_FIRST_NAME,
	SET_LOGGED_IN_USER_LAST_NAME,
	ADD_LIKED_IDEA_TO_USER,
	ADD_CREATED_IDEA_TO_USER,
	USER_PAGE_IDEAS_TYPE,
	SET_USER_CURRENT_PREVIEWED_IDEA,
	SET_USER_CREATED_IDEAS,
	SET_USER_CURRENT_PREVIEWED_IDEAS,
	USER_SET_SELECTED_DROPDOWN_TYPE,
	SET_USER_CURRENT_PREVIEWED_IDEA_IS_EDIT,
	UPDATE_IDEA_IN_LIST,
	USER_PAGE_SHOW_NEXT_CREATED_IDEA,
	USER_COPY_LIKED_IDEAS_TO_CURRENT_IDEAS,
	USER_COPY_CREATED_IDEAS_TO_CURRENT_IDEAS,
	UPDATE_LIKED_IDEAS_IDEA,
	CHANGE_USER_UPDATE_TOGGLE,
	SET_USER_LIKED_IDEAS,
	SET_USER_PREVIEWED_IDEA_FROM_LIKED,
	UPDATE_LOCAL_USER_CREATED_IDEA,
	REMOVE_CREATED_IDEA_FROM_USER,
	CLEAR_USER_PAGE_IDEA,
	EMPTY_USER_PREVIEWED_IDEA,
	UPDATE_CURRENT_PREVIEWED_USER_IDEA,
	REMOVE_LIKED_IDEA_FROM_USER,
	CHANGE_LOGGED_IN_TYPE,
	SET_LOGGED_IN_USER_EMAIL,
} from 'reducers/types';
import { idea } from 'models/idea';
var dcopy = require('deep-copy');

const initialState = {
	loggedInUserID: '',
	loggedInUserFirstName: '',
	loggedInUserLastName: '',
	email: '',
	likedIdeas: [], //copy here the liked ideas - its ok because the user liked them as they are
	createdIdeas: [], //copy here created ideas - on edit, update the user and the item itself.
	doneIdeasData: [],
	currentPreviewedIdea: {},
	currentPreviewedIdeaIndex: 0,
	currentPreviewedIdeas: [],
	selectedDropDownType: '',
	isIdeaEdited: false,
	updateToggle: false,
	loggedInWith: "NONE"
};

const updateIdeaInArray = (ideasArray, idea) => {
	var newIdeasArray = dcopy(ideasArray);

	newIdeasArray.forEach((ideaI) => {
		if (ideaI != null && ideaI !== undefined && ideaI._id == idea.ideaId) {
			ideaI.title = idea.title;
			ideaI.content = idea.content;

			if (idea.place !== undefined) {
				ideaI.place = idea.place;
			}
			if (idea.time !== undefined) {
				ideaI.place = idea.place;	
			}
			if (idea.minNumOfPeople !== undefined) {
				ideaI.maxNumOfPeople = idea.maxNumOfPeople;
			}
			if (idea.maxNumOfPeople !== undefined) {
				ideaI.maxNumOfPeople = idea.maxNumOfPeople;
			}
		}
	});

	return newIdeasArray;
};

const updateLikedIdeasIdea = (state, idea) => {
	state.likedIdeas.forEach((element) => {
		if (element._id == idea._id) {
			element.title = idea.title;
			element.content = idea.content;
		}
	});

	return state.currentPreviewedIdeas;
};

function getCopyOfCurrentIdea(state) {
	return dcopy(state.currentIdea);
}

function removeIdea(ideas, ideaID) {
	var newArray = []
	ideas.forEach(idea => {
		if(idea._id != ideaID){
			newArray.push(idea)
		}
	})

	return newArray;
}

const getNextIdea = (ideas, currentIdeaIndex) => {
  if (currentIdeaIndex == ideas.length - 1){
    return 0
  }else{
    return currentIdeaIndex + 1
  }
}

function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_LOGGED_IN_USER_ID:
			return {
				...state,
				loggedInUserID: action.payload
			};
    case USER_PAGE_SHOW_NEXT_CREATED_IDEA:
      //gets here after idea is deleted
      if(state.createdIdeas.length > 0){
        let nextIdeaIndex = state.currentPreviewedIdeaIndex
        let nextIdea = state.createdIdeas[nextIdeaIndex];
          
        return {
          ...state,
          currentPreviewedIdea: nextIdea
        };
      }else{
        return {
          ...state,
          currentPreviewedIdea: {}
        };
      }
		case SET_LOGGED_IN_USER_FIRST_NAME:
			return {
				...state,
				loggedInUserFirstName: action.payload
			};
		case CHANGE_LOGGED_IN_TYPE:
			return {
				...state,
				loggedInWith: action.payload
			};
		case SET_LOGGED_IN_USER_LAST_NAME:
			return {
				...state,
				loggedInUserLastName: action.payload
			};
		case SET_LOGGED_IN_USER_EMAIL:
			return {
				...state,
				email: action.payload
			};
		case ADD_LIKED_IDEA_TO_USER:
			var isObjectExists = state.likedIdeas.some( idea => { return idea._id == action.payload._id } );

			if(isObjectExists){
				return {
					...state,
					likedIdeas: [ ...state.likedIdeas ]
				};
			}
			else{
				return {
					...state,
					likedIdeas: [ ...state.likedIdeas, action.payload ]
				};
			}
		// case ADD_USER_TO_LIKED_OF_CREATED_IDEA:
		//   let likedIdeas = dcopy(state.likedIdeas);
		//   let ideaIndex = likedIdeas.findIndex((idea => idea._id == action.payload.ideaID));
		//   likedIdeas[ideaIndex].liked.push(action.payload.userID)

		//   return {
		//     ...state,
		//     likedIdeas: likedIdeas
		//   }
		case ADD_CREATED_IDEA_TO_USER:
			return {
				...state,
				createdIdeas: [ ...state.createdIdeas, action.payload ]
			};
		case SET_USER_CREATED_IDEAS:
			return {
				...state,
				createdIdeas: action.payload
			};
		case SET_USER_LIKED_IDEAS:
			return {
				...state,
				likedIdeas: action.payload
			};
		case USER_SET_SELECTED_DROPDOWN_TYPE:
			return {
				...state,
				selectedDropDownType: action.payload
			};
		case USER_PAGE_IDEAS_TYPE:
			return {
				...state,
				userPageIdeasType: action.payload
			};
		case SET_USER_CURRENT_PREVIEWED_IDEAS:
			return {
				...state,
				currentPreviewedIdeas: action.payload
			};
		case SET_USER_CURRENT_PREVIEWED_IDEA_IS_EDIT:
			return {
				...state,
				isIdeaEdited: action.payload
			};
		case SET_USER_CURRENT_PREVIEWED_IDEA:
			// let newPreviewedIdea = action.payload
			// let currentIdeaIndex = state.createdIdeas.findIndex(idea => idea.content == newPreviewedIdea.content && idea.title == newPreviewedIdea.title)
      
			return {
				...state,
				currentPreviewedIdea: action.payload,
			};		
		case SET_USER_PREVIEWED_IDEA_FROM_LIKED:
			return {
				...state,
				currentPreviewedIdea: state.likedIdeas[0],
			};
		case UPDATE_CURRENT_PREVIEWED_USER_IDEA:
			let currentPreviewedIdea = dcopy(state.currentPreviewedIdea);

			if (
				action.payload.place !== undefined &&
				action.payload.time !== undefined &&
				action.payload.minNumOfPeople !== undefined &&
				action.payload.maxNumOfPeople !== undefined
			) {
				currentPreviewedIdea.title = action.payload.title;
				currentPreviewedIdea.content = action.payload.content;
				currentPreviewedIdea.place = action.payload.place;
				currentPreviewedIdea.time = action.payload.time;
				currentPreviewedIdea.minNumOfPeople = action.payload.minNumOfPeople;
				currentPreviewedIdea.maxNumOfPeople = action.payload.maxNumOfPeople;
			} else if (action.payload.title !== undefined && action.payload.content !== undefined) {
				currentPreviewedIdea.title = action.payload.title;
				currentPreviewedIdea.content = action.payload.content;
			}

			return {
				...state,
				currentPreviewedIdea: currentPreviewedIdea
			};
		case UPDATE_IDEA_IN_LIST:
			let updatedIdea = dcopy(idea)

			updatedIdea._id = action.payload.ideaId
			updatedIdea.title = action.payload.title
			updatedIdea.content = action.payload.content
			updatedIdea.places = action.payload.places
			updatedIdea.minTime = action.payload.minTime
			updatedIdea.maxTime = action.payload.maxTime
			updatedIdea.minNumOfPeople = action.payload.minNumOfPeople
			updatedIdea.maxNumOfPeople = action.payload.maxNumOfPeople
			updatedIdea.subjects = action.payload.subjects

			let ideaIndex = 0
			let i=0
			for(i = 0; i < state.currentPreviewedIdeas.length; i++){
				if(state.currentPreviewedIdeas[i]._id !== undefined &&
						state.currentPreviewedIdeas[i]._id == updatedIdea._id){
							ideaIndex = i;
							break
						}
			}
			// let ideaIndex = state.currentPreviewedIdeas.findIndex(ideaI => updatedIdea.createdOn == ideaI.createdOn)

			let newCurrentPreviewedIdeas = dcopy(state.currentPreviewedIdeas)

			newCurrentPreviewedIdeas[ideaIndex] = updatedIdea

			return {
				...state,
				currentPreviewedIdeas: newCurrentPreviewedIdeas,
				updateToggle: !state.updateToggle
			};
		case UPDATE_LIKED_IDEAS_IDEA:
			return {
				...state,
				likedIdeas: updateLikedIdeasIdea(state, action.payload)
			};
		case USER_COPY_LIKED_IDEAS_TO_CURRENT_IDEAS:
			return {
				...state,
				currentPreviewedIdeas: state.likedIdeas
			};
		case USER_COPY_CREATED_IDEAS_TO_CURRENT_IDEAS:
			return {
				...state,
				currentPreviewedIdeas: state.createdIdeas
			};
		case CLEAR_USER_PAGE_IDEA:
			return {
				...state,
				currentPreviewedIdea: {}
			};
		case CHANGE_USER_UPDATE_TOGGLE:
			return {
				...state,
				updateToggle: !state.updateToggle
			};
		case EMPTY_USER_PREVIEWED_IDEA:
			return {
				...state,
				currentPreviewedIdea: {}
			};
		case UPDATE_LOCAL_USER_CREATED_IDEA:
			var createdIdeas = dcopy(state.createdIdeas);
			createdIdeas = updateIdeaInArray(createdIdeas, action.payload);

			return {
				...state,
				createdIdeas: createdIdeas
			};
		case REMOVE_CREATED_IDEA_FROM_USER:
			var createdIdeas = dcopy(state.createdIdeas);
			var ideaID = action.payload;

			createdIdeas = removeIdea(createdIdeas, ideaID);

			return {
				...state,
				createdIdeas: createdIdeas
			};

		case REMOVE_LIKED_IDEA_FROM_USER:
				var likedIdeas = dcopy(state.likedIdeas);
				var ideaID = action.payload;
	
				likedIdeas = removeIdea(likedIdeas, ideaID);
	
				return {
					...state,
					likedIdeas: likedIdeas
				};
		default:
			return state;
	}
}

export default reducer;
