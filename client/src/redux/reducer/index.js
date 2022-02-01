import { GET_COUNTRIES, GET_COUNTRY_ID } from "../actions/countriesActions";

const initialState = {
  countries: [],
  country: {},
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
      };
    case GET_COUNTRY_ID:
      return {
        ...state,
        country: action.payload,
      };
    default:
      return state;
  }
}
