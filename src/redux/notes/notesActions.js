import { EDIT_NOTE, CLEAR_NOTES } from './notesTypes';

export const updateNote = (data) => {
  return {
      type: EDIT_NOTE,
      payload: data
  };
};

export const clearNotes = () => {
  return {
      type: CLEAR_NOTES,
  };
};