// @flow

import React, {
  useState,
  useEffect,
} from 'react';
import { connect } from 'react-redux';
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

        return {
          id: data.id,
          name: data.headerName,
          isProgression: dataBelongSheetInfo.isProgression,
          chipData: dataBelongSheetInfo.chipInfos
            .find(chipInfo => chipInfo.chipName === data.headerName).chipData,
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
