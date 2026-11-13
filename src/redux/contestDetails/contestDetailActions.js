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
    let sh = new URL(document.location).searchParams.get('sh');
    let cid = Number(new URL(document.location).searchParams.get('cid'));
    const d = new Date();
    let month = d.getMonth() + 1;
    let year = d.getYear() + 1900;
    if (sh && sh.startsWith('test09') && !isNaN(cid)) {
      year= cid.toString().substring(0,4);
      month = cid.toString().substring(4,6);
    }
    return axios.get(`/api/contests/${month}/${year}`)
        .then(({ data }) => {
      if (data == null && sh) {
          month = d.getMonth() + 1;
          year = d.getYear() + 1900;
        return axios.get(`/api/contests/${month}/${year}`)
      }
      return {data};
  })
        .then(({ data }) => {
      dispatch(updateContestDetails(null));})
  };

}
