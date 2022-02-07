import {
  GET_COUNTRIES,
  GET_COUNTRY_ID,
  GET_COUNTRY_BY_NAME,
  RESET_COUNTRY
  // GET_COUNTRY_BY_CONTINENT,
} from "../actions/countriesActions";
import { GET_ALL_ACTIVITIES } from "../actions/activityActions";

const initialState = {
  countries: [],
  country: {},
  countriesByContinent: [],
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
    case GET_COUNTRY_BY_NAME:
      return {
        ...state,
        countries: action.payload,
      };
    // case ADD_ACTIVITY_IN_COUNTRIES:
    //   return {
    //     ...state,
    //     activity: action.payload,
    //   };
    case GET_ALL_ACTIVITIES:
      return {
        ...state,
        activities: action.payload,
      };
    case RESET_COUNTRY:
      return {
        ...state,
        country: {},
      };
    default:
      return state;
  }
}
