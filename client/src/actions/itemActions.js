import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING, ADD_USER } from './types';
import { SAVE_IDEAS,NO_ITEMS_FOUND } from 'reducers/types'
import { connect } from 'react-redux';

// Pass axios to the imported 'axios-debug' function.
require('axios-debug')(axios);

export const getItems = () => dispatch => {
  dispatch(setItemsLoading());

  axios.get('/api/items').then(res =>
    dispatch({
      type: GET_ITEMS,
      payload: res.data
    })
  );
};

export const addItem = item => dispatch => {
  axios.post('/api/items', item).then(res =>
    dispatch({
      type: ADD_ITEM,
      payload: res.data
    })
  );
};

export const addUser = user => dispatch => {
  axios.post('/api/items/user', user).then(res =>
    dispatch({
      type: ADD_USER,
      payload: res.data
    })
  );
};

export const searchItems = (place,time,numOfPeople) => dispatch => {
  axios
  .get(`/api/items/search/${place}/${time}/${numOfPeople}`)
  .then(res =>{
    if(res.data.length > 0){
      dispatch({
        type: SAVE_IDEAS,
        payload: res.data
      })
    }else{
      dispatch({
        type: NO_ITEMS_FOUND
      })
    }
  }
  );
};

export const deleteItem = id => dispatch => {
  axios.delete(`/api/items/${id}`).then(res =>
    dispatch({
      type: DELETE_ITEM,
      payload: id
    })
  );
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};

export const saveLikedIdeaToUser = (idea,user) => dispatch => {
  axios.post(`/api/items/user/liked/${userId}/${ideaId}`, user.id, idea.id).then(res =>
    dispatch({
      type: ADD_USER,
      payload: res.data
    })
  );
};
