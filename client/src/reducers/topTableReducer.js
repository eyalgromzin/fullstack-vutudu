import { SET_TOP_LIKED_IDEAS, 
    SET_TOP_HARD_IDEAS, 
    SET_TOP_TABLE_IS_IDEA_CLICKED,
    SET_TOP_TABLE_IDEA,
 } from './types';
var dcopy = require('deep-copy');

const initialState = {
	topHardIdeas: [],
	topLikedIdeas: [],
    isClickedTopIdea: false,
    idea: {}
};

function topTableReducer(state = initialState, action) {
	switch (action.type) {
		case SET_TOP_HARD_IDEAS:
			return {
				...state,
				topHardIdeas: action.payload
			};
		case SET_TOP_LIKED_IDEAS:
			return {
				...state,
				topLikedIdeas: action.payload
			};
		case SET_TOP_TABLE_IS_IDEA_CLICKED:
			return {
				...state,
				isClickedTopIdea: action.payload
            };
        case SET_TOP_TABLE_IDEA:
            return {
                ...state,
                idea: action.payload
            };
		default:
			return state;
	}
}

export default topTableReducer;