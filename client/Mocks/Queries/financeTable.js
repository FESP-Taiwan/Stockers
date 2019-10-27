// @flow

import moment from 'moment';

// type: chip

export const headerChipData = [{ // query: chips
  id: 1,
  name: '損益表',
  layerNumber: 1,
  childNodes: [{ // type: [chip]
    id: 2,
    name: '營業成本',
    layerNumber: 2,
    childNodes: [],
  }, {
    id: 3,
    name: '毛利',
    layerNumber: 2,
    childNodes: [],
  }, {
    id: 4,
    name: '銷售費用',
    layerNumber: 2,
    childNodes: [],
  }, {
    id: 5,
    name: '管理費用',
    layerNumber: 2,
    childNodes: [],
  }, {
    id: 25,
    name: '研發費用',
    layerNumber: 2,
    childNodes: [],
  }, {
    id: 26,
    name: '營業外收益',
    layerNumber: 2,
    childNodes: [],
  }, {
    id: 27,
    name: '稅前淨利',
    layerNumber: 2,
    childNodes: [],
  }, {
    id: 28,
    name: '歸屬於母公司淨利',
    layerNumber: 2,
    childNodes: [],
  }, {
    id: 29,
    name: '每股盈餘',
    layerNumber: 2,
    childNodes: [],
  }, {
    id: 30,
    name: '營業活動',
    layerNumber: 2,
    childNodes: [],
  }, {
    id: 31,
    name: '投資活動',
    layerNumber: 2,
    childNodes: [],
  }, {
    id: 32,
    name: '自由現金流',
    layerNumber: 2,
    childNodes: [],
  }, {
    id: 33,
    name: '經營績效',
    layerNumber: 2,
    childNodes: [],
  }, {
    id: 34,
    name: '股東權益報酬率',
    layerNumber: 2,
    childNodes: [],
  }, {
    id: 35,
    name: '毛利率',
    layerNumber: 2,
    childNodes: [],
  }, {
    id: 36,
    name: '營業利益率',
    layerNumber: 2,
    childNodes: [],
  }, {
    id: 37,
    name: '淨利率',
    layerNumber: 2,
    childNodes: [],
  }, {
    id: 38,
    name: '股息',
    layerNumber: 2,
    childNodes: [],
  }, {
    id: 39,
    name: '現金股利',
    layerNumber: 2,
    childNodes: [],
  }, {
    id: 40,
    name: '股票股利',
    layerNumber: 2,
    childNodes: [],
  }, {
    id: 41,
    name: '股利合計',
    layerNumber: 2,
    childNodes: [],
  }],
}, {
  id: 6,
  name: '資產負債表',
  layerNumber: 1,
  childNodes: [{
    id: 7,
    name: '現金及約當現金',
    layerNumber: 2,
    childNodes: [],
  }, {
    id: 8,
    name: '短期投資',
    layerNumber: 2,
    childNodes: [],
  }, {
    id: 9,
    name: '應收帳款',
    layerNumber: 2,
    childNodes: [],
  }, {
    id: 42,
    name: '存貨',
    layerNumber: 2,
    childNodes: [],
  }, {
    id: 43,
    name: '長期資產',
    layerNumber: 2,
    childNodes: [],
  }, {
    id: 44,
    name: '固定資產',
    layerNumber: 2,
    childNodes: [],
  }, {
    id: 45,
    name: '其他資產',
    layerNumber: 2,
    childNodes: [],
  }, {
    id: 46,
    name: '短期借款',
    layerNumber: 2,
    childNodes: [],
  }, {
    id: 47,
    name: '應付帳款',
    layerNumber: 2,
    childNodes: [],
  }, {
    id: 48,
    name: '長期負債',
    layerNumber: 2,
    childNodes: [],
  }, {
    id: 49,
    name: '其他負債',
    layerNumber: 2,
    childNodes: [],
  }],
}, {
  id: 12,
  name: '現金流量表',
  layerNumber: 1,
  childNodes: [{
    id: 13,
    name: '平均股本',
    layerNumber: 2,
    childNodes: [],
  }, {
    id: 14,
    name: '營業活動',
    layerNumber: 2,
    childNodes: [],
  }, {
    id: 50,
    name: '投資活動',
    layerNumber: 2,
    childNodes: [],
  }, {
    id: 51,
    name: '融資活動',
    layerNumber: 2,
    childNodes: [],
  }, {
    id: 52,
    name: '其他活動',
    layerNumber: 2,
    childNodes: [],
  }, {
    id: 53,
    name: '淨現金流',
    layerNumber: 2,
    childNodes: [],
  }, {
    id: 54,
    name: '自由現金流',
    layerNumber: 2,
    childNodes: [],
  }, {
    id: 55,
    name: '期初餘額',
    layerNumber: 2,
    childNodes: [],
  }, {
    id: 56,
    name: '期末餘額',
    layerNumber: 2,
    childNodes: [],
  }],
}, {
  id: 15,
  name: '配股配息與除權息日子',
  layerNumber: 1,
  childNodes: [{
    id: 16,
    name: '年度／季度',
    layerNumber: 2,
    childNodes: [],
  }, {
    id: 17,
    name: '董事會日期',
    layerNumber: 2,
    childNodes: [],
  }, {
    id: 57,
    name: '股東會日期',
    layerNumber: 2,
    childNodes: [],
  }, {
    id: 58,
    name: '除息日',
    layerNumber: 2,
    childNodes: [],
  }, {
    id: 59,
    name: '除權日',
    layerNumber: 2,
    childNodes: [],
  }, {
    id: 60,
    name: '現金股利發放日',
    layerNumber: 2,
    childNodes: [],
  }, {
    id: 61,
    name: '現金股利(元／股)',
    layerNumber: 2,
    childNodes: [],
  }, {
    id: 62,
    name: '股票股利(元／股)',
    layerNumber: 2,
    childNodes: [],
  }],
}];

