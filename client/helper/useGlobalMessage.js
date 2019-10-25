// @flow

import { useContext } from 'react';

import {
  ErrorHandlerContext,
} from '../Constant/context';

export function useGlobalErrorMessage() {
  const { ERROR, errorHub } = useContext(ErrorHandlerContext);

  return message => errorHub.emit(ERROR, message);
}

export default useGlobalErrorMessage;
