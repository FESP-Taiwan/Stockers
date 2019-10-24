// @flow

import EventEmitter from 'events';

export const investStrategySharedEmitter = new EventEmitter();

investStrategySharedEmitter.setMaxListeners(1000);

export const START_EDITTING = 'E/MATH/START_EDITTING';
export const END_EDITTING = 'E/MATH/END_EDITTING';
export const INIT_MODULE = 'E/MATH/INIT_MODULE';
export const CLICK_EVENT = 'E/MODULE/ONCLICK';
export const EDITTER_GET_GRID = 'E/COMMENT/EDITTER_GET_GRID';

// meta types
export const MATH_META_TYPES = {
  LARGE: 'MATH/TYPES/LARGE',
  AVERAGE: 'MATH/TYPES/AVERAGE',
  DATE: 'MATH/TYPES/DATE',
  GRID: 'MATH/TYPES/GRID',
};
