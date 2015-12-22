import { createAction, handleActions } from 'redux-actions';

// ------------------------------------
// Constants
// ------------------------------------
export const SHEETS_ADD = 'SHEETS_ADD';

// ------------------------------------
// Actions
// ------------------------------------
export const sheetsAdd = createAction(SHEETS_ADD, (title = '_DEFAULT_') => {
  return {
    title: title
  };
});

// This is a thunk, meaning it is a function that immediately
// returns a function for lazy evaluation. It is incredibly useful for
// creating async actions, especially when combined with redux-thunk!
// NOTE: This is solely for demonstration purposes. In a real application,
// you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
// reducer take care of this logic.
export const doubleAsync = () => {
  return (dispatch, getState) => {
    setTimeout(() => {
      dispatch(sheetsAdd(getState().counter));
    }, 1000);
  };
};

export const actions = {
  sheetsAdd,
  doubleAsync
};

const initialState = [];

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [SHEETS_ADD]: (state, action) => {
    const newItem = {
      id: state.reduce((maxId, sheet) => Math.max(sheet.id, maxId), 0) + 1,
      title: action.payload.title
    };
    return [
      ...state,
      newItem
    ];
  }
}, initialState);
