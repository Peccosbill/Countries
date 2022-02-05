import axios from "axios";
export const ADD_ACTIVITY_IN_COUNTRIES = "ADD_ACTIVITY_IN_COUNTRIES";
export const GET_ALL_ACTIVITIES = "GET_ALL_ACTIVITIES";

export function addActivityInCountries(activity) {
  return async function (dispatch) {
    return await axios
      .post(`http://localhost:3001/activity`, activity)
      .then((response) => {
        return dispatch({
          type: ADD_ACTIVITY_IN_COUNTRIES,
          payload: response.data,
        });
      });
  };
}

export function getAllActivities() {
  return async function (dispatch) {
    return await axios
      .get(`http://localhost:3001/activity`)
      .then((response) => {
        return dispatch({
          type: GET_ALL_ACTIVITIES,
          payload: response.data,
        });
      });
  };
}
