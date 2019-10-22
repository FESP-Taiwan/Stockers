// @flow

import React, {
  useState,
  useEffect,
} from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { ModuleDataContext } from '../../../Constant/context';
import ModuleTable from './ModuleTable';

// Mock data
import { moduleDataMock } from '../../../Mocks/Queries/financeTable';

type Props = {
  stockData: {},
}

function ModuleTableWrapper({
  stockData,
}: Props) {
  const [moduleData, setModuleData] = useState([]);

  useEffect(() => {
    if (moduleDataMock) {
      const sheets = Object.values(stockData).filter(el => el.name);

      const newData = moduleDataMock.map((data) => {
        const dataBelongSheetInfo = sheets.find(sheet => sheet.name === data.parentName);

        const chipDataBeforeProgressionDetermine = dataBelongSheetInfo.chipInfos
          .find(chipInfo => chipInfo.chipName === data.headerName).chipData;

        const newChipData = (dataBelongSheetInfo.isProgression
          ? chipDataBeforeProgressionDetermine.map((chip, index) => {
            if (moment(chip.date).month() - 2) {
              return {
                ...chip,
                value: parseInt(chip.value, 10)
                  - parseInt(chipDataBeforeProgressionDetermine[index + 1].value, 10),
              };
            }

            return chip;
          }).slice(0, 10)
          : chipDataBeforeProgressionDetermine.slice(0, 10));

        console.log('newChipData', newChipData);

        console.log('chipDataBeforeProgressionDetermine', chipDataBeforeProgressionDetermine);

        return {
          id: data.id,
          name: data.headerName,
          isProgression: dataBelongSheetInfo.isProgression,
          chipData: newChipData,
        };
      });

      setModuleData(newData);
    }
  }, [setModuleData, stockData]);

  return (
    <ModuleDataContext.Provider value={moduleData}>
      <ModuleTable />
    </ModuleDataContext.Provider>
  );
}

const reduxHook = connect(
  state => ({
    stockData: state.Stocks.stockData,
  }),
);

export default reduxHook(ModuleTableWrapper);
