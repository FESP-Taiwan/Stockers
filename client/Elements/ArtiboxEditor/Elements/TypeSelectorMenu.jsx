// @flow

import React, {
  useMemo,
} from 'react';
import Icons from '../../../Constant/ArtiboxEditor/icons';

const styles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100%',
    flexGrow: 1,
    backgroundColor: 'transparent',
  },
  btn: {
    height: 40,
    width: 40,
    margin: '0 9px',
    borderRadius: 50,
  },
};

type Props = {
  curFocusId: string,
  curFocusType: symbol,
};

function TypeSelectorMenu({
  curFocusId,
  curFocusType,
}: Props) {
  const wrapperStyles = useMemo(() => ({
    ...styles.wrapper,
    ...(curFocusId ? {} : { opacity: 0.4 }),
  }), [curFocusId]);

  return (
    <div style={wrapperStyles}>
      <button
        style={styles.btn}
        type="button">
        <Icons.TITLE />
      </button>
      <button
        style={styles.btn}
        type="button">
        <Icons.SUBTITLE />
      </button>
      <button
        style={styles.btn}
        type="button">
        <Icons.LINE />
      </button>
      <button
        style={styles.btn}
        type="button">
        <Icons.QUOTE />
      </button>
    </div>
  );
}

export default TypeSelectorMenu;
