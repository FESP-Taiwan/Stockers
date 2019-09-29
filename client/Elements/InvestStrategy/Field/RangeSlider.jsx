// @flow

import React from 'react';
import type { FieldProps } from 'redux-form';

const styles = {
  wrapper: {
    position: 'absolute',
    bottom: 107,
    left: -107,
    transform: 'rotate(-90deg)',
  },
  percent: {
    position: 'absolute',
    transform: 'rotate(90deg)',
    left: 25,
    bottom: 30,
  },
};

function RangeSlider({
  input: {
    onChange,
    value,
  },
  className,
}: FieldProps & {
  className: string,
}) {
  console.log('value', value);

  return (
    <div style={styles.wrapper}>
      <input
        className={className}
        type="range"
        value={value || 0}
        min="0"
        max="100"
        step="1"
        onChange={onChange} />
      <span style={styles.percent}>{`${value}%`}</span>
    </div>
  );
}

export default RangeSlider;
