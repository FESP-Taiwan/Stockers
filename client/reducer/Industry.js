// @flow

import {
  FETCH_INDUSTRY_CARD_DATA,
} from '../actions/Industry';

<<<<<<< HEAD
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
=======
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
>>>>>>> ae11b33406bfaf1ca6875c48a8f728f79e85d5f5
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
