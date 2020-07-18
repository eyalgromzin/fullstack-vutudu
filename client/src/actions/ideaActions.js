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
	REMOVE_LIKED_IDEA_FROM_USER,
	UPDATE_CURRENT_PREVIEWED_USER_IDEA,
	UPDATE_IDEA_IN_LIST
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

export const addIdeaToUserCreatedIdeas = (userID, idea, onSuccess, onFail) => (dispatch) => {
	//update user - V
	console.log('ideaActions: adding idea to user: ' + idea._id);
	var postObject = { userID: userID, idea: idea };
	axios.post('/api/user/addIdeaToUserCreatedIdeas', postObject).then((res) => {
		console.log('addIdeaToUserCreatedIdeas fail!!!')
		onSuccess()
	}).catch(error => {
		onFail(error);
		console.log("ERROR!!! " + error)
	}) ;
};

export const getIdeaByID = (ideaID) => (dispatch) => 
new Promise(function(resolve, reject) {
	console.log('ideaActions: getting Idea: ' + ideaID);
	var postObject = { ideaID: ideaID };
	axios.post('/api/items/getIdeaByID', postObject).then((res) => {
		console.log(`idea retrieved`);
		dispatch({ type: CHANGE_SEARCHED_STATE, payload: true });
		dispatch({ type: SET_CURRENT_IDEA, payload: res.data });

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

export const searchItems = (text, time, numOfPeople, onSuccess, onFail) => (dispatch) => {
	if (text === undefined || text == "") text = "_"
	if (time === undefined || time == "" || time == 0) time = "_"
	if (numOfPeople === undefined || numOfPeople == "" || numOfPeople == 0) numOfPeople = "_"	
	
	axios.get(`/api/items/search/${text}/${time}/${numOfPeople}`).then((res) => {
		onSuccess(res.data);
		
	}).catch(error => {
		onFail(error);
		console.log("ERROR!!! " + error)
	}) ;
};

export const showIdeaInSearch = (ideaID) => (dispatch) => {};

export const updateTags = (subjects) => (dispatch) => {
	subjects.forEach((subject) => {
		//update the 1 letter
		var firstLetters = subject.substring(0, 1);
		addTagToLettersBucketIfNotExists(firstLetters, subject);
		//updating 2 letters
		firstLetters = subject.substring(0, 2);
		addTagToLettersBucketIfNotExists(firstLetters, subject);

		//updating 3 letters
		firstLetters = subject.substring(0, 3);
		addTagToLettersBucketIfNotExists(firstLetters, subject);
	});
};

const addTagToLettersBucketIfNotExists = (firstLetters, subject) => {
	axios.post('/api/subjects/update_bucket', { firstLetters, subject }).then((res) => {
		console.log('subjects added to their bucket');
	});
};

export const updateTopIdeas = () => (dispatch) => {
	axios.post('/api/items/getTopLikedIdeas').then((res) => {
		console.log('got top liked ideas');

		dispatch({
			type: SET_TOP_LIKED_IDEAS,
			payload: res.data
		});
	});

	axios.post('/api/items/getTopLikedPercensubjecteIdeas').then((res) => {
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

export const addIdeaToDB = (idea, userID, onSuccess, onFail) => (dispatch) => {
	console.log('adding item to mongo: ' + idea.title);
	axios.post('/api/items/createIdea', { idea, userID })
	.then((res) => {
		toastr.success('Success', 'Idea Created!')

		let createdIdea = res.data
		onSuccess(createdIdea)

		console.log('added item to mongo: ' + res.data.title);

		// var idea = res.data;
		// var axiosObj = { userID, idea };

		// axios.post('/api/user/addIdeaToUserCreatedIdeas', axiosObj).then((res) => {
		// 	dispatch({
		// 		type: ADD_CREATED_IDEA_TO_USER,
		// 		payload: idea
		// 	});

		// 	dispatch({
		// 		type: CLEAR_EDITABLE_IDEA
		// 	});

		// 	console.log('added ideaID to user created array');
		// });
	})
	.catch(error => {
		onFail(error);
	});
};

export const updateIdea = (ideaID, title, content, places, subjects, 
					minTime, maxTime, minNumOfPeople, maxNumOfPeople, callBack) => dispatch => {
	axios.post(`/api/items/updateIdeaAllFields`,{ideaID, title, content, places, subjects, minTime, maxTime, minNumOfPeople, maxNumOfPeople})
    .then(res =>
    {
		callBack(res);
    });
}

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
