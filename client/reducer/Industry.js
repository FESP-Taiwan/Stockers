// @flow

import {
  FETCH_INDUSTRY_DATA,
} from '../actions/Industry';

// type FetchIndustryDataAction = {
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
//   FetchIndustryDataAction
// );

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
