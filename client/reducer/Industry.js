// @flow

import {
  FETCH_INDUSTRY_CARD_DATA,
} from '../actions/Industry';

type FetchIndustryCardDataAction = {
  type: string,
  data: Array<{
    id: number,
    name: string,
    chart: Array<{
      id: number,
      name: string,
      percent: number,
    }>,
  }>,
}

type IndustryActions = (
  FetchIndustryCardDataAction
);

export default (state: IndustryState = {
  IndustryCardData: null,
}, action: IndustryActions): IndustryState => {
  switch (action.type) {
    case FETCH_INDUSTRY_CARD_DATA:
      return {
        ...state,
        industryCardData: action.data,
      };

    default:
      return state;
  }
};
