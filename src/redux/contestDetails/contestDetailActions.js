import { UPDATE_DETAILS } from './contestDetailTypes';
import axios from 'axios';

export const updateContestDetails = (data) => {
  return {
      type: UPDATE_DETAILS,
      payload: data
  };
};

export function fetchContestDetails() {
  return function(dispatch) {
    const d = new Date();
    const month = d.getMonth() + 1;
    const year = d.getYear() + 1900
    return axios.get(`/api/contests/${month}/${year}`)
      .then(({ data }) => {
        dispatch(updateContestDetails(data));
    });
  };
}
