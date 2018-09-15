import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import { SAVE_IDEAS } from 'reducers/types'
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

export const searchItems = (place,time,numOfPeople) => dispatch => {
  axios
  .get(`/api/items/search/${place}/${time}/${numOfPeople}`)
  .then(res =>{
    dispatch({
      type: SAVE_IDEAS,
      payload: res.data
    })
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
