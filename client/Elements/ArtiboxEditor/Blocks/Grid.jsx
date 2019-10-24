// @flow

import React, {
  useMemo,
} from 'react';

const styles = {
  wrapper: {
    width: '100%',
    borderLeft: '2px solid transparent',
    padding: '0 12px',
    height: 30,
  },
  focusWrapper: {
    width: '100%',
    borderLeft: `2px solid ${Colors.PRIMARY}`,
    padding: '0 12px',
    height: 30,
  },
};

type Props = {
  type: symbol,
  focus: boolean,
  meta: Object,
  id: string,
}

function Grid({
  type,
  content,
  focus,
  meta,
  id,
}: Props) {
  const wrapperStyles = useMemo(() => ({
    ...(focus ? styles.focusWrapper : styles.wrapper),
  }), [focus]);

  return (
    <div style={wrapperStyles}>

    </div>
  );
}

export default Grid;
