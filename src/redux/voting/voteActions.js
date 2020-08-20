import { ADD_VOTE, CLEAR_VOTES } from './voteTypes';

export const addVote = (place, mixnum) => {
  return {
      type: ADD_VOTE,
      payload: [Number(place), mixnum]
  };
};

export const clearVotes = (place, mixnum) => {
  return {
      type: CLEAR_VOTES
  };
};