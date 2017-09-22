import * as ACTIONS from '../constants/ActionTypes'

export const changePage = (page) => {
  return {
    type: ACTIONS.CHANGE_PAGE,
    payload: page
  }
}

export const setHouseholdId = (id) => {
  return {
    type: ACTIONS.SET_HOUSEHOLD_ID,
    payload: id
  }
}
