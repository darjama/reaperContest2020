import { PLAY_NOW } from './playlistTypes';

export const playLink = (data) => {
  return {
      type: PLAY_NOW,
      payload: data
  };
};