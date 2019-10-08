// @flow

import React from 'react';
import MathModuleBlock from './MathModuleBlock';
import { MathInitDataContext } from '../../../Constant/context';

// Mock data
const MOCK = {
  content: 'asfasdf',
  meta: {},
};

function MathModuleBlockWrapper() {
  return (
    <MathInitDataContext.Provider value={MOCK}>
      <MathModuleBlock />
    </MathInitDataContext.Provider>
  );
}

export default MathModuleBlockWrapper;
