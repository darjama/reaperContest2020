import { PLAY_NOW, ADD_NODE, MOVE_NODE, DELETE_NODE, CREATE_PLAYLIST, SHARE_NODE, SHARE_NODE2, SET_RERENDER} from './playlistTypes';

export const playLink = (data) => {
  return {
      type: PLAY_NOW,
      payload: data
  };
};

export const shareLink = (data) => {
  return {
      type: SHARE_NODE,
      payload: data
  };
};

export const shareLink2 = (data) => {
  return {
      type: SHARE_NODE2,
      payload: data
  };
};

export const createPlaylist = (data) => {
  return {
      type: CREATE_PLAYLIST,
      payload: data
  };
};

export const addTrack = (data) => {
  return {
      type: ADD_NODE,
      payload: data
  };
};

export const moveTrack = (mover, newspot) => {
  return {
      type: MOVE_NODE,
      payload1: mover,
      payload2: newspot
  };
};

export const deleteTrack = (data) => {
  return {
      type: DELETE_NODE,
      payload: data
  };
};

export const rerenderNow = () => {
  return {
      type: SET_RERENDER,
  };
};