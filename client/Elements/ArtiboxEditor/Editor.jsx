// @flow

import React, {
  useReducer,
} from 'react';
import reducer, { initializer } from './Reducer';
import { fromJSON } from '../../helper/json';
import { Dispatch as DispatchContext } from '../../Constant/ArtiboxEditor/context';

const styles = {

};

function Editor() {
  const [state, dispatch] = useReducer(reducer, fromJSON(), initializer);

  console.log(state);

  return (
    <DispatchContext.Provider value={dispatch}>

    </DispatchContext.Provider>
  );
}

export default Editor;
