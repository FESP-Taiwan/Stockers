// @flow

import {
  FETCH_INDUSTRY_DATA,
} from '../actions/Industry';

// type FetchIndustryDataAction = {
//   type: string,
//   data: Array<{
//     id: number,
//     name: string, // 半導體
//     subIndustries: Array<{
//       id: number,
//       type: string, // 上中下游
//       name: string, // IP/IC設計
//       companies: Array<{
//         id: number,
//         stockNumber: number, // 2401
//         name: string, // 凌陽
//       }>,
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
