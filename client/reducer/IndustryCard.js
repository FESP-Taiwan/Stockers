// @flow

import {
  FETCH_INDUSTRY_CARD_DATA,
} from '../actions/IndustryCard';

// type FetchIndustryCardDataAction = {
//   type: string,
//   data: Array<{
//     id: number,
//     name: string,
//     chart: Array<{
//       id: number,
//       name: string,
//       percent: number,
//     }>,
//   }>,
// }
//
// type IndustryActions = (
//   FetchIndustryCardDataAction
// );

type State = {

}

export default (state: State = {
  IndustryCardData: [],
}, action: any) => {
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
