import { UPDATE_ENTRIES } from './entriesTypes';
import axios from 'axios';

export const updateEntriesDetails = (data) => {
  return {
      type: UPDATE_ENTRIES,
      payload: data
  };
};

export function fetchEntriesDetails() {
  return function(dispatch) {
    const d = new Date();
    let month = ('0' + (d.getMonth() + 1));
    month = month.substring(month.length - 2);
    const year = d.getFullYear();
    return axios.get(`/api/entries/${year}${month}`)
      .then(({ data }) => {
        dispatch(updateEntriesDetails(data));
    }).catch(err => console.log(err));
  };
}
