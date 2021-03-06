import { combineReducers } from 'redux';
import { PlaylistMaker, PlaylistNode } from '../redux/playlist/playlistObj';

const initPlaylist = new PlaylistMaker();

const playlistReducer = function (state = initPlaylist, action) {
  switch (action.type) {
    case 'CREATE_PLAYLIST':
      const newState = new PlaylistMaker(action.payload1, action.payload2);
      return newState;
    case 'ADD_NODE':
      state.addNode(action.payload1, action.payload2);
      return state;
    case 'DELETE_NODE':
      state.deleteNode(action.payload);
      return state;
    case 'MOVE_NODE':
      state.moveNode(action.payload1, action.payload2);
      return state;
    default:
      return state;
  }
};

const initPlayer = {
  next: null,
  prev: null,
  uri: 'https://flac.reamixed.com/hi.mp3',
  name: 'Please Vote (but not for yourself)!',
};

const playNowReducer = function (state = initPlayer, action) {
  switch (action.type) {
    case 'PLAY_NOW':
      return action.payload;

    default:
      return state;
  }
};

const shareNodeReducer = function (state = {}, action) {
  switch (action.type) {
    case 'SHARE_NODE':
      return action.payload;
    default:
      return state;
  }
};

const shareNodeReducer2 = function (state = null, action) {
  switch (action.type) {
    case 'SHARE_NODE2':
      return action.payload;
    default:
      return state;
  }
};

const rerenderReducer = function (state = true, action) {
  switch (action.type) {
    case 'SET_RERENDER':
      return !state;
    default:
      return state;
  }
};

const noteReducer = function (state = {}, action) {
  switch (action.type) {
    case 'EDIT_NOTE':
      return { ...state, ...action.payload };
    case 'CLEAR_NOTES':
      return {};
    default:
      return state;
  }
};

const contestDetailReducer = function (state = {}, action) {
  switch (action.type) {
    case 'UPDATE_DETAILS':
      return action.payload;
    default:
      return state;
  }
};

const initVote = {};

const voteReducer = function (state = initVote, action) {
  switch (action.type) {
    case 'ADD_VOTE':
      let [stars, mixnum] = action.payload;
      let votes = Object.assign({}, state);
      votes[mixnum] = stars;
      let localVotes = JSON.stringify(votes);
      localStorage.setItem('votes', localVotes);
      return votes;
    case 'CLEAR_VOTES':
      return initVote;
    default:
      return state;
  }
};

const entriesDetailReducer = function (state = [], action) {
  switch (action.type) {
    case 'UPDATE_ENTRIES':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  playlistReducer,
  noteReducer,
  contestDetailReducer,
  entriesDetailReducer,
  playNowReducer,
  voteReducer,
  playlistReducer,
  shareNodeReducer,
  shareNodeReducer2,
  rerenderReducer,
});
