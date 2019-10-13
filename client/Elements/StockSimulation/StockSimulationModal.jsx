// @flow
/** @jsx jsx */

import React from 'react';
import { jsx } from '@emotion/core';
import { Field, reduxForm } from 'redux-form';
import { FORM_STOCK_SIMULATION } from '../../Constant/form';
import Modal from '../Modal/Modal';
import TextInput from '../../Form/TextInput';
import Selector from '../../Form/Selector';

const styles = {
  wrapper: {
    width: '100%',
  },
};

const mockData = [{
  id: 1,
  name: '2019-Q1',
}, {
  id: 2,
  name: '2019-Q2',
}];

function StockSimulationModal() {
  return (
    <Modal>
      <div css={styles.wrapper}>
        <Field
          title="起始時間"
          name="from"
          options={mockData}
          component={Selector} />
        <Field
          title="結束時間"
          name="to"
          options={mockData}
          component={Selector} />
        <Field
          label="初期本金"
          name="principle"
          component={TextInput} />
      </div>
    </Modal>
  );
}

const reduxHook = reduxForm({
  form: FORM_STOCK_SIMULATION,
});

export default reduxHook(StockSimulationModal);
