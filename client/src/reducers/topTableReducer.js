import { SET_TOP_LIKED_IDEAS, 
    SET_TOP_HARD_IDEAS, 
    SET_TOP_TABLE_IS_IDEA_CLICKED,
	SET_TOP_TABLE_IDEA,
	SET_TOP_NEWEST_IDEAS,
	SET_TOP_POPULAR_IDEAS,
 } from './types';
var dcopy = require('deep-copy');

const initialState = {
	topHardIdeas: [],
	topLikedIdeas: [],
	topPopularIdeas: [],
	topNewestIdeas: [],
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
		case SET_TOP_POPULAR_IDEAS:
			return {
				...state,
				topPopularIdeas: action.payload
			};
		case SET_TOP_NEWEST_IDEAS:
			return {
				...state,
				topNewestIdeas: action.payload
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
