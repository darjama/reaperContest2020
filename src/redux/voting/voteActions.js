import { ADD_VOTE } from './voteTypes';

export const addVote = (place, mixnum) => {
  return {
      type: ADD_VOTE,
      payload: [Number(place), mixnum]
  };
};