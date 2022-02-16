import {
  GET_COUNTRIES,
  GET_COUNTRY_ID,
} from "../actions/countriesActions";
import { GET_ALL_ACTIVITIES } from "../actions/activityActions";

const initialState = {
  countries: [],
  country: {},
  activities: [],
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
    case GET_ALL_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };
    default:
      return state;
  }
}
