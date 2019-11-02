// @flow

import moment from 'moment';

export default function stimulationCalculate(stockId, datePeriod, modulesInfo, stockData, initialPrice) {
  const {
    startFrom,
    endAt,
  } = datePeriod;

  console.log('startFrom', startFrom);
  console.log('endAt', endAt);

  const timeListNumber = (moment(endAt).year() - moment(startFrom).year() - 1) * 4 + (4 - moment(startFrom).quarter()) + moment(endAt).quarter();

  console.log('timeListNumber', timeListNumber);

  const timeList = Array.from(Array(timeListNumber)).reduce((list, n, index) => {
    if (index === 0) {
      return [startFrom];
    }

    return [
      ...list,
      moment(list[index - 1]).add(1, 'quarters').format('YYYY-MM'),
    ];
  }, []);

  const chipList = Object.values(stockData).reduce((list, el) => {
    if (!el.chipInfos) return list;

    return [
      ...list,
      ...el.chipInfos,
    ];
  }, []);

  console.log('modulesInfo', modulesInfo);

  console.log('timeList', timeList);

  return {
    initialPrice,
    modules: modulesInfo.map(module => ({
      moduleId: module.id,
      moduleRate: `${module.usingStock
        .find(stock => stock.companyNumber === parseInt(stockId, 10)).rate}%`,
      moduleMath: {
        content: module.mathModule.content,
        metaList: module.mathModule.chipInfos.map(chipInfo => ({
          FROM: chipInfo.FROM,
          TO: chipInfo.TO,
          metaInfo: {
            type: chipInfo.chipData.type,
            timeStamp: chipInfo.chipData.date,
            chipName: chipInfo.chipData.name,
            rowId: chipInfo.chipData.rowId,
          },
        })),
      },
      partitionedDataPhases: timeList.map(timeStamp => ({
        stockPrice: 10,
        timeStamp,
        chipDataList: module.mathModule.chipInfos.map((chip) => {
          const {
            chipName,
            chipData,
          } = chipList.find(c => c.chipName === chip.chipData.name);

          const curChip = chipData.find(cur => cur.date === timeStamp);

          return {
            chipName,
            value: curChip ? curChip.value : null,
          };
        }),
      })),
      gridTypePastData: module.mathModule.chipInfos.filter(chip => chip.chipData.type === 'GRID').map((el) => {
        const {
          chipName,
          chipData,
        } = chipList.find(c => c.chipName === el.chipData.name);

        const firstTimeStamp = moment(startFrom).subtract(1, 'quarters').format('YYYY-MM');
        const secondTimeStamp = moment(startFrom).subtract(2, 'quarters').format('YYYY-MM');

        return {
          chipName,
          data: chipData.filter(d => d.date === firstTimeStamp || d.date === secondTimeStamp)
            .map(e => ({
              timeStamp: e.date,
              value: e.value,
            })),
        };
      }),
    })),
  };
}
