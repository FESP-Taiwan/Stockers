// @flow

import gql from 'graphql-tag';

export const INDUSTRY_STICKERS = gql`
  query IndustryStickers {
    industryStickers {
      id
      industryName
      industryRiseFall
      monthRiseFallList {
        id
        dataDate
        value
      }
    }
  }
`;

export const followingStocks = [{
  id: 1,
  name: '台積電',
  number: 2330,
  status: 'BUY',
  following: [{
    id: 1,
    name: 'A',
  }, {
    id: 2,
    name: 'B',
  }],
}, {
  id: 2,
  name: '聯電',
  number: 2303,
  status: 'SELL',
  following: [{
    id: 1,
    name: 'A',
  }, {
    id: 2,
    name: 'B',
  }, {
    id: 3,
    name: 'C',
  }],
}, {
  id: 3,
  name: '聯發科',
  number: 2453,
  status: 'BUY',
  following: [{
    id: 1,
    name: 'A',
  }, {
    id: 2,
    name: 'B',
  }],
}, {
  id: 4,
  name: '台積電',
  number: 2330,
  status: 'BUY',
  following: [{
    id: 1,
    name: 'A',
  }, {
    id: 2,
    name: 'B',
  }],
}, {
  id: 5,
  name: '台積電',
  number: 2330,
  status: 'BUY',
  following: [{
    id: 1,
    name: 'A',
  }, {
    id: 2,
    name: 'B',
  }],
}, {
  id: 6,
  name: '台積電',
  number: 2330,
  status: 'BUY',
  following: [{
    id: 1,
    name: 'A',
  }, {
    id: 2,
    name: 'B',
  }],
}, {
  id: 7,
  name: '台積電',
  number: 2330,
  status: 'BUY',
  following: [{
    id: 1,
    name: 'A',
  }, {
    id: 2,
    name: 'B',
  }],
}, {
  id: 8,
  name: '台積電',
  number: 2330,
  status: 'BUY',
  following: [{
    id: 1,
    name: 'A',
  }, {
    id: 2,
    name: 'B',
  }],
}, {
  id: 9,
  name: '台積電',
  number: 2330,
  status: 'BUY',
  following: [{
    id: 1,
    name: 'A',
  }, {
    id: 2,
    name: 'B',
  }],
}];

