import * as PAGES from '../constants/PageTypes.js';

const initialState = {
  page: PAGES.HOUSEHOLD_PAGE,
  householdId: null
};

const wizardReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_PAGE':
      return Object.assign({}, state, {
        page: action.payload
      });
    case 'SET_HOUSEHOLD_ID':
      return Object.assign({}, state, {
        householdId: action.payload
      });
    default:
      return state
  };
};

export default wizardReducer;
