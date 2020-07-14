import { combineReducers } from 'redux';

const playlistReducer = function (state = [], action) {
  switch (action.type) {
    case 'MOVE_UP':
      if (action.id > 0) [state[action.id], state[action.id - 1]] = [state[action.id - 1], state[action.id]]
      return state
    case 'MOVE_DOWN':
      if (action.id < state.length - 1) [state[action.id], state[action.id + 1]] = [state[action.id + 1], state[action.id]]
      return state
    default:
      return state
  }
}

const voteReducer = function (state = [], action) {
  switch (action.type) {
    case 'ADD_VOTE':
      state.splice(action.place, 0, action.id)
      if (state.length > 3) state.pop()
      return state
    case 'REMOVE_VOTE':
      state.splice(action.place, 1)
      return state
    default:
      return state
  }
}

const noteReducer = function (state = '', action) {
  switch (action.type) {
    case 'EDIT_NOTE':
      return action.text
    case 'REMOVE_NOTE':
      return ''
    default:
      return state
  }
}

export default combineReducers({ playlistReducer, voteReducer, noteReducer });