import { EDIT_NOTE } from './notesTypes';

export const updateNote = (data) => {
  return {
      type: EDIT_NOTE,
      payload: data
  };
};