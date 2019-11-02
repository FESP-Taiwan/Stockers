// @flow
/** @jsx jsx */

import { useState } from 'react';
import { jsx } from '@emotion/core';
import StockSimulationModal from '../../Elements/StockSimulation/StockSimulationModal';
import StockSimulationMainBlock from '../../Elements/StockSimulation/StockSimulationMainBlock';

const styles = {
  btn: {
    width: 132,
    height: 80,
    borderRadius: 40,
    color: '#FFF',
    fontSize: 13,
    lineHeight: '80px',
    backgroundColor: Colors.PRIMARY,
  },
};

function StockSimulationPage() {
  const [shownModal, showModal] = useState(false);

  return (
    <div>
      <button
        css={styles.btn}
        onClick={() => showModal(true)}
        type="button">
        測試績效
      </button>
      {shownModal ? <StockSimulationModal close={() => showModal(false)} /> : null}
      <StockSimulationMainBlock />
    </div>
  );
}

export default StockSimulationPage;
