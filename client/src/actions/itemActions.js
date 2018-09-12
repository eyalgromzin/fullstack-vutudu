import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';
import { NEW_IDEA_SET_TITLE,NEW_IDEA_SET_CONTENT } from 'reducers/types'
import { connect } from 'react-redux';

// export const updateTitle = (title) => dispatch => {
//   dispatch({
//     type: NEW_IDEA_SET_TITLE,
//     payload: title
//   })
// }

// export const updateContent = (content) => dispatch => {
//   dispatch({
//     type: NEW_IDEA_SET_CONTENT,
//     payload: content
//   })
// }

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
