// @flow

import React, {
  useReducer,
  useRef,
  useEffect,
  useMemo,
  useState,
} from 'react';
import reducer, { initializer } from './Reducer';
import { fromJSON } from '../../helper/json';
import { Dispatch as DispatchContext } from '../../Constant/ArtiboxEditor/context';
import { BLOCK_TYPES } from '../../Constant/ArtiboxEditor/types';
import Actions from '../../Constant/ArtiboxEditor/actions';
import Text from './Blocks/Text';
import Line from './Blocks/Line';
import Grid from './Blocks/Grid';
import TypeSelectorMenu from './Elements/TypeSelectorMenu';
import {
  investStrategySharedEmitter,
  EDITTER_GET_GRID,
} from '../../Constant/investStrategy';

const styles = {
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  mainBlock: {
    display: 'flex',
    flexDirection: 'column',
    padding: '35px 30px 0 30px',
    overflow: 'auto',
    flexGrow: 1,
    width: '100%',
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
    width: '100%',
    height: 80,
    backgroundColor: Colors.LAYER_FOURTH,
    borderRadius: 40,
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
  const [curFocusBlock, setFocusBlock] = useState(null);
  const [state, dispatch] = useReducer(reducer, fromJSON(), initializer);

  console.log(state);

  const prevState = usePreviosState(state);

  useEffect(() => {
    function getGridHandler(gridInfo) {
      const { blocks } = state;

      if (blocks) {
        const focusBlock = blocks.find(block => block.focus);

        if (focusBlock && focusBlock.type === BLOCK_TYPES.GRID) {

        } else {
          dispatch({
            type: Actions.NEW_GRID,
            gridInfo,
          });
        }
      }
    }

    investStrategySharedEmitter.on(EDITTER_GET_GRID, getGridHandler);

    return () => {
      investStrategySharedEmitter.removeListener(EDITTER_GET_GRID, getGridHandler);
    };
  }, [dispatch, state]);

  useEffect(() => {
    if (!state) return;

    const target = state.blocks.find(block => block.focus);

    if (target) {
      setFocusBlock(target);
    } else {
      setFocusBlock(null);
    }
  }, [state]);

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

  return (
    <DispatchContext.Provider value={dispatch}>
      <div style={styles.wrapper}>
        <div style={styles.mainBlock}>
          {state.blocks.map((block) => {
            switch (block.type) {
              case BLOCK_TYPES.LINE:
                return (
                  <Line
                    id={block.id}
                    focus={block.focus}
                    content={block.content}
                    meta={block.meta}
                    type={block.type}
                    key={block.id} />
                );
              case BLOCK_TYPES.TITLE:
              case BLOCK_TYPES.SUBTITLE:
              case BLOCK_TYPES.TEXT:
              case BLOCK_TYPES.HIGHLIGHT_AREA:
                return (
                  <div
                    key={block.id}
                    style={styles.blockPlacement}>
                    <Text
                      id={block.id}
                      focus={block.focus}
                      meta={block.meta}
                      type={block.type}
                      content={block.content} />
                  </div>
                );

              case BLOCK_TYPES.GRID:
                return (
                  <Grid
                    id={block.id}
                    focus={block.focus}
                    type={block.type}
                    meta={block.meta} />
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
                && ((
                  lastBlock.type === BLOCK_TYPES.LINE || lastBlock.type === BLOCK_TYPES.GRID
                ) ? true : !!lastBlock.content))
              ) {
                dispatch({
                  type: Actions.NEW_LINE,
                });
              } else if (document.activeElement === document.body
                || document.activeElement.className === 'Artibox-type-selector-btn') {
                const allInputs = document.querySelectorAll('.Artibox-input');
                const lastInput = allInputs[allInputs.length - 1];

                if (lastInput) {
                  lastInput.focus();
                }
              }
            }}
            role="button">
            {placeholder}
          </div>
        </div>
        <div style={styles.menuWrapper}>
          <TypeSelectorMenu
            curFocusId={curFocusBlock ? curFocusBlock.id : null}
            curFocusType={curFocusBlock ? curFocusBlock.type : null} />
        </div>
      </div>
    </DispatchContext.Provider>
  );
}

export default Editor;
