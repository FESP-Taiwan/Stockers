// @flow

import React from 'react';
import EventEmitter from 'events';
import {
  HEAVY,
  LIGHT,
} from './wishHeatLevels';

export const ErrorHandlerContext = React.createContext({
  errorHub: new EventEmitter(),
  ERROR: Symbol('Error'),
});

export const MessageHandlerContext = React.createContext({
  messageHub: new EventEmitter(),
  MESSAGE: Symbol('Message'),
});

export default null;
