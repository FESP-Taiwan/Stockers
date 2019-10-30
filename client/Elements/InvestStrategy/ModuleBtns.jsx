// @flow
/** @jsx jsx */

import { useState, useCallback, useMemo, useEffect } from 'react';
import { jsx, css } from '@emotion/core';
import { connect } from 'react-redux';
import { Field, change, formValueSelector } from 'redux-form';
import closeIcon from '../../static/images/close-icon.png';
import RangeSlider from './Field/RangeSlider';
import { FORM_STRATEGY_HEADER } from '../../Constant/form';

const styles = {
  modules: {
    position: 'relative',
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: Colors.LAYER_FIRST,
    transition: '0.5s ease-out',
    margin: '0 20px 0 0',
  },
  btn: css`
    position: absolute;
    height: 80px;
    width: 100%;
    border-radius: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${Colors.LAYER_FIRST};
    color: #FFF;
    font-size: 13px;
  `,
  btnSelected: css`
    background-color: #004d2d;
    color: ${Colors.PRIMARY};
  `,
  btnActived: {
    height: 360,
  },
  closeBtn: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFF',
    position: 'absolute',
    right: 0,
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 14,
    height: 14,
    zIndex: 1000,
  },
};

type Props = {
  actived: boolean,
  module: Object,
  name: string,
  changeValue: Function,
}

function ModuleBtns({
  actived,
  modules,
  changeFirstValue,
  changeNextValue,
  firstValue,
  value,
  nextValue,
  fields,
}: Props) {
  const [selected, select] = useState(false);

  console.log('fields', fields.getAll());

  // console.log('values', values)


  // useEffect(() => {
  //   if (id !== 1 && value + firstValue > 100) {
  //     console.log('3', value)
  //     changeFirstValue(firstValue - (value + firstValue - 100));
  //   }
  // }, [firstValue, id, value, changeFirstValue]);

  // useEffect(() => {
  //   if (id === 1 && nextValue === 'noValue') {
  //     changeFirstValue(100);
  //   }

  //   if (id === 1 && nextValue !== 'noValue') {
  //     if (value + nextValue < 100) {
  //       console.log('2')
  //       changeNextValue(100 - firstValue);
  //     }

  //     if (value + nextValue > 100) {
  //       console.log("----", nextValue - (value + nextValue - 100));
  //       changeNextValue(nextValue - (value + nextValue - 100));
  //     }
  //   }
  // }, [id, firstValue, value, changeFirstValue, changeNextValue, nextValue]);

  const onClick = useCallback(() => select(!selected), [selected]);
  const modulesStyle = useMemo(() => ({
    ...styles.modules,
    ...(actived ? styles.btnActived : {}),
  }), [actived]);

  const btnStyle = useMemo(() => ([
    styles.btn,
    (selected ? styles.btnSelected : {}),
  ]), [selected]);

  const modulesBtns = useMemo(() => modules.map(({ id, name }) => (
    <div css={modulesStyle} key={id}>
      <button
        css={styles.closeBtn}
        type="button"
        onClick={() => console.log('click')}>
        <img src={closeIcon} alt="close" css={styles.icon} />
      </button>
      <button
        type="button"
        onClick={onClick}
        css={btnStyle}>
        {name}
      </button>
      <Field actived={actived} name={`modules.${id - 1}`} component={RangeSlider} />
    </div>
  )), [modules, modulesStyle, onClick, btnStyle, actived]);

  return modulesBtns;
}

// const reduxHook = connect(
//   (state, { module: { id } }) => ({
//     firstValue: formValueSelector(FORM_STRATEGY_HEADER)(state, 'range-slider-1'),
//     value: formValueSelector(FORM_STRATEGY_HEADER)(state, `range-slider-${id}`),
//     nextValue: formValueSelector(FORM_STRATEGY_HEADER)(state, `range-slider-${id + 1}`) ?? 'noValue',
//   }),
//   (dispatch, { module: { id } }) => ({
//     changeFirstValue: newValue => dispatch(change(FORM_STRATEGY_HEADER, 'range-slider-1', newValue)),
//     changeNextValue: newValue => dispatch(change(FORM_STRATEGY_HEADER, `range-slider-${id + 1}`, newValue)),
//   }),
// );

export default ModuleBtns;
