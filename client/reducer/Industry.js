// @flow

import {
  FETCH_INDUSTRY_DATA,
} from '../actions/Industry';

type State = {

}

export default (state: State = {
  IndustryData: [],
}, action: any) => {
  switch (action.type) {
    case FETCH_INDUSTRY_DATA:
      return {
        ...state,
        industryData: action.data,
      };

    default:
      return state;
  }
};
