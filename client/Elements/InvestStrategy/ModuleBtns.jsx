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
  setallvalues: Function,
}

function ModuleBtns({
  actived,
  modules,
  allvalues,
  setallvalues,
}: Props) {
  const [selected, select] = useState(false);

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
      <RangeSlider
        index={id - 1}
        allvalues={allvalues}
        setallvalues={setallvalues}
        actived={actived} />
    </div>
  )), [allvalues, modules, modulesStyle, onClick, btnStyle, actived, setallvalues]);

  return modulesBtns;
}

export default ModuleBtns;
