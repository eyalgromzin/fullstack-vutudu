import axios from 'axios';
import { ADD_ITEM } from 'reducers/types';
import { SAVE_IDEAS,NO_ITEMS_FOUND, UPDATE_CURRENT_IDEA, SET_CURRENT_IDEA } from 'reducers/types'
import { connect } from 'react-redux';

// Pass axios to the imported 'axios-debug' function.

// require('axios-debug')(axios);

// export const getItems = () => dispatch => {
//   dispatch(setItemsLoading());

//   axios.get('/api/items').then(res =>
//     dispatch({
//       type: GET_ITEMS,
//       payload: res.data
//     })
//   );
// };

export const addItem = item => dispatch => {
  console.log('adding item to mongo: ' + item.subject);
  
  axios.post('/api/items', item).then(res =>
    dispatch({
      type: ADD_ITEM,
      payload: res.data
    })
  );

  console.log('item added');
};

// export const addUser = user => dispatch => {
//   axios.post('/api/items/user', user).then(res =>
//     dispatch({
//       type: ADD_USER,
//       payload: res.data
//     })
//   );
// };

export const searchItems = (place,time,numOfPeople) => dispatch => {
  console.log('using thunk in search items');
  axios
  .get(`/api/items/search/${place}/${time}/${numOfPeople}`)
  .then(res =>{
    if(res.data.length > 0){
      console.log('got ideas from db');
      dispatch({
        type: SAVE_IDEAS,
        payload: res.data
      });
      dispatch({
        type: SET_CURRENT_IDEA,
        payload: res.data[0]
      })
    }else{
      console.log('got 0 items from db');
      dispatch({
        type: NO_ITEMS_FOUND
      })
    }
  }
  );
};

// export const deleteItem = id => dispatch => {
//   axios.delete(`/api/items/${id}`).then(res =>
//     dispatch({
//       type: DELETE_ITEM,
//       payload: id
//     })
//   );
// };

// export const setItemsLoading = () => {
//   return {
//     type: ITEMS_LOADING
//   };
// };