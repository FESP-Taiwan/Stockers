// @flow

import React, {
  useReducer,
  useRef,
  useEffect,
} from 'react';
import reducer, { initializer } from './Reducer';
import { fromJSON } from '../../helper/json';
import { Dispatch as DispatchContext } from '../../Constant/ArtiboxEditor/context';

const styles = {
  wrapper: {
    width: '100%',
    height: '100%',
  },
};

function usePreviosState(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

function Editor() {
  const [state, dispatch] = useReducer(reducer, fromJSON(), initializer);

  const prevState = usePreviosState(state);

  console.log(state);

  return (
    <DispatchContext.Provider value={dispatch}>
      <div style={styles.wrapper}>

      </div>
    </DispatchContext.Provider>
  );
}

export default Editor;
