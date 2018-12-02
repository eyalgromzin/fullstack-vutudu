import store from 'store'
import { CHANGE_SEARCHED_STATE } from 'reducers/types'
import { searchItems } from 'actions/ideaActions'

export const search = () => {
    console.log('searching ideas...');
    var place = store.getState().searchBarReducer.place
    var time = store.getState().searchBarReducer.time
    var numOfPeople = store.getState().searchBarReducer.numOfPeople
    var more = store.getState().searchBarReducer.more

    store.dispatch({ type: CHANGE_SEARCHED_STATE, payload: true });

    store.dispatch(searchItems(place, time, numOfPeople));

        // .then(res => res.json())
    // store.dispatch({ type: CHANGE_SEARCHED_STATE, payload: true });
    // dispatch(searchItems         //to run it
    //to get data from reducers

    // store.dispatch();
}

