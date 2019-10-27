// @flow

import React from 'react';
import MathModuleBlock from './MathModuleBlock';
import { MathInitDataContext } from '../../../Constant/context';

import { MATH_META_TYPES } from '../../../Constant/investStrategy';

// Mock data
const MOCK = {
  content: '(現金及約當現金  /現金及約當現金  )>10%',
  chipInfos: [{
    FROM: 1,
    TO: 10,
    chipData: {
      columnId: 1,
      date: null,
      name: '現金及約當現金',
      rowId: 0,
      type: MATH_META_TYPES.GRID,
    },
  }, {
    FROM: 11,
    TO: 20,
    chipData: {
      columnId: 1,
      date: null,
      name: '現金及約當現金',
      rowId: 'header',
      type: MATH_META_TYPES.AVERAGE,
    },
  }],
};

function MathModuleBlockWrapper() {
  return (
    <MathInitDataContext.Provider value={MOCK}>
      <MathModuleBlock />
    </MathInitDataContext.Provider>
  );
}

export default MathModuleBlockWrapper;
