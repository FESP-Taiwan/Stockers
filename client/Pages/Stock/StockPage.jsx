// @flow
/** @jsx jsx */

import {
  useState,
  useMemo,
} from 'react';
import { jsx, css } from '@emotion/core';
import {
  LineChart, Line,
} from 'recharts';
import { flex } from '../../Constant/emotion';
import StockStrategyPage from './StockStrategyPage';

const styles = {
  wrapper: css`
    width: 100%;
    height: 100%;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  sharesWrapper: css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  `,
  sharesTitle: css`
    font-size: 18px;
    font-weight: 500;
    margin: 20px 0;
  `,
  lineChartWrapper: css`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    height: 225px;
    border-radius: 40px;
    background-color: ${Colors.LAYER_FIRST};
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  infoTableWrapper: css`
    width: 100%;
    max-width: 1200px;
    height: 100%;
    margin: 20px auto 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  `,
  btnWrapper: css`
    ${flex}
    flex-direction: row;
    justify-content: flex-start;
    margin: 0 0 20px 0;
  `,
  btn: css`
    width: 150px;
    height: 100px;
    margin: 0 10px 0 0;
  `,
  btnActive: css`
    width: 150px;
    height: 100px;
    margin: 0 10px 0 0;
    border-radius: 40px;
    background-color: ${Colors.LAYER_FIRST};
  `,
  title: css`
    font-size: 18px;
    font-weight: 500;
  `,
  tableWrapper: css`
    width: 100%;
    max-width: 1200px;
    height: 100%;
    display:
  `,
};

const data = [
  {
    name: 'Page A', share: 400,
  },
  {
    name: 'Page B', share: 200,
  },
  {
    name: 'Page C', share: 1000,
  },
  {
    name: 'Page A', share: 400,
  },
  {
    name: 'Page B', share: 800,
  },
];

const TABLE_TYPES = {
  INCOME_STATEMENT: 'INCOME_STATEMENT',
  BALANCE_SHEET: 'BALANCE_SHEET',
  CASH_FLOW: 'CASH_FLOW',
  DIVIDEND: 'DIVIDEND',
};

function StockPage() {
  const [table, setTable] = useState(null);

  console.log('table', table);

  const infoTable = useMemo(() => {
    switch (table) {
      case 'INCOME_STATEMENT':
        return (
          // 21x4
          <div css={styles.incomeTable}>
            INCOME_STATEMENT
          </div>
        );

      case 'BALANCE_SHEET':
        return (
          // 11x1
          <div css={styles.balanceTable}>
            BALANCE_SHEET
          </div>
        );

      case 'CASH_FLOW':
        return (
          // 9x1
          <div css={styles.cashTable}>
            CASH_FLOW
          </div>
        );

      case 'DIVIDEND':
        return (
          // 9x1
          <div css={styles.dividendTable}>
            DIVIDEND
          </div>
        );

      default:
        return null;
    }
  }, [table]);

  return (
    <div css={styles.wrapper}>
      <StockStrategyPage />
      <div css={styles.sharesWrapper}>
        <span css={styles.sharesTitle}>
          股價
        </span>
        <div css={styles.lineChartWrapper}>
          <LineChart width={800} height={180} data={data}>
            <Line type="monotone" dataKey="share" stroke="#8884d8" />
          </LineChart>
        </div>
      </div>
      <div css={styles.infoTableWrapper}>
        <div css={styles.btnWrapper}>
          <button
            onClick={() => setTable(TABLE_TYPES.INCOME_STATEMENT)}
            css={{
              ...styles.btn,
              ...(table === 'INCOME_STATEMENT') ? styles.btnActive : {},
            }}
            type="button">
            <span css={styles.title}>
              損益表
            </span>
          </button>
          <button
            onClick={() => setTable(TABLE_TYPES.BALANCE_SHEET)}
            css={{
              ...styles.btn,
              ...(table === 'BALANCE_SHEET') ? styles.btnActive : {},
            }}
            type="button">
            <span css={styles.title}>
              資產負債表
            </span>
          </button>
          <button
            onClick={() => setTable(TABLE_TYPES.CASH_FLOW)}
            css={{
              ...styles.btn,
              ...(table === 'CASH_FLOW') ? styles.btnActive : {},
            }}
            type="button">
            <span css={styles.title}>
              現金流量表
            </span>
          </button>
          <button
            onClick={() => setTable(TABLE_TYPES.DIVIDEND)}
            css={{
              ...styles.btn,
              ...(table === 'DIVIDEND') ? styles.btnActive : {},
            }}
            type="button">
            <span css={styles.title}>
              配股配息與除權息
            </span>
          </button>
        </div>
        {infoTable}
      </div>
    </div>
  );
}

export default StockPage;
