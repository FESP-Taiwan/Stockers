// @flow

export const industries = [{
  id: 1,
  industryName: '半導體',
  subIndustries: [{
    id: 1,
    type: '上游產業',
    header: 'IP設計/IC設計',
    stocks: [{
      id: 1,
      name: 'IP設計/IC設計代工服務產業',
      companies: [{
        id: 1,
        number: 2401,
        name: '凌陽',
      }, {
        id: 2,
        number: 3035,
        name: '智原',
      }],
    }],
  }, {
    id: 2,
    type: '中游產業',
    header: 'IC 製造、晶圓製造',
    stocks: [{
      id: 1,
      name: '其他IC/二極體製造產業',
      companies: [{
        id: 1,
        number: 2302,
        name: '麗正',
      }, {
        id: 2,
        number: 2308,
        name: '台達電',
      }],
    }],
  }, {
    id: 3,
    type: '下游產業',
    header: 'IC 封裝測試、IC 模組',
    stocks: [{
      id: 1,
      name: '生產製程及檢測設備',
      companies: [{
        id: 1,
        number: 2360,
        name: '致茂',
      }, {
        id: 2,
        number: 3030,
        name: '德律',
      }],
    }],
  }],
}];

export default null;
