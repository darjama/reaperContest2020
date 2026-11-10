import { TICK } from './dateTypes';

export const tick = (now = Date.now()) => {
  return {
    type: TICK,
    payload: now,
  };
};
