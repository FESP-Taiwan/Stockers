// @flow
/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { useParams } from 'react-router-dom';
import { FORM_STOCK_SIMULATION } from '../../Constant/form';
import Modal from '../Modal/Modal';
import TextInput from '../../Form/TextInput';
import Selector from '../../Form/Selector';
import stimulationCalculate from '../../helper/stimulation';

const FieldWrapper = styled.div`
  margin: 12px 0;
`;

const styles = {
  wrapper: {
    width: '100%',
  },
  block: css`
    width: 306px;
    height: 32px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 13px;
    padding: 20px;
    background-color: #262626;
  `,
  label: {
    fontSize: 13,
    margin: '16px 0',
    display: 'block',
  },
  submit: {
    margin: '36px auto 0',
    fontSize: 13,
    display: 'block',
  },
};

const mockData = [{
  id: '2018-03',
  name: '2018-03',
}, {
  id: '2018-06',
  name: '2018-06',
}, {
  id: '2018-09',
  name: '2018-09',
}, {
  id: '2018-12',
  name: '2018-12',
}, {
  id: '2019-03',
  name: '2019-03',
}, {
  id: '2019-06',
  name: '2019-06',
}];

type Props = {
  close: Function,
  stockData: {},
  modulesInfo: Array,
}

async function submit(d, stockId, stockData, modulesInfo) {
  const datePeriod = {
    startFrom: d.from,
    endAt: d.to,
  };

  const stimulationData = stimulationCalculate(stockId, datePeriod, modulesInfo, stockData, d.principle);

  console.log('stimulationData', stimulationData);

  const data = await fetch('http://3.219.220.166:3001/compute', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(stimulationData),
  }).then(res => res.json());

  if (data) {
    console.log('data', data);
  }
}

function StockSimulationModal({
  handleSubmit,
  close,
  stockData,
  modulesInfo,
}: Props) {
  const { stockId } = useParams();

  return (
    <Modal onClose={close}>
      <form onSubmit={handleSubmit(d => submit(d, stockId, stockData, modulesInfo))} css={styles.wrapper}>
        <h2>測試績效</h2>
        <FieldWrapper>
          <Field
            inputStyle
            errorInner
            fillHeight
            label="起始時間"
            name="from"
            options={mockData}
            component={Selector} />
        </FieldWrapper>
        <FieldWrapper>
          <Field
            inputStyle
            errorInner
            fillHeight
            label="結束時間"
            name="to"
            options={mockData}
            component={Selector} />
        </FieldWrapper>
        <FieldWrapper>
          <span css={styles.label}>請輸入本金</span>
          <div css={styles.block}>
            <Field
              placeholder="請輸入本金"
              name="principle"
              component={TextInput} />
          </div>
        </FieldWrapper>
        <button
          type="submit"
          css={styles.submit}>
          確認
        </button>
      </form>
    </Modal>
  );
}

const reduxHook = connect(
  state => ({
    stockData: state.Stocks.stockData,
    modulesInfo: state.InvestStrategy.userModulesInfo || [],
  }),
);

const formHook = reduxForm({
  form: FORM_STOCK_SIMULATION,
});

export default reduxHook(formHook(StockSimulationModal));
