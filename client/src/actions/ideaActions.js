import axios from 'axios';
import {
	ADD_CREATED_IDEA_TO_USER,
	SAVE_IDEAS,
	CLEAR_EDITABLE_IDEA,
	SET_CURRENT_IDEA,
	CHANGE_SEARCHED_STATE,
	REMOVE_CREATED_IDEA_FROM_USER,
	SET_TOP_HARD_IDEAS,
	SET_TOP_LIKED_IDEAS,
	SET_IS_SEARCHING,
	USER_PAGE_SHOW_NEXT_CREATED_IDEA,
	SET_IS_MAIN_LOADING,
	SEARCH_SET_CURRENT_IDEA_BY_ID,
	SEARCH_SET_TIME,
	SEARCH_SET_PLACE,
	SEARCH_SET_NUM_OF_PEOPLE,
	USER_COPY_CREATED_IDEAS_TO_CURRENT_IDEAS,
	ON_CREATE_SET_IS_DUPLICATE_TITLE,
} from 'reducers/types';
import { emptyUserPreviewedIdea } from 'actions/userActions';
import store from 'store';
import { showIdeaInUserCreated } from 'components/uiActions/userPageActions';
import {toastr} from 'react-redux-toastr'

export const updateIdeaIndicator = (
	loggedInUserID,
	idea,
	userPostUrl,
	addToUserReduxTypeName,
	ideaPostUrl,
	addToIdeaReduxTypeName
) => (dispatch) => {
	console.log(
		'in ideaActions -> updateIdeaData(userID,ideaID,userPostUrl,addToUserReduxTypeName,ideaPostUrl,addToIdeaReduxTypeName)'
	);
	console.log(`addToIdeaReduxTypeName: ` + addToIdeaReduxTypeName);
	console.log(`addToUserReduxTypeName: ` + addToUserReduxTypeName);

	//update user - V
	console.log('ideaActions: adding idea to user: ' + idea._id);
	if (userPostUrl != null && userPostUrl != '') {
		console.log('sending post: ' + userPostUrl);
		var postObject = { userID: loggedInUserID, idea: idea };
		axios.post(userPostUrl, postObject).then((res) => {
			console.log(`user was updated`);
			if (addToUserReduxTypeName != null && addToUserReduxTypeName != '')
				dispatch({
					type: addToUserReduxTypeName,
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
				type: addToIdeaReduxTypeName,
				payload: loggedInUserID
			});
		});
	}

	//update the idea in the user to show immidiately results.
	// console.log('updating idea in user created ideas, so the stats will be updated.');
	// store.dispatch({type: updateIdeaInUserReduxName, payload: {loggedInUserID, ideaID: idea._id} })
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

export const getIdeaByID = (ideaID) => (dispatch) => {
	console.log('ideaActions: getting Idea: ' + ideaID);
	var postObject = { ideaID: ideaID };
	axios.post('/api/items/getIdeaByID', postObject).then((res) => {
		console.log(`idea retrieved`);
		dispatch({
			type: SET_CURRENT_IDEA,
			payload: res.data
		});
		dispatch({ type: CHANGE_SEARCHED_STATE, payload: true });

		dispatch({type: SEARCH_SET_TIME, payload: res.data.time});
		dispatch({type: SEARCH_SET_PLACE, payload: res.data.place});
		//there is no num of people in idea, there is min # ppl, and max # ppl
		dispatch({type: SEARCH_SET_NUM_OF_PEOPLE, payload: res.data.minNumOfPeople});	
		//same things, there are multiple tag for each idea
		// dispatch({type: SEARCH_SET_MORE, payload: res.data.more});


	});
};

export const searchItems = (place, time, numOfPeople, more, ideaID) => (dispatch) => {
	dispatch({ type: SET_IS_SEARCHING, payload: true });
	if (more === undefined || more == '') {
		axios.get(`/api/items/search/${place}/${time}/${numOfPeople}`).then((res) => {
			dispatch({ type: SET_IS_SEARCHING, payload: false });
			dispatch({ type: CHANGE_SEARCHED_STATE, payload: true });
			if (res.data.length > 0) {
				console.log('got ideas from db');
				dispatch({ type: SET_CURRENT_IDEA, payload: res.data[0] });
				dispatch({ type: SAVE_IDEAS, payload: res.data });
				if(ideaID !== undefined){
					this.props.dispatch({ type: SEARCH_SET_CURRENT_IDEA_BY_ID, payload: ideaID });
				}
			} else {
				console.log('got 0 items from db');
				dispatch({ type: SAVE_IDEAS, payload: [] });
			}
		});
	} else {
		axios.get(`/api/items/search/${place}/${time}/${numOfPeople}/${more}`).then((res) => {
			dispatch({ type: SET_IS_SEARCHING, payload: false });
			dispatch({ type: CHANGE_SEARCHED_STATE, payload: true });
			if (res.data.length > 0) {
				console.log('got ideas from db');
				dispatch({ type: SET_CURRENT_IDEA, payload: res.data[0] });
				dispatch({ type: SAVE_IDEAS, payload: res.data });
				dispatch({ type: CHANGE_SEARCHED_STATE, payload: true });
				if(ideaID !== undefined){
					this.props.dispatch({ type: SEARCH_SET_CURRENT_IDEA_BY_ID, payload: ideaID });
				}
			} else {
				console.log('got 0 items from db');
				dispatch({ type: SAVE_IDEAS, payload: [] });
			}
		});
	}
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

export const updateTopIdeas = () => (dispatch) => {
	axios.post('/api/items/getTopHardIdeas').then((res) => {
		console.log('tags added to their bucket');

		dispatch({
			type: SET_TOP_HARD_IDEAS,
			payload: res.data
		});

		dispatch({
			type: SET_IS_MAIN_LOADING,
			payload: false
		});
	});

	axios.post('/api/items/getTopLikedIdeas').then((res) => {
		console.log('tags added to their bucket');

		dispatch({
			type: SET_TOP_LIKED_IDEAS,
			payload: res.data
		});
	});
};

export const addIdeaToDB = (idea, userID) => (dispatch) => {
	console.log('adding item to mongo: ' + idea.title);

	var title = idea.title
	axios.post('/api/items/getIdeaByTitle', { title: title }).then((res) => {
		if(res.data == null){
			dispatch({
				type: ON_CREATE_SET_IS_DUPLICATE_TITLE,
				payload: false
			});
			
			axios.post('/api/items/createIdea', { idea, userID }).then((res) => {
				toastr.success('Success', 'Idea Created!')
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
		}else{
			dispatch({
				type: ON_CREATE_SET_IS_DUPLICATE_TITLE,
				payload: true
			});
		}
	});
};

export const deleteIdea = (userID, ideaID) => (dispatch) => {
	console.log('ideaActions: deleting idea: ' + ideaID);
	axios
		.post('/api/items/deleteIdea', { ideaID }) //deletes idea but throws 404
		.then((res) => {
			console.log('idea deleted from db');

			console.log('removing idea from user also:');
			console.log('{userID, ideaID}: ' + JSON.stringify({ userID, ideaID }));

			axios.post('/api/user/deleteCreatedIdea', { userID, ideaID }).then((res) => {
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

				//empty current idea in user page
				// emptyUserPreviewedIdea();
			});
		});
};
