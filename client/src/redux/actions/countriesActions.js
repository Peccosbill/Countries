import axios from "axios";
export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRY_ID = "GET_COUNTRY_ID";

export function getCountries() {
  return async function (dispatch) {
    return await axios
      .get("/countries")
      .then((response) => {
        dispatch({
          type: GET_COUNTRIES,
          payload: response.data,
        });
      });
  };
}

export function getCountryId(id) {
  return async function (dispatch) {
    return await axios
      .get(`/countries/${id}`)
      .then((response) => {
        dispatch({
          type: GET_COUNTRY_ID,
          payload: response.data,
        });
      });
  };
}


