// @flow

import EventEmitter from 'events';

// MatInput events
export const mathSharedEmitter = new EventEmitter();

mathSharedEmitter.setMaxListeners(1000);

export const START_EDITTING = 'MATH/START_EDITTING';
export const END_EDITTING = 'MATH/END_EDITTING';
export const INIT_MODULE = 'MATH/INIT_MODULE';

// ModuleGridUnit events
export const moduleGridSharedEmitter = new EventEmitter();

moduleGridSharedEmitter.setMaxListeners(300);

export const ENTER_EVENT = 'MODULE/MOUSE_ENTER';
export const LEAVE_EVENT = 'MODULE/MOUSE_LEAVE';
export const CLICK_EVENT = 'MODULE/ONCLICK';
