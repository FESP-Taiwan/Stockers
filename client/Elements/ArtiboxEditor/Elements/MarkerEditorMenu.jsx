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
    position: 'absolute',
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

  // useEffect(() => {
  //   if (!input) return () => {};
  //
  //   function onSelectHandler() {
  //     const {
  //       selectionStart,
  //       selectionEnd,
  //     } = input;
  //
  //     if (selectionStart !== selectionEnd) {
  //       // setShown(true);
  //     }
  //   }
  //
  //   input.addEventListener('select', onSelectHandler, false);
  //
  //   return () => {
  //     input.removeEventListener('select', onSelectHandler, false);
  //   };
  // }, [input]);

  if (!isShown) return null;

  return (
    <div style={styles.wrapper}>
      <button
        type="button">
        <Icons.HIGHLIGHT />
      </button>
      <button
        type="button">
        <Icons.BOLD />
      </button>
      <button
        type="button">
        <Icons.ITALIC />
      </button>
      <button
        type="button">
        <Icons.ERASE />
      </button>
    </div>
  );
}

export default MarkerEditorMenu;
