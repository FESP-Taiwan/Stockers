// @flow
/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { useCallback } from 'react';

const styles = {
  btn: css`
    width: 320px;
    height: 32px;
    padding: 0;
    line-height: 32px;
    text-align: left;
    font-size: 13px;
    transition: 0.3s;
    margin: 0 30px 10px 0;
    &:hover {
      background-color: ${Colors.LAYER_THIRD};
    }
  `,
  btnUsing: {
    position: 'relative',
    width: 320,
    height: 32,
    padding: 0,
    lineHeight: '32px',
    textAlign: 'left',
    fontSize: 13,
    margin: '0 30px 10px 0',
    backgroundColor: Colors.LAYER_THIRD,
  },
  index: {
    position: 'absolute',
    width: 16,
    height: 16,
    color: '#FFF',
    backgroundColor: Colors.PRIMARY,
    lineHeight: '16px',
    textAlign: 'center',
    top: -8,
    right: -8,
    borderRadius: 50,
  },
};

type Props = {
  id: number,
  name: string,
  usingIndex: number,
}

function ChipHeaderUpdateBlockButton({
  id,
  name,
  usingIndex,
}: Props) {
  const onClick = useCallback(() => {
    console.log('ONCLICK ACTIONED');
  }, []);

  if (~usingIndex) {
    return (
      <button
        onClick={onClick}
        css={styles.btnUsing}
        type="button">
        {name}
        <div style={styles.index}>
          {usingIndex + 1}
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      css={styles.btn}
      type="button">
      {name}
    </button>
  );
}

export default ChipHeaderUpdateBlockButton;
