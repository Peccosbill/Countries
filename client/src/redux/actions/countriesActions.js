import axios from "axios";
export const GET_COUNTRIES = "GET_COUNTRIES";
export const GET_COUNTRY_ID = "GET_COUNTRY_ID";
export const GET_COUNTRY_BY_NAME = "GET_COUNTRY_BY_NAME";
export const GET_COUNTRY_BY_CONTINENT = "GET_COUNTRY_BY_CONTINENT";

export function getCountries() {
  return async function (dispatch) {
    return await axios
      .get("http://localhost:3001/countries")
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
      .get(`http://localhost:3001/countries/${id}`)
      .then((response) => {
        dispatch({
          type: GET_COUNTRY_ID,
          payload: response.data,
        });
      });
  };
}

// export function getCountryByName(name) {
//   return async function (dispatch) {
//     return await axios
//       .get(`http://localhost:3001/countries?name=${name}`)
//       .then((response) => {
//         dispatch({
//           type: GET_COUNTRY_BY_NAME,
//           payload: response.data,
//         });
//       });
//   };
// }

// export function getCountryByContinent(continent) {
//   return async function (dispatch) {
//     return await axios
//       .get(`http://localhost:3001/continent/${continent}`)
//       .then((response) => {
//         dispatch({
//           type: GET_COUNTRY_BY_CONTINENT,
//           payload: response.data,
//         });
//       });
//   };
// }
