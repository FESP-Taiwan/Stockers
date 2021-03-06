// @flow

import React, { useContext, useEffect, useRef } from 'react';
import Actions from '../../../Constant/ArtiboxEditor/actions';
import { Dispatch as DispatchContext } from '../../../Constant/ArtiboxEditor/context';

const styles = {
  wrapper: {
    position: 'relative',
    width: '100%',
    borderLeft: '2px solid transparent',
    padding: '0 12px',
    height: 24,
  },
  focusWrapper: {
    position: 'relative',
    width: '100%',
    borderLeft: `2px solid ${Colors.PRIMARY}`,
    padding: '0 12px',
    height: 24,
  },
  mainContent: {
    width: '100%',
    position: 'relative',
  },
  line: {
    width: '100%',
    height: 2,
    backgroundColor: '#4a4a4a',
    position: 'absolute',
    left: 0,
    top: 11,
  },
  input: {
    color: 'transparent',
    border: 0,
    width: '100%',
    outline: 'none',
    caretColor: 'transparent',
    resize: 'none',
    padding: 0,
    backgroundColor: 'transparent',
    height: 24,
  },
};

function Line({
  content,
  id,
  focus,
  firstLoaded,
}: {
  content: string,
  id: string,
  focus: boolean,
  firstLoaded: boolean,
}) {
  const dispatch = useContext(DispatchContext);
  const textarea = useRef();

  useEffect(() => {
    const { current } = textarea;

    if (current && firstLoaded) {
      current.focus();
    }

    dispatch({
      type: Actions.LOADED,
      id,
    });
  }, [textarea, id, firstLoaded, dispatch]);

  return (
    <div style={focus ? styles.focusWrapper : styles.wrapper}>
      <div style={styles.mainContent}>
        <textarea
          ref={textarea}
          onFocus={() => dispatch({
            type: Actions.FOCUS,
            id,
          })}
          onKeyDown={({ which }) => {
            switch (which) {
              case 13:
                dispatch({
                  type: Actions.NEW_LINE,
                  at: id,
                });

                break;

              case 8:
                dispatch({
                  type: Actions.REMOVE_BLOCK,
                  id,
                });

                break;

              default:
                break;
            }
          }}
          onInput={(e) => { e.preventDefault(); }}
          value={content}
          onChange={(e) => { e.preventDefault(); }}
          className="Artibox-input"
          placeholder=""
          style={styles.input} />
        <div style={styles.line} />
      </div>
    </div>
  );
}

export default Line;
