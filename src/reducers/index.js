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


const initPlayer = {
  next: null,
  prev: null,
  uri: 'http://flac.reamixed.com/hi.mp3',
  name: 'Please Vote!'
}

const playNowReducer = function (state = initPlayer, action) {
  switch (action.type) {
    case 'PLAY_NOW':
      return action.payload
    default:
      return state
  }
}

const noteReducer = function (state = {}, action) {
  switch (action.type) {
    case 'EDIT_NOTE':
      return {...state, ...action.payload}
    default:
      return state
  }
}

const contestDetailReducer = function (state = {}, action) {
  switch (action.type) {
    case 'UPDATE_DETAILS':
      return action.payload
    default:
      return state
  }
}

const entriesDetailReducer = function(state = [], action) {
  switch (action.type) {
    case 'UPDATE_ENTRIES':
      return action.payload
    default:
      return state
  }
}

export default combineReducers({
  playlistReducer,
  noteReducer,
  contestDetailReducer,
  entriesDetailReducer,
  playNowReducer
});