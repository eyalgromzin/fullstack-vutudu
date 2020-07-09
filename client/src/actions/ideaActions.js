import axios from 'axios';
import {
	ADD_CREATED_IDEA_TO_USER,
	SET_SEARCH_IDEAS,
	CLEAR_EDITABLE_IDEA,
	SET_CURRENT_IDEA,
	CHANGE_SEARCHED_STATE,
	REMOVE_CREATED_IDEA_FROM_USER,
	SET_TOP_HARD_IDEAS,
	SET_TOP_LIKED_IDEAS,
	SET_TOP_LIKED_PERCENTAGE_IDEAS,
	SET_TOP_NEWEST_IDEAS,
	SET_IS_SEARCHING,
	USER_PAGE_SHOW_NEXT_CREATED_IDEA,
	SET_IS_MAIN_LOADING,
	SEARCH_SET_CURRENT_IDEA_BY_ID,
	SEARCH_SET_TIME,
	SEARCH_SET_PLACE,
	USER_COPY_CREATED_IDEAS_TO_CURRENT_IDEAS,
	ON_CREATE_SET_IS_DUPLICATE_TITLE,
	EDITABLE_SET_IS_BUTTON_CLICKED_VALUE,
	REMOVE_LIKED_IDEA_FROM_USER
} from 'reducers/types';
import { emptyUserPreviewedIdea } from 'actions/userActions';
import store from 'store';
import { showIdeaInUserCreated } from 'components/uiActions/userPageActions';
import {toastr} from 'react-redux-toastr'
import { ADD_USER_ID_TO_IDEA_LIKES } from '../reducers/types';

export const updateIdeaIndicator = (
	loggedInUserID,
	idea,
	userPostUrl,
	userReduxActionName,
	ideaPostUrl,
	ideaReduxActionName
) => (dispatch) => {
	console.log(
		'in ideaActions -> updateIdeaData(userID,ideaID,userPostUrl,addToUserReduxTypeName,ideaPostUrl,addToIdeaReduxTypeName)'
	);
	console.log(`addToIdeaReduxTypeName: ` + ideaReduxActionName);
	console.log(`addToUserReduxTypeName: ` + userReduxActionName);

	//update user - V
	console.log('ideaActions: adding idea to user: ' + idea._id);
	if (userPostUrl != null && userPostUrl != '') {
		console.log('sending post: ' + userPostUrl);
		var postObject = { userID: loggedInUserID, idea: idea };
		axios.post(userPostUrl, postObject).then((res) => {
			console.log(`user was updated`);
			if (userReduxActionName != null && userReduxActionName != '')
				dispatch({
					type: userReduxActionName,
					payload: res.data
				});
		});
	}

	console.log('ideaActions: adding user to idea: ' + idea._id);
	if (ideaPostUrl != null && ideaPostUrl != '') {
		console.log('sending post: ' + ideaPostUrl);
		var ideaPostObject = { userID: loggedInUserID, idea: idea };
		axios.post(ideaPostUrl, ideaPostObject).then((res) => {
			console.log(`idea was updated`);
			dispatch({
				type: ideaReduxActionName,
				payload: loggedInUserID
			});
		});
	}	
};

export const addUserIDToIdeaLikes = (userID, ideaID, callback) => (dispatch) => {
	//update user - V
	console.log('addUserIDToIdeaLikes... ');
	var postObject = { ideaID: ideaID, userID: userID };
	axios.post('/api/items/ideaLiked/', postObject).then((res) => {
		console.log(`user was updated`);
		dispatch({
			type: ADD_USER_ID_TO_IDEA_LIKES,
			payload: userID
		});
	});
};

export const addIdeaToUserCreatedIdeas = (userID, idea) => (dispatch) => {
	//update user - V
	console.log('ideaActions: adding idea to user: ' + idea._id);
	var postObject = { userID: userID, idea: idea };
	axios.post('', postObject).then((res) => {
		console.log(`user was updated`);
		dispatch({
			type: ADD_CREATED_IDEA_TO_USER,
			payload: res.data
		});
	});
};

export const getIdeaByID = (ideaID) => (dispatch) => 
new Promise(function(resolve, reject) {
	console.log('ideaActions: getting Idea: ' + ideaID);
	var postObject = { ideaID: ideaID };
	axios.post('/api/items/getIdeaByID', postObject).then((res) => {
		console.log(`idea retrieved`);
		dispatch({ type: SET_CURRENT_IDEA, payload: res.data });
		dispatch({ type: CHANGE_SEARCHED_STATE, payload: true });

		dispatch({ type: SEARCH_SET_TIME, payload: res.data.time });
		dispatch({ type: SEARCH_SET_PLACE, payload: res.data.place });
	});

	// // Function is expected to return a promise
    // callUpdateApi(todoId, isDone).then(updatedTodo => {
	// 	dispatch({
	// 	  type: 'SET_SAVING',
	// 	  saving: false
	// 	});
  
	// 	resolve(updatedTodo);
	//   }).catch(error => {
	// 	// TBD: Handle errors for Redux
  
	// 	reject(error);
	//   })
});

