import {
  GET_COUNTRIES,
  GET_COUNTRY_ID,
  GET_COUNTRY_BY_NAME,
} from "../actions/countriesActions";

const initialState = {
  countries: [],
  country: {},
  activity: [],
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
    case GET_COUNTRY_BY_NAME:
      return {
        ...state,
        activity: action.payload,
      };
    default:
      return state;
  }
}
