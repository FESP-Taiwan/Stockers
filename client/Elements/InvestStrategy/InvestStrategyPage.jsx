// @flow

import React, {
  useCallback,
} from 'react';
import { Route, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import HeaderBlock from './HeaderBlock';
import InvestStrategyMainBlock from './InvestStrategyMainBlock';
import stimulationCalculate from '../../helper/stimulation';

const styles = {
  wrapper: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '100%',
    height: '100%',
  },
  headerBlock: {
    width: '100%',
    flexBasis: 100,
    flexShrink: 0,
    backgroundColor: Colors.LAYER_SECOND,
  },
  btn: {
    position: 'absolute',
    width: 100,
    height: 40,
    top: 20,
    right: 20,
    fontSize: 14,
    backgroundColor: Colors.PRIMARY,
  },
};

function InvestStrategyPage({
  modulesInfo,
  stockData,
}: {
  modulesInfo: Array,
  stockData: {},
}) {
  const { stockId } = useParams();

  const onClick = useCallback(() => {
    const datePeriod = {
      startFrom: '2018-06',
      endAt: '2019-06',
    };

    const stimulationData = stimulationCalculate(stockId, datePeriod, modulesInfo, stockData);

    console.log('stimulationData', stimulationData);
  }, [modulesInfo, stockData, stockId]);

  return (
    <div style={styles.wrapper}>
      <button
        style={styles.btn}
        onClick={onClick}
        type="button">
        模擬倉
      </button>
      <HeaderBlock />
      <Route path="/industry/:industryId/stocks/:stockId/modules/:moduleId" component={InvestStrategyMainBlock} />
    </div>
  );
}

const reduxHook = connect(
  state => ({
    modulesInfo: state.InvestStrategy.userModulesInfo || [],
    stockData: state.Stocks.stockData,
  }),
);

export default reduxHook(InvestStrategyPage);
