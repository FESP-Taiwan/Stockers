// @flow
/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import { Field, reduxForm } from 'redux-form';
import { FORM_STOCK_SIMULATION } from '../../Constant/form';
import Modal from '../Modal/Modal';
import TextInput from '../../Form/TextInput';
import Selector from '../../Form/Selector';

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
  id: 1,
  name: '2019-Q1',
}, {
  id: 2,
  name: '2019-Q2',
}];

function StockSimulationModal() {
  return (
    <Modal>
      <form css={styles.wrapper}>
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

const reduxHook = reduxForm({
  form: FORM_STOCK_SIMULATION,
});

export default reduxHook(StockSimulationModal);
