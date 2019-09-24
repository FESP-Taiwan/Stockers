// @flow

import React, {
  useReducer,
} from 'react';
import reducer, { initializer } from './Reducer';
import { fromJSON } from '../../helper/json';

const styles = {

};

function Editor() {
  const [state, dispatch] = useReducer(reducer, fromJSON(), initializer);

  return (
    // Dispatch context provider
    <div></div>
  );
}

export default Editor;
