// @flow
/** @jsx jsx */

import { useState, useMemo, useCallback } from 'react';
import { jsx, css } from '@emotion/core';
import { reduxForm, Field } from 'redux-form';
import ModuleBtn from './ModuleBtn';
import { FORM_STRATEGY_HEADER } from '../../Constant/form';
import strategyIcon from '../../static/images/icon-strategy.png';

const styles = {
  wrapper: {
    display: 'flex',
    width: '100%',
  },
  title: {
    width: 80,
    height: 80,
    textAlign: 'center',
    lineHeight: '80px',
    color: Colors.PRIMARY,
    margin: '0 20px 0 0',
  },
  modules: {
    position: 'relative',
    alignItems: 'center',
    height: 80,
    width: 164,
    borderRadius: 40,
    backgroundColor: Colors.LAYER_FIRST,
    transition: '0.5s ease-out',
    fontSize: 13,
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
  line: {
    width: 1,
    height: 80,
    backgroundColor: '#707070',
    margin: '0 20px',
  },
  modulesActived: {
    height: 360,
  },
  icon: {
    height: 24,
    width: 24,
    margin: '0 20px 0 0',
  },
  finishBtn: css`
    opacity: 0;
    bottom: 0;
    background-color: #444444;
  `,
  actived: css`
    opacity: 1;
    transition: opacity 0.5s 1s;
  `,
};

const mockModules = [{
  id: 1,
  name: 'A',
}, {
  id: 2,
  name: 'B',
}];

function HeaderBlock() {
  const [actived, active] = useState(false);

  const onClick = useCallback(() => active(!actived), [actived]);
  const modulesStyle = useMemo(() => ({
    ...styles.modules,
    ...(actived ? styles.modulesActived : {}),
  }), [actived]);

  return (
    <div css={styles.wrapper}>
      <span css={styles.title}>買</span>
      {mockModules.map(module => (<ModuleBtn module={module} actived={actived} />))}
      <div css={modulesStyle}>
        <button
          onClick={onClick}
          type="button"
          css={[styles.btn, css`top: 0; z-index: 10;`]}>
          <img src={strategyIcon} css={styles.icon} alt="strategy" />
          <span>調整比重</span>
        </button>
        <span css={[styles.btn, styles.finishBtn, actived && styles.actived]}>完成</span>
      </div>
      <span css={styles.line} />
      <button
        onClick={() => console.log('add modules')}
        type="button"
        css={styles.modules}>
        新增計算模型
      </button>
    </div>
  );
}

const reduxHook = reduxForm({
  form: FORM_STRATEGY_HEADER,
});

export default reduxHook(HeaderBlock);
