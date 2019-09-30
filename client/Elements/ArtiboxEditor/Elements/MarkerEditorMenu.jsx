// @flow

import React, {
  useEffect,
  useState,
} from 'react';
import Icons from '../../../Constant/ArtiboxEditor/icons';

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: -30,
    right: 0,
    backgroundColor: Colors.LAYER_FOURTH,
    borderRadius: 40,
    pointerEvents: 'auto',
    padding: '0 7px',
    height: 38,
    border: `solid 1px ${Colors.LAYER_FOURTH}`,
  },
  btn: {
    cursor: 'pointer',
    margin: '0 8px',
  },
};

type Props = {
  textarea: {
    current: ?Node,
  },
  displayer: {
    current: ?Node,
  },
}

function MarkerEditorMenu({
  textarea: {
    current: input,
  },
  displayer: {
    current: display,
  },
}: Props) {
  const [isShown, setShown] = useState(false);

  useEffect(() => {
    if (!input) return () => {};

    function onSelectionChangeHandler() {
      if (document.activeElement !== input) {
        setShown(false);

        return;
      }

      const {
        selectionStart,
        selectionEnd,
      } = input;

      if (selectionStart === selectionEnd) {
        setShown(false);

        return;
      }

      setShown(true);
    }

    document.addEventListener('selectionchange', onSelectionChangeHandler, false);

    return () => {
      document.removeEventListener('selectionchange', onSelectionChangeHandler, false);
    };
  }, [isShown, input]);

  if (!isShown) return null;

  return (
    <div style={styles.wrapper}>
      <button
        style={styles.btn}
        type="button">
        <Icons.HIGHLIGHT />
      </button>
      <button
        style={styles.btn}
        type="button">
        <Icons.BOLD />
      </button>
      <button
        style={styles.btn}
        type="button">
        <Icons.ITALIC />
      </button>
      <button
        style={styles.btn}
        type="button">
        <Icons.ERASE />
      </button>
    </div>
  );
}

export default MarkerEditorMenu;
