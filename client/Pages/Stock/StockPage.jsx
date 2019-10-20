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
import StockStrategyHeader from './StockStrategyHeader';
import StockTable from './StockTable';
import { incomeStatements } from '../../Mocks/Queries/stocks';

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
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    border-radius: 40px;
    background-color: ${Colors.LAYER_FIRST};
    margin: 0 0 30px 0;
  `,
  blockWrapper: css`
    display: flex;
    flex-direction: column;
    margin: 10px 0;
  `,
  block: css`
    width: 135px;
    height: 100px;
    border: solid 1px;
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  word: css`
    font-size: 16px;
    font-weight: 500;
  `,
  tableBtn: css`
    width: 80px;
    height: 50px;
    border-radius: 20px;
    background-color: ${Colors.LAYER_SECOND};
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

const stocks = [{
  id: 1,
  year: 2019,
  value: 1000,
}, {
  id: 2,
  year: 2018,
  value: 1000,
}, {
  id: 3,
  year: 2017,
  value: 1000,
}, {
  id: 4,
  year: 2016,
  value: 1000,
}, {
  id: 5,
  year: 2015,
  value: 1000,
}];

const TABLE_TYPES = {
  INCOME_STATEMENT: 'INCOME_STATEMENT',
  BALANCE_SHEET: 'BALANCE_SHEET',
  CASH_FLOW: 'CASH_FLOW',
  DIVIDEND: 'DIVIDEND',
};

function StockPage() {
  const [table, setTable] = useState('INCOME_STATEMENT');

  const infoTable = useMemo(() => {
    switch (table) {
      case 'INCOME_STATEMENT':
        return (
          // 21x4
          <div css={styles.tableWrapper}>
            <div css={styles.blockWrapper}>
              <div css={styles.block}>
                <button
                  onClick={() => { console.log('換季'); }}
                  css={styles.tableBtn}
                  type="button">
                  年
                </button>
              </div>
              {stocks.map(stock => (
                <div
                  key={stock.id}
                  css={styles.block}>
                  <span css={styles.word}>
                    {stock.year}
                  </span>
                </div>
              ))}
            </div>
            {incomeStatements.map(incomeStatement => (
              <div css={styles.blockWrapper}>
                <div
                  key={incomeStatement.id}
                  css={styles.block}>
                  {incomeStatement.name}
                </div>
                {stocks.map(stock => (
                  <div
                    key={stock.id}
                    css={styles.block}>
                    <span css={styles.word}>
                      {stock.value}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        );

      case 'BALANCE_SHEET':
        return (
          // 11x1
          <div css={styles.tableWrapper}>
            <div css={styles.blockWrapper}>
              <div css={styles.block}>
                <button
                  onClick={() => { console.log('換季'); }}
                  css={styles.tableBtn}
                  type="button">
                  比例/值
                </button>
              </div>
              {stocks.map(stock => (
                <div
                  key={stock.id}
                  css={styles.block}>
                  <span css={styles.word}>
                    {stock.year}
                  </span>
                </div>
              ))}
            </div>
            <div css={styles.blockWrapper}>
              <div css={styles.block}>
                  現金及約當現金
              </div>
              {stocks.map(stock => (
                <div
                  key={stock.id}
                  css={styles.block}>
                  <span css={styles.word}>
                    {stock.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'CASH_FLOW':
        return (
          // 9x1
          <div css={styles.tableWrapper}>
            <div css={styles.blockWrapper}>
              <div css={styles.block}>
                <button
                  onClick={() => { console.log('換季'); }}
                  css={styles.tableBtn}
                  type="button">
                  年/季
                </button>
              </div>
              {stocks.map(stock => (
                <div
                  key={stock.id}
                  css={styles.block}>
                  <span css={styles.word}>
                    {stock.year}
                  </span>
                </div>
              ))}
            </div>
            <div css={styles.blockWrapper}>
              <div css={styles.block}>
                  平均股本
              </div>
              {stocks.map(stock => (
                <div
                  key={stock.id}
                  css={styles.block}>
                  <span css={styles.word}>
                    {stock.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'DIVIDEND':
        return (
          // 9x1
          <div css={styles.tableWrapper}>
            <div css={styles.blockWrapper}>
              <div css={styles.block}>
                <button
                  onClick={() => { console.log('換季'); }}
                  css={styles.tableBtn}
                  type="button">
                  年度／季度
                </button>
              </div>
              {stocks.map(stock => (
                <div
                  key={stock.id}
                  css={styles.block}>
                  <span css={styles.word}>
                    {stock.year}
                  </span>
                </div>
              ))}
            </div>
            <div css={styles.blockWrapper}>
              <div css={styles.block}>
                  董事會日期
              </div>
              {stocks.map(stock => (
                <div
                  key={stock.id}
                  css={styles.block}>
                  <span css={styles.word}>
                    {stock.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  }, [table]);

  return (
    <div css={styles.wrapper}>
      <StockStrategyHeader />
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
