// @flow

export function prettifyStockData(data) {
  console.log('data', data);

  const balanceSheet = {
    name: '資產負債表',
  };

  const balanceSheetChips = data.BalanceSheet.reduce((set, el) => {
    const chipNames = Object.keys(el);

    chipNames.forEach(chipName => set.add(chipName));

    return set;
  }, new Set());

  console.log('balanceSheetChips', balanceSheetChips);

  return data;
}

export default prettifyStockData;