// export const moduleDataMock = [{ // type: [chip]
//   id: 2,
//   name: '現金及約當現金',
//   layerNumber: 2,
//   chipData: [{
//     id: 1,
//     value: 1000,
//     timeStamp: moment('2019-09-04'),
//   }, {
//     id: 2,
//     value: 1000,
//     timeStamp: moment('2019-09-03'),
//   }, {
//     id: 3,
//     value: 1000,
//     timeStamp: moment('2019-09-02'),
//   }, {
//     id: 4,
//     value: 1000,
//     timeStamp: moment('2019-09-01'),
//   }, {
//     id: 5,
//     value: 1000,
//     timeStamp: moment('2019-08-31'),
//   }],
// }, {
//   id: 3,
//   name: '短期投資',
//   layerNumber: 2,
//   chipData: [{
//     id: 1,
//     value: 1000,
//     timeStamp: moment('2019-09-04'),
//   }, {
//     id: 2,
//     value: 1000,
//     timeStamp: moment('2019-09-03'),
//   }, {
//     id: 3,
//     value: 1000,
//     timeStamp: moment('2019-09-02'),
//   }, {
//     id: 4,
//     value: 1000,
//     timeStamp: moment('2019-09-01'),
//   }, {
//     id: 5,
//     value: 1000,
//     timeStamp: moment('2019-08-31'),
//   }],
// }, {
//   id: 7,
//   name: '長期投資',
//   layerNumber: 2,
//   chipData: [{
//     id: 1,
//     value: 1000,
//     timeStamp: moment('2019-09-04'),
//   }, {
//     id: 2,
//     value: 1000,
//     timeStamp: moment('2019-09-03'),
//   }, {
//     id: 3,
//     value: 1000,
//     timeStamp: moment('2019-09-02'),
//   }, {
//     id: 4,
//     value: 1000,
//     timeStamp: moment('2019-09-01'),
//   }, {
//     id: 5,
//     value: 1000,
//     timeStamp: moment('2019-08-31'),
//   }],
// }, {
//   id: 9,
//   name: '其他資產',
//   layerNumber: 2,
//   chipData: [{
//     id: 1,
//     value: 1000,
//     timeStamp: moment('2019-09-04'),
//   }, {
//     id: 2,
//     value: 1000,
//     timeStamp: moment('2019-09-03'),
//   }, {
//     id: 3,
//     value: 1000,
//     timeStamp: moment('2019-09-02'),
//   }, {
//     id: 4,
//     value: 1000,
//     timeStamp: moment('2019-09-01'),
//   }, {
//     id: 5,
//     value: 1000,
//     timeStamp: moment('2019-08-31'),
//   }],
// }, {
//   id: 10,
//   name: '非流動資產',
//   layerNumber: 1,
//   chipData: [{
//     id: 1,
//     value: 1000,
//     timeStamp: moment('2019-09-04'),
//   }, {
//     id: 2,
//     value: 1000,
//     timeStamp: moment('2019-09-03'),
//   }, {
//     id: 3,
//     value: 1000,
//     timeStamp: moment('2019-09-02'),
//   }, {
//     id: 4,
//     value: 1000,
//     timeStamp: moment('2019-09-01'),
//   }, {
//     id: 5,
//     value: 1000,
//     timeStamp: moment('2019-08-31'),
//   }],
// }, {
//   id: 13,
//   name: '短期借款',
//   layerNumber: 2,
//   chipData: [{
//     id: 1,
//     value: 1000,
//     timeStamp: moment('2019-09-04'),
//   }, {
//     id: 2,
//     value: 1000,
//     timeStamp: moment('2019-09-03'),
//   }, {
//     id: 3,
//     value: 1000,
//     timeStamp: moment('2019-09-02'),
//   }, {
//     id: 4,
//     value: 1000,
//     timeStamp: moment('2019-09-01'),
//   }, {
//     id: 5,
//     value: 1000,
//     timeStamp: moment('2019-08-31'),
//   }],
// }, {
//   id: 16,
//   name: '長期負債',
//   layerNumber: 2,
//   chipData: [{
//     id: 1,
//     value: 1000,
//     timeStamp: moment('2019-09-04'),
//   }, {
//     id: 2,
//     value: 1000,
//     timeStamp: moment('2019-09-03'),
//   }, {
//     id: 3,
//     value: 1000,
//     timeStamp: moment('2019-09-02'),
//   }, {
//     id: 4,
//     value: 1000,
//     timeStamp: moment('2019-09-01'),
//   }, {
//     id: 5,
//     value: 1000,
//     timeStamp: moment('2019-08-31'),
//   }],
// }];

export const moduleDataMock = [{
  id: 0,
  headerName: '資產',
  parentName: '資產負債表',
}, {
  id: 1,
  headerName: '現金及約當現金',
  parentName: '資產負債表',
}, {
  id: 2,
  headerName: '存貨',
  parentName: '資產負債表',
}, {
  id: 3,
  headerName: '折舊費用',
  parentName: '現金流量表',
}, {
  id: 4,
  headerName: '利息費用',
  parentName: '現金流量表',
}, {
  id: 5,
  headerName: '發行公司債',
  parentName: '現金流量表',
}, {
  id: 6,
  headerName: '營業收入',
  parentName: '綜合損益表',
}];

export default null;