export const industryCard = [{ // industryStickers
  id: 1,
  name: '半導體',
  chart: [{
    id: 1,
    name: 'firstMonth',
    percent: 60,
  }, {
    id: 2,
    name: 'secondMonth',
    percent: 20,
  }, {
    id: 3,
    name: 'secondMonth',
    percent: 80,
  }],
}, {
  id: 2,
  name: '半導體',
  chart: [{
    id: 1,
    name: 'firstMonth',
    percent: 60,
  }, {
    id: 2,
    name: 'secondMonth',
    percent: 20,
  }, {
    id: 3,
    name: 'secondMonth',
    percent: 80,
  }],
}, {
  id: 3,
  name: '半導體',
  chart: [{
    id: 1,
    name: 'firstMonth',
    percent: 60,
  }, {
    id: 2,
    name: 'secondMonth',
    percent: 20,
  }, {
    id: 3,
    name: 'secondMonth',
    percent: 80,
  }],
}, {
  id: 4,
  name: '半導體',
  chart: [{
    id: 1,
    name: 'firstMonth',
    percent: 60,
  }, {
    id: 2,
    name: 'secondMonth',
    percent: 20,
  }, {
    id: 3,
    name: 'secondMonth',
    percent: 80,
  }],
}, {
  id: 5,
  name: '半導體',
  chart: [{
    id: 1,
    name: 'firstMonth',
    percent: 60,
  }, {
    id: 2,
    name: 'secondMonth',
    percent: 20,
  }, {
    id: 3,
    name: 'secondMonth',
    percent: 80,
  }],
}, {
  id: 6,
  name: '半導體',
  chart: [{
    id: 1,
    name: 'firstMonth',
    percent: 60,
  }, {
    id: 2,
    name: 'secondMonth',
    percent: 20,
  }, {
    id: 3,
    name: 'secondMonth',
    percent: 80,
  }],
}, {
  id: 7,
  name: '半導體',
  chart: [{
    id: 1,
    name: 'firstMonth',
    percent: 60,
  }, {
    id: 2,
    name: 'secondMonth',
    percent: 20,
  }, {
    id: 3,
    name: 'secondMonth',
    percent: 80,
  }],
}, {
  id: 8,
  name: '半導體',
  chart: [{
    id: 1,
    name: 'firstMonth',
    percent: 60,
  }, {
    id: 2,
    name: 'secondMonth',
    percent: 20,
  }, {
    id: 3,
    name: 'secondMonth',
    percent: 80,
  }],
}, {
  id: 9,
  name: '半導體',
  chart: [{
    id: 1,
    name: 'firstMonth',
    percent: 60,
  }, {
    id: 2,
    name: 'secondMonth',
    percent: 20,
  }, {
    id: 3,
    name: 'secondMonth',
    percent: 80,
  }],
}, {
  id: 10,
  name: '半導體',
  chart: [{
    id: 1,
    name: 'firstMonth',
    percent: 60,
  }, {
    id: 2,
    name: 'secondMonth',
    percent: 20,
  }, {
    id: 3,
    name: 'secondMonth',
    percent: 80,
  }],
}, {
  id: 11,
  name: '半導體',
  chart: [{
    id: 1,
    name: 'firstMonth',
    percent: 60,
  }, {
    id: 2,
    name: 'secondMonth',
    percent: 20,
  }, {
    id: 3,
    name: 'secondMonth',
    percent: 80,
  }],
}, {
  id: 12,
  name: '半導體',
  chart: [{
    id: 1,
    name: 'firstMonth',
    percent: 60,
  }, {
    id: 2,
    name: 'secondMonth',
    percent: 20,
  }, {
    id: 3,
    name: 'secondMonth',
    percent: 80,
  }],
}, {
  id: 13,
  name: '半導體',
  chart: [{
    id: 1,
    name: 'firstMonth',
    percent: 60,
  }, {
    id: 2,
    name: 'secondMonth',
    percent: 20,
  }, {
    id: 3,
    name: 'secondMonth',
    percent: 80,
  }],
}, {
  id: 14,
  name: '半導體',
  chart: [{
    id: 1,
    name: 'firstMonth',
    percent: 60,
  }, {
    id: 2,
    name: 'secondMonth',
    percent: 20,
  }, {
    id: 3,
    name: 'secondMonth',
    percent: 80,
  }],
}, {
  id: 15,
  name: '半導體',
  chart: [{
    id: 1,
    name: 'firstMonth',
    percent: 60,
  }, {
    id: 2,
    name: 'secondMonth',
    percent: 20,
  }, {
    id: 3,
    name: 'secondMonth',
    percent: 80,
  }],
}, {
  id: 16,
  name: '半導體',
  chart: [{
    id: 1,
    name: 'firstMonth',
    percent: 60,
  }, {
    id: 2,
    name: 'secondMonth',
    percent: 20,
  }, {
    id: 3,
    name: 'secondMonth',
    percent: 80,
  }],
}, {
  id: 17,
  name: '半導體',
  chart: [{
    id: 1,
    name: 'firstMonth',
    percent: 60,
  }, {
    id: 2,
    name: 'secondMonth',
    percent: 20,
  }, {
    id: 3,
    name: 'secondMonth',
    percent: 80,
  }],
}, {
  id: 18,
  name: '半導體',
  chart: [{
    id: 1,
    name: 'firstMonth',
    percent: 60,
  }, {
    id: 2,
    name: 'secondMonth',
    percent: 20,
  }, {
    id: 3,
    name: 'secondMonth',
    percent: 80,
  }],
}, {
  id: 19,
  name: '半導體',
  chart: [{
    id: 1,
    name: 'firstMonth',
    percent: 60,
  }, {
    id: 2,
    name: 'secondMonth',
    percent: 20,
  }, {
    id: 3,
    name: 'secondMonth',
    percent: 80,
  }],
}, {
  id: 20,
  name: '半導體',
  chart: [{
    id: 1,
    name: 'firstMonth',
    percent: 60,
  }, {
    id: 2,
    name: 'secondMonth',
    percent: 20,
  }, {
    id: 3,
    name: 'secondMonth',
    percent: 80,
  }],
}, {
  id: 21,
  name: '半導體',
  chart: [{
    id: 1,
    name: 'firstMonth',
    percent: 60,
  }, {
    id: 2,
    name: 'secondMonth',
    percent: 20,
  }, {
    id: 3,
    name: 'secondMonth',
    percent: 80,
  }],
}, {
  id: 22,
  name: '半導體',
  chart: [{
    id: 1,
    name: 'firstMonth',
    percent: 60,
  }, {
    id: 2,
    name: 'secondMonth',
    percent: 20,
  }, {
    id: 3,
    name: 'secondMonth',
    percent: 80,
  }],
}, {
  id: 23,
  name: '半導體',
  chart: [{
    id: 1,
    name: 'firstMonth',
    percent: 60,
  }, {
    id: 2,
    name: 'secondMonth',
    percent: 20,
  }, {
    id: 3,
    name: 'secondMonth',
    percent: 80,
  }],
}, {
  id: 24,
  name: '半導體',
  chart: [{
    id: 1,
    name: 'firstMonth',
    percent: 60,
  }, {
    id: 2,
    name: 'secondMonth',
    percent: 20,
  }, {
    id: 3,
    name: 'secondMonth',
    percent: 80,
  }],
}];

export default null;