export const searchItems = (place, time, numOfPeople, more) => (dispatch) => {
	if (place === undefined || place == "") place = "_"
	if (time === undefined || time == "") time = "_"
	if (numOfPeople === undefined || numOfPeople == "") place = "_"
	if (more === undefined || more == "") more = "_"

	dispatch({ type: SET_IS_SEARCHING, payload: true });
	axios.get(`/api/items/search/${place}/${time}/${numOfPeople}/${more}`).then((res) => {
		dispatch({ type: SET_IS_SEARCHING, payload: false });
		dispatch({ type: CHANGE_SEARCHED_STATE, payload: true });
		if (res.data.length > 0) {
			console.log('got ideas from db');
			dispatch({ type: SET_CURRENT_IDEA, payload: res.data[0] });
			dispatch({ type: SET_SEARCH_IDEAS, payload: res.data });
			dispatch({ type: CHANGE_SEARCHED_STATE, payload: true });
		} else {
			console.log('got 0 items from db');
			dispatch({ type: SET_SEARCH_IDEAS, payload: [] });
		}
	});
};

export const showIdeaInSearch = (ideaID) => (dispatch) => {};

export const updateTags = (tags) => (dispatch) => {
	tags.forEach((tag) => {
		//update the 1 letter
		var firstLetters = tag.substring(0, 1);
		addTagToLettersBucketIfNotExists(firstLetters, tag);
		//updating 2 letters
		firstLetters = tag.substring(0, 2);
		addTagToLettersBucketIfNotExists(firstLetters, tag);

		//updating 3 letters
		firstLetters = tag.substring(0, 3);
		addTagToLettersBucketIfNotExists(firstLetters, tag);
	});
};

const addTagToLettersBucketIfNotExists = (firstLetters, tag) => {
	axios.post('/api/tags/update_bucket', { firstLetters, tag }).then((res) => {
		console.log('tags added to their bucket');
	});
};

export const updateTopLikedIdeas = () => (dispatch) => {
	axios.post('/api/items/getTopLikedIdeas').then((res) => {
		console.log('got top liked ideas');

		dispatch({
			type: SET_TOP_LIKED_IDEAS,
			payload: res.data
		});
	});

	axios.post('/api/items/getTopLikedPercentageIdeas').then((res) => {
		console.log('got top popular ideas');

		dispatch({
			type: SET_TOP_LIKED_PERCENTAGE_IDEAS,
			payload: res.data
		});
	});

	axios.post('/api/items/getTopNewestIdeas').then((res) => {
		console.log('got top newest ideas');

		dispatch({
			type: SET_TOP_NEWEST_IDEAS,
			payload: res.data
		});
	});
};

export const isIdeaTitleExists = (title, callBack) => (dispatch) => {
	axios.post('/api/items/getIdeaByTitle', { title: title }).then((res) => {
		if(res.data == null){
			// dispatch({
			// 	type: ON_CREATE_SET_IS_DUPLICATE_TITLE,
			// 	payload: false
			// });

			callBack(false)
		}else{
			// dispatch({
			// 	type: ON_CREATE_SET_IS_DUPLICATE_TITLE,
			// 	payload: true
			// });

			callBack(true)
		}
	});
}

export const addIdeaToDB = (idea, userID) => (dispatch) => {
	console.log('adding item to mongo: ' + idea.title);
	axios.post('/api/items/createIdea', { idea, userID }).then((res) => {
		toastr.success('Success', 'Idea Created!')

		dispatch({
			type: EDITABLE_SET_IS_BUTTON_CLICKED_VALUE,
			payload: false
		});


		console.log('added item to mongo: ' + res.data.title);

		var idea = res.data;
		var axiosObj = { userID, idea };

		axios.post('/api/user/addIdeaToUserCreatedIdeas', axiosObj).then((res) => {
			dispatch({
				type: ADD_CREATED_IDEA_TO_USER,
				payload: idea
			});

			dispatch({
				type: CLEAR_EDITABLE_IDEA
			});

			console.log('added ideaID to user created array');
		});
	});
};

//if the idea doesnt exist in the db, just delete it from the user. 
export const deleteIdea = (userID, ideaID, onSuccess) => (dispatch) => {
	console.log('ideaActions: deleting idea from db: ' + ideaID);
	axios.post('/api/items/deleteIdea', { ideaID }) 
	.then((res) => {
		console.log('idea deleted from db');
	});

	console.log('removing idea from user created also:');
	console.log('{userID, ideaID}: ' + JSON.stringify({ userID, ideaID }));

	axios.post('/api/user/deleteCreatedIdea', { userID, ideaID }).then((res) => {
		onSuccess()

		console.log('idea was removed from user');

		dispatch({
			type: REMOVE_CREATED_IDEA_FROM_USER,
			payload: ideaID
		});

		//update the drop down list
		dispatch({
			type: USER_COPY_CREATED_IDEAS_TO_CURRENT_IDEAS
		});

		dispatch({
			type: USER_PAGE_SHOW_NEXT_CREATED_IDEA
		});

		
	});

	console.log('removing idea from user liked also:');
	axios.post('/api/user/deleteLikedIdea', { userID, ideaID }).then((res) => {
		console.log('idea was removed from user');

		dispatch({
			type: REMOVE_LIKED_IDEA_FROM_USER,
			payload: ideaID
		});
	});
};
