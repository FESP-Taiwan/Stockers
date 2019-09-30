// @flow
/** @jsx jsx */

import { useMemo } from 'react';
import { jsx } from '@emotion/core';
import type { FieldProps } from 'redux-form';

const styles = {
  wrapper: {
    opacity: 0,
    position: 'absolute',
    bottom: 107,
    left: -107,
    transform: 'rotate(-90deg)',
    transition: 'opacity 0.5s',
  },
  actived: {
    opacity: 1,
    transition: 'opacity 0.5s 1s',
  },
  percentText: {
    position: 'absolute',
    transform: 'rotate(90deg)',
    left: 25,
    bottom: 30,
    color: '#FFF',
    zIndex: 1000,
  },
  rangeSlider: {
    position: 'absolute',
    top: 0,
    height: 80,
    width: 300,
    borderRadius: 40,
    pointerEvents: 'none',
    overflow: 'hidden',
  },
};

function RangeSlider({
  actived,
  input: {
    onChange,
    value,
  },
  className,
}: FieldProps & {
  actived: boolean,
  className: string,
}) {
  const rangeSliderValue = useMemo(() => ({
    position: 'absolute',
    height: 80,
    width: (300 * value) / 100,
    backgroundColor: '#FF9500',
  }), [value]);

  return (
    <div css={[styles.wrapper, actived && styles.actived]}>
      <input
        className={className}
        type="range"
        value={value ?? 0}
        min="0"
        max="100"
        step="1"
        onChange={({
          target,
        }) => onChange(Number(target.value))} />
      <span css={styles.percentText}>{value ? `${value}%` : '0%'}</span>
      <div css={styles.rangeSlider}>
        <span css={rangeSliderValue} />
      </div>
    </div>
  );
}

export default RangeSlider;
