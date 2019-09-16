// @flow

import React, {
  useState,
  useEffect,
} from 'react';
import { ModuleDataContext } from '../../Constant/context';
import ModuleTable from './ModuleTable';

// Mock data
import { moduleDataMock } from '../../Mocks/Queries/financeTable';

function ModuleTableWrapper() {
  const [moduleData, setModuleData] = useState([]);

  useEffect(() => {
    if (moduleDataMock) {
      setModuleData(moduleDataMock);
    }
  }, [setModuleData]);

  return (
    <ModuleDataContext.Provider value={moduleData}>
      <ModuleTable />
    </ModuleDataContext.Provider>
  );
}

export default ModuleTableWrapper;
