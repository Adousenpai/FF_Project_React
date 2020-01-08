import { GET_PROFILE, PROFILE_ERROR, PROFILE_CLEAR } from '../actions/types';

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null
      };
    case PROFILE_CLEAR:
      return {
        ...state,
        profile: null,
        loading: false
      };
    default:
      return state;
  }
}
