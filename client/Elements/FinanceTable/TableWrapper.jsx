// @flow

import React from 'react';
import { ModuleChosenChipDataContext } from '../../Constant/context';

// Mock data
import { moduleChosenChipData } from '../../Mocks/Queries/financeTable';

function TableWrapper() {
  return (
    <ModuleChosenChipDataContext.Provider value={moduleChosenChipData}>

    </ModuleChosenChipDataContext.Provider>
  );
}

export default TableWrapper;
