// @flow

<<<<<<< HEAD
=======
import { API_REQUEST } from 'redux-middleware-fetch';

>>>>>>> ae11b33406bfaf1ca6875c48a8f728f79e85d5f5
export const FETCH_INDUSTRY_CARD_DATA = 'INDUSTRY/FETCH_INDUSTRY_CARD_DATA';

export function fetchIndustryCardData() {
  return {
<<<<<<< HEAD
    type: FETCH_INDUSTRY_CARD_DATA,
    method: 'GET',
    entrypoint: '/Industry/IndustryCardData',
=======
    [API_REQUEST]: {
      types: [
        FETCH_INDUSTRY_CARD_DATA,
      ],
      auth: false,
      method: 'GET',
      entrypoint: '/stocker/mainpage_1',
    },
>>>>>>> ae11b33406bfaf1ca6875c48a8f728f79e85d5f5
  };
}
