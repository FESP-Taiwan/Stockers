// @flow
/** @jsx jsx */

import {
  Fragment,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import { jsx, css } from '@emotion/core';
import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import ModuleBtn from './ModuleBtn';
import { FORM_STRATEGY_HEADER } from '../../Constant/form';
import { HeaderBlockAllValuesContext } from '../../Constant/context';
import strategyIcon from '../../static/images/icon-strategy.png';
import addIcon from '../../static/images/icon-white-add.png';

const selector = formValueSelector(FORM_STRATEGY_HEADER);

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
    display: 'flex',
    height: 80,
    width: 360,
    borderRadius: 40,
    backgroundColor: Colors.LAYER_FIRST,
    transition: '0.5s ease-out',
    fontSize: 13,
    margin: '0 16px 0 0',
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
  `,
};

function HeaderBlock({
  modulesInfo,
}: {
  modulesInfo: Array,
}) {
  const [actived, active] = useState(false);
  const [allvalues, setallvalues] = useState([]);

  const { stockId } = useParams();

  const onClick = useCallback(() => active(!actived), [actived]);

  useEffect(() => {
    if (modulesInfo.length) {
      const initValues = modulesInfo.map(el => el.usingStock
        .find(use => use.companyNumber === parseInt(stockId, 10)).rate);

      setallvalues(initValues);
    }
  }, [modulesInfo, stockId]);

  const modulesInUsed = useMemo(() => modulesInfo.filter(
    module => module.usingStock.some(use => use.companyNumber === parseInt(stockId, 10))
  ), [modulesInfo, stockId]);

  const modulesBtns = useMemo(() => {
    if (!modulesInUsed) return null;

    const modulesList = [];

    modulesInUsed.forEach((module) => {
      modulesList.push(
        <ModuleBtn
          name={module.name}
          subName={module.subName}
          id={module.id}
          actived={actived} />
      );
    });

    return (
      <Fragment>
        {modulesList}
      </Fragment>
    );
  }, [modulesInUsed, actived]);

  console.log('allvalues', allvalues);

  console.log('modulesInfo', modulesInfo);

  return (
    <HeaderBlockAllValuesContext.Provider value={[allvalues, setallvalues]}>
      <form css={styles.wrapper}>
        <div css={styles.modules}>
          <span css={styles.title}>買</span>
          <button
            onClick={onClick}
            type="button"
            css={styles.btn}>
            <img src={strategyIcon} css={[styles.icon, css`margin: 0 20px 0 0;`]} alt="strategy" />
            <span>{actived ? '完成調整' : '調整比重'}</span>
          </button>
          <button
            onClick={onClick}
            type="button"
            css={[styles.btn, css`background-color: #464646;`]}>
            測試績效
          </button>
        </div>
        {modulesBtns}
        <span css={styles.line} />
        <button
          onClick={() => console.log('add modules')}
          type="button"
          css={styles.circleBtn}>
          <img src={addIcon} css={styles.icon} alt="Add" />
        </button>
      </form>
    </HeaderBlockAllValuesContext.Provider>
  );
}

const formHook = reduxForm({
  form: FORM_STRATEGY_HEADER,
});

const reduxHook = connect(
  state => ({
    modulesInfo: state.InvestStrategy.userModulesInfo || [],
  })
);

export default reduxHook(formHook(HeaderBlock));
