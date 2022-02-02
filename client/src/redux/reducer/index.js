import {
  GET_COUNTRIES,
  GET_COUNTRY_ID,
  GET_COUNTRY_BY_NAME,
} from "../actions/countriesActions";
import { ADD_ACTIVITY_IN_COUNTRIES } from "../actions/activityActions";

const initialState = {
  countries: [],
  country: {},
  countryActivity: [],
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
        countryActivity: action.payload,
      };
    case ADD_ACTIVITY_IN_COUNTRIES:
      return {
        ...state,
        activity: action.payload,
      };
    default:
      return state;
  }
}
