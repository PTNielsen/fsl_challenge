import * as types from '../constants/ActionTypes'

export const changePage = (page) => {
  return {
    type: types.CHANGE_PAGE,
    payload: page
  }
}

export const setHouseholdId = (id) => {
  return {
    type: types.SET_HOUSEHOLD_ID,
    payload: id
  }
}
