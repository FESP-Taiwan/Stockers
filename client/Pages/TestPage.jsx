// @flow
/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { reduxForm } from 'redux-form';
import { FORM_STRATEGY_HEADER } from '../Constant/form';
import ModuleBtn from '../Elements/InvestStrategy/ModuleBtn';
import edditIcon from '../static/images/icon-edit.png';

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
    fontSize: 19,
  },
  edditModules: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    width: 190,
    borderRadius: 40,
    backgroundColor: Colors.LAYER_FIRST,
    transition: '0.5s ease-out',
    fontSize: 13,
  },
  btn: css`
    height: 80px;
    width: 132px;
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
  circleBtn: css`
    height: 80px;
    width: 80px;
    border-radius: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${Colors.LAYER_FIRST};
    color: #FFF;
    font-size: 13px;
    margin: 0 20px 0 0;
  `,
};

const mockModules = [{
  id: 1,
  name: 'A',
}, {
  id: 2,
  name: 'B',
}];

function TestPage() {
  return (
    <div css={styles.wrapper}>
      <button
        onClick={() => console.log('buy')}
        type="button"
        css={styles.circleBtn}>
        <span css={styles.title}>買</span>
      </button>
      {mockModules.map(module => (<ModuleBtn key={module.id} module={module} />))}
      <span css={styles.line} />
      <button
        onClick={() => console.log('add modules')}
        type="button"
        css={styles.edditModules}>
        <img src={edditIcon} css={styles.icon} alt="eddit" />
        <span>編輯計算模型</span>
      </button>
    </div>
  );
}

const reduxHook = reduxForm({
  form: FORM_STRATEGY_HEADER,
});

export default reduxHook(TestPage);
