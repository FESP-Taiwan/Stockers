// @flow

import React, {
  useReducer,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import reducer, { initializer } from './Reducer';
import { fromJSON } from '../../helper/json';
import { Dispatch as DispatchContext } from '../../Constant/ArtiboxEditor/context';
import { BLOCK_TYPES } from '../../Constant/ArtiboxEditor/blockTypes';
import Actions from '../../Constant/ArtiboxEditor/actions';

const styles = {
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  blockCreator: {
    flexGrow: 1,
    width: '100%',
    cursor: 'text',
    minHeight: 64,
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

  const placeholder = useMemo(() => {
    if (!state) return null;

    const {
      blocks,
    } = state;

    return (blocks.length && !blocks[blocks.length - 1].content) ? null : '請在此輸入內容';
  }, [state]);

  console.log(state);

  return (
    <DispatchContext.Provider value={dispatch}>
      <div style={styles.wrapper}>
        {state.blocks.map((block) => {
          switch (block.type) {
            case BLOCK_TYPES.QUOTE:
            case BLOCK_TYPES.TITLE:
            case BLOCK_TYPES.SUBTITLE:
            case BLOCK_TYPES.TEXT:
            case BLOCK_TYPES.HIGHLIGHT_AREA:
              return (
                <div></div>
              );

            default:
              return null;
          }
        })}
        <div
          tabIndex={-1}
          style={styles.blockCreator}
          onMouseDown={(e) => {
            e.preventDefault();

            const {
              blocks,
            } = state;

            const lastBlock = (blocks.length && blocks[blocks.length - 1]);

            if (!lastBlock || (lastBlock
              && (lastBlock.type === BLOCK_TYPES.LINE ? true : !!lastBlock.content))
            ) {
              dispatch({
                type: Actions.NEW_LINE,
              });
            }
          }}
          role="button">
          {placeholder}
        </div>
      </div>
    </DispatchContext.Provider>
  );
}

export default Editor;
