// @flow

import moment from 'moment';

function formatDateValue(value) {
  const formatChars = ['年', '月', '日'];

  const charsPostitions = formatChars.map(char => value.indexOf(char));

  const formatedDate = charsPostitions.reduce((formatingValue, pos) => {
    if (!formatingValue.substring(pos + 1)) {
      return `${formatingValue.substring(0, pos)}`;
    }

    return `${formatingValue.substring(0, pos)}-${formatingValue.substring(pos + 1)}`;
  }, value);

  return moment(formatedDate);
}

function prettifyBalanceSheet(balanceSheetData) {
  const removeChipNames = ['_id', 'code', 'report_date', 'year', 'season', 'ticker'];

  const balanceSheetChipsSet = balanceSheetData.reduce((set, el) => {
    const chipNames = Object.keys(el);

    chipNames.forEach((chipName) => {
      if (!~removeChipNames.indexOf(chipName)) {
        set.add(chipName);
      }
    });

    return set;
  }, new Set());

  const balanceSheetChips = Array.from(balanceSheetChipsSet);

  return {
    name: '資產負債表',
    chipInfos: balanceSheetChips.map(chip => ({
      chipName: chip,
      chipData: balanceSheetData.map(info => ({
        date: formatDateValue(info.report_date),
        value: info[chip],
      })),
    })),
  };
}

export function prettifyStockData(data) {
  console.log('data', data);

  const balanceSheet = prettifyBalanceSheet(data.BalanceSheet);

  console.log('balanceSheet', balanceSheet);

  return data;
}

export default prettifyStockData;
