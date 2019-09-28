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
import Text from './Blocks/Text';
import TypeSelectorMenu from './Elements/TypeSelectorMenu';

const styles = {
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    overflow: 'auto',
  },
  paddingBlock: {
    height: 42,
  },
  blockCreator: {
    flexGrow: 1,
    width: '100%',
    cursor: 'text',
    minHeight: 64,
  },
  placeholderTxt: {
    color: '#DBDBDB',
    fontWeight: 300,
    letterSpacing: 1,
    padding: '6px 12px 6px 14px',
  },
  blockPlacement: {
    width: '100%',
    position: 'relative',
  },
  menuWrapper: {
    height: 40,
    position: 'absolute',
    top: -40,
    right: 0,
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

  useEffect(() => {
    if (!state || !prevState) return;
    // Focus feature after block removed
    if (state.blocks.length !== prevState.blocks.length) {
      const newBlockIds = state.blocks.map(block => block.id);
      const oldBlockIds = prevState.blocks.map(block => block.id);
      const removeId = oldBlockIds.findIndex(block => !~newBlockIds.indexOf(block));

      if (~removeId) {
        const artiInputs = document.querySelectorAll('.Artibox-input');

        if (removeId !== 0) {
          artiInputs[removeId - 1].focus();
        }
      }
    }
  }, [state, prevState]);

  const placeholder = useMemo(() => {
    if (!state) return null;

    const {
      blocks,
    } = state;

    return (blocks.length && !blocks[blocks.length - 1].content) ? null : (
      <span style={styles.placeholderTxt}>請在此輸入內容</span>
    );
  }, [state]);

  console.log(state);

  return (
    <DispatchContext.Provider value={dispatch}>
      <div style={styles.wrapper}>
        <div style={styles.paddingBlock} />
        {state.blocks.map((block) => {
          switch (block.type) {
            case BLOCK_TYPES.QUOTE:
            case BLOCK_TYPES.TITLE:
            case BLOCK_TYPES.SUBTITLE:
            case BLOCK_TYPES.TEXT:
            case BLOCK_TYPES.HIGHLIGHT_AREA:
              return (
                <div style={styles.blockPlacement}>
                  <Text
                    key={block.id}
                    id={block.id}
                    focus={block.focus}
                    meta={block.meta}
                    type={block.type}
                    content={block.content} />
                  <div style={styles.menuWrapper}>
                    <TypeSelectorMenu />
                  </div>
                </div>
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
