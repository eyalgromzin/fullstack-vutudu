import { SET_TOP_LIKED_IDEAS, 
    SET_TOP_HARD_IDEAS, 
    SET_TOP_TABLE_IS_IDEA_CLICKED,
	SET_TOP_TABLE_IDEA,
	SET_TOP_NEWEST_IDEAS,
	SET_TOP_LIKED_PERCENTAGE_IDEAS,
	REMOVE_IDEA_FROM_TOP_TABLE,
 } from './types';
import { removeIdeaFromArray } from '../commonUtils';

const initialState = {
	topHardIdeas: [],
	topLikedIdeas: [],
	topLikedPercentageIdeas: [],
	topNewestIdeas: [],
    wasIdeaClicked: false,
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
		case SET_TOP_LIKED_PERCENTAGE_IDEAS:
			return {
				...state,
				topLikedPercentageIdeas: action.payload
			};
		case SET_TOP_NEWEST_IDEAS:
			return {
				...state,
				topNewestIdeas: action.payload
			};
		case SET_TOP_TABLE_IS_IDEA_CLICKED:
			return {
				...state,
				wasIdeaClicked: action.payload
			};
		case REMOVE_IDEA_FROM_TOP_TABLE:
			let topLikedIdeas = removeIdeaFromArray(state.topLikedIdeas, action.payload)
			let topLikedPercentageIdeas = removeIdeaFromArray(state.topLikedPercentageIdeas, action.payload)
			let topNewestIdeas = removeIdeaFromArray(state.topNewestIdeas, action.payload)

			return {
				...state,
				topLikedIdeas: topLikedIdeas,
				topLikedPercentageIdeas: topLikedPercentageIdeas,
				topNewestIdeas: topNewestIdeas
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
