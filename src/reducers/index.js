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

const initVote = [null, null, null];

const voteReducer = function (state = initVote, action) {
  switch (action.type) {
    case 'ADD_VOTE':
    let [place, mixnum] = action.payload;
      let top3 = [...state];

      let oldIndex = top3.indexOf(mixnum);
      if (place === 999) {
        top3[oldIndex] = null;
      } else if (oldIndex !== place) {
        if (oldIndex > -1) top3.splice(oldIndex, 1);
        if (top3[place] === null) {
          top3[place] = mixnum;
        } else {
          top3.splice(place, 0, mixnum);
        }
        top3.splice(3, 1);
      }
      return top3;
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
  playNowReducer,
  voteReducer,
});