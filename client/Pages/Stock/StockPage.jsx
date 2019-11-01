// @flow
/** @jsx jsx */

import {
  useState,
  useMemo,
} from 'react';
import {
} from 'react-router-dom';
import { jsx, css } from '@emotion/core';
import { connect } from 'react-redux';
import {
  LineChart, Line,
} from 'recharts';
import StockStrategyHeader from './StockStrategyHeader';
import {
  comprehensiveIncomes, balanceSheets, cashFlows, dividends, dividendYears, months,
} from '../../Constant/stockTable';

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
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
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
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    border-radius: 40px;
    background-color: ${Colors.LAYER_FIRST};
    margin: 0 0 30px 0;
    overflow-y: auto;
    cursor: pointer;
  `,
  blockWrapper: css`
    display: flex;
    flex-direction: column;
    margin: 10px auto;
  `,
  block: css`
    width: 135px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-right: solid 2px ${Colors.LAYER_SECOND};
    border-bottom: solid 2px ${Colors.LAYER_SECOND};
    padding: 10px;
  `,
  dividendBlock: css`
    width: 200px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-right: solid 2px ${Colors.LAYER_SECOND};
    border-bottom: solid 2px ${Colors.LAYER_SECOND};
    padding: 10px;
  `,
  word: css`
    font-size: 16px;
    font-weight: 500;
  `,
  lostWord: css`
    font-size: 16px;
    font-weight: 500;
    opacity: 0.5;
  `,
  tableBtn: css`
    width: 80px;
    height: 50px;
    font-size: 16px;
    border-radius: 20px;
    background-color: ${Colors.LAYER_SECOND};
  `,
  periodTitle: css`
  width: 80px;
  height: 50px;
  font-size: 16px;
  border-radius: 20px;
  background-color: ${Colors.LAYER_SECOND};
  text-align: center;
  line-height: 50px;
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

type Props = {
  stockData: Object,
};

function StockPage({
  stockData,
}: Props) {
  const [table, setTable] = useState('INCOME_STATEMENT');

  const comprehensiveIncomeTableData = useMemo(() => {
    if (!stockData) return null;

    return stockData.comprehensiveIncome?.chipInfos
      .filter(c => comprehensiveIncomes
        .some(comprehensiveIncome => comprehensiveIncome.name === c.chipName));
  }, [stockData]);

  const balanceSheetTableData = useMemo(() => {
    if (!stockData) return null;

    const comparedBalanceSheets = stockData.balanceSheet?.chipInfos
      .filter(c => balanceSheets.some(b => b.compareName === c.chipName));

    return comparedBalanceSheets;
  }, [stockData]);

  const cashFlowTableData = useMemo(() => {
    if (!stockData) return null;

    const comparedCashFlows = stockData.cashFlow?.chipInfos
      .filter(c => cashFlows.some(cash => cash.compareName === c.chipName));

    return comparedCashFlows;
  }, [stockData]);

  const dividendTableData = useMemo(() => {
    if (!stockData) return null;

    return stockData.dividend?.chipInfos
      .filter(c => dividends.some(d => d.compareName === c.chipName));
  }, [stockData]);

  const infoTable = useMemo(() => {
    switch (table) {
      case 'INCOME_STATEMENT':
        return (
          <div css={styles.tableWrapper}>
            <div css={styles.blockWrapper}>
              <div css={styles.block}>
                <button
                  onClick={() => { console.log('換季'); }}
                  css={styles.tableBtn}
                  type="button">
                  2019
                </button>
              </div>
              {months.map(mon => (
                <div
                  key={mon.id}
                  css={styles.block}>
                  <span css={styles.word}>
                    {mon.month}
                  </span>
                </div>
              ))}
            </div>
            {comprehensiveIncomeTableData?.map(comprehensiveIncome => (
              <div
                key={comprehensiveIncome.chipName}
                css={styles.blockWrapper}>
                <div
                  css={styles.block}>
                  {comprehensiveIncome.chipName }
                </div>
                {comprehensiveIncome?.chipData.map((chip) => {
                  if (!chip.value) {
                    return (
                      <div
                        key={chip.date}
                        css={styles.block}>
                        <span css={styles.lostWord}>
                          無
                        </span>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={chip.date}
                      css={styles.block}>
                      <span css={styles.word}>
                        {chip.value}
                      </span>
                    </div>
                  );
                })}
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
                  css={styles.tableBtn}
                  type="button">
                  季
                </button>
              </div>
              {months.map(mon => (
                <div
                  key={mon.id}
                  css={styles.block}>
                  <span css={styles.word}>
                    {mon.month}
                  </span>
                </div>
              ))}
            </div>
            {balanceSheetTableData?.map(balanceSheet => (
              <div
                key={balanceSheet.chipName}
                css={styles.blockWrapper}>
                <div css={styles.block}>
                  {balanceSheet.chipName}
                </div>
                {balanceSheet?.chipData.map((chip) => {
                  if (!chip.value) {
                    return (
                      <div
                        key={chip.date}
                        css={styles.block}>
                        <span css={styles.lostWord}>
                          無
                        </span>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={chip.date}
                      css={styles.block}>
                      <span css={styles.word}>
                        {chip.value}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        );

      case 'CASH_FLOW':
        return (
          // 9x1
          <div css={styles.tableWrapper}>
            <div css={styles.blockWrapper}>
              <div css={styles.block}>
                <button
                  onClick={() => { console.log('換年'); }}
                  css={styles.tableBtn}
                  type="button">
                  季
                </button>
              </div>
              {months.map(mon => (
                <div
                  key={mon.id}
                  css={styles.block}>
                  <span css={styles.word}>
                    {mon.month}
                  </span>
                </div>
              ))}
            </div>
            {cashFlowTableData?.map(cashFlow => (
              <div
                key={cashFlow.chipName}
                css={styles.blockWrapper}>
                <div css={styles.block}>
                  {cashFlow.chipName}
                </div>
                {cashFlow?.chipData.map(chip => (
                  <div
                    key={chip.date}
                    css={styles.block}>
                    <span css={styles.word}>
                      {chip.value}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        );

      case 'DIVIDEND':
        return (
          // 9x1
          <div css={styles.tableWrapper}>
            <div css={styles.blockWrapper}>
              <div css={styles.dividendBlock}>
                <div
                  css={styles.periodTitle}>
                  年
                </div>
              </div>
              {dividendYears.map(dividendYear => (
                <div
                  key={dividendYear.id}
                  css={styles.dividendBlock}>
                  <span css={styles.word}>
                    {dividendYear.year}
                  </span>
                </div>
              ))}
            </div>
            {dividendTableData?.map(dividend => (
              <div
                key={dividend.chipName}
                css={styles.blockWrapper}>
                <div css={styles.dividendBlock}>
                  {dividend.chipName}
                </div>
                {dividend?.chipData.map((chip) => {
                  if (!chip.value) {
                    return (
                      <div
                        key={chip.date}
                        css={styles.dividendBlock}>
                        <span css={styles.lostWord}>
                          無
                        </span>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={chip.date}
                      css={styles.dividendBlock}>
                      <span css={styles.word}>
                        {chip.value}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  }, [
    table,
    comprehensiveIncomeTableData,
    balanceSheetTableData,
    cashFlowTableData,
    dividendTableData,
  ]);

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
              綜合損益表
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

const reduxHook = connect(
  state => ({
    stockData: state.Stocks.stockData,
  }),
);

export default reduxHook(StockPage);
