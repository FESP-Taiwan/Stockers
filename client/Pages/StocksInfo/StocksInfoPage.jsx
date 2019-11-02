// @flow
/** @jsx jsx */

import {
  useState,
  useMemo,
  useEffect,
} from 'react';
import uniq from 'lodash/uniq';
import { jsx, css } from '@emotion/core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import {
  LineChart, Line, ResponsiveContainer, XAxis, YAxis, Legend,
} from 'recharts';
import { flex } from '../../Constant/emotion';
import FollowingCard from '../../Elements/StocksInfo/FollowingCard';
import IndustryCard from '../../Elements/StocksInfo/IndustryCard';
import { followingStocks } from '../../Mocks/Queries/StockInfo';
import * as IndustryCardActions from '../../actions/IndustryCard';
import { FORM_SITE_HEADER } from '../../Constant/form';
import LoadingSpinner from '../../Elements/LoadingSpinner';
import { industryNames } from '../../Constant/industryName';

const selector = formValueSelector(FORM_SITE_HEADER);

const styles = {
  wrapper: css`
    ${flex}
    overflow-y: auto;
  `,
  following: css`
    ${flex}
    align-items: flex-start;
    justify-content: flex-start;
    flex-grow: 1;
    margin: 0 0 40px 0;
  `,
  industry: css`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    flex-grow: 1;
  `,
  industryCardWrapper: css`
    ${flex}
    flex-direction: row;
    flex-grow: 3;
    flex-wrap: wrap;
  `,
  title: css`
    font-size: 20px;
    font-weight: 500;
    margin: 0 0 18px 10px;
  `,
  cardWrapper: css`
    display: flex;
    width: 100%;
    min-height: 130px;
    flex-direction: row;
    overflow-x: auto;
  `,
  kLine: css`
    ${flex}
    height: 225px;
    border-radius: 40px;
    background-color: ${Colors.LAYER_FIRST};
    padding: 10px;
    margin: 0 0 20px 0;
  `,
};

type Props = {
  searchTerm: string,
  fetchIndustryCardData: Function,
  industryCardData: Array,
};

function StocksInfoPage({
  searchTerm,
  fetchIndustryCardData,
  industryCardData,
}: Props) {
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    let canceled = false;

    async function fetchIndustryData() {
      const resData = await fetch(`${API_HOST}/stocker/industryStickers`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(res => (!canceled ? res.json() : null));

      if (resData) {
        fetchIndustryCardData(resData);
      }
    }

    fetchIndustryData();
    setLoading(false);

    return () => {
      canceled = true;
    };
  }, [fetchIndustryCardData]);

  const filteredIndustryCards = useMemo(() => {
    if (isLoading) return <LoadingSpinner />;

    if (!industryCardData) return null;

    const comparedIndustry = industryCardData?.filter(card => industryNames
      .some(industry => industry.name === card.industry_type));

    if (!searchTerm) return comparedIndustry;

    const filterByName = comparedIndustry.filter(card => card.industry_type.includes(searchTerm));

    const filteredByStock = comparedIndustry.filter(industry => industry.companies
      .map(c => c.stockNo)
      .some(num => num.includes(searchTerm)));

    if (!filterByName.length) {
      return filteredByStock;
    }

    return filterByName;
  }, [searchTerm, industryCardData, isLoading]);

  const industryCard = useMemo(() => {
    if (isLoading) return <LoadingSpinner />;

    if (!industryCardData) return null;

    return (
      <div css={styles.industryCardWrapper}>
        {filteredIndustryCards.map((industry, index) => {
          if (!industry) return null;

          return (
            <IndustryCard
              key={industry.industry_type}
              name={industry.industry_type}
              companies={industry.companies}
              industryId={index} />
          );
        })}
      </div>
    );
  }, [industryCardData, filteredIndustryCards, isLoading]);

  const gainChartData = useMemo(() => {
    if (!industryCardData.length) return null;

    const comparedIndustry = industryCardData?.filter(card => industryNames
      .some(industryName => industryName.name === card.industry_type));

    const gainData = comparedIndustry?.map(industry => industry?.companies
      .map(company => company.gain_diff.map(g => g.gain * 10000)));

    const eachIndustryAvg = gainData.map(gain => gain.reduce((accum, curr, index) => {
      if (index === 0) return accum;

      return accum.map((a, i) => a + gain[index][i]);
    }), []);

    const amountAvg = eachIndustryAvg.reduce((each, next, index) => {
      if (index === 0) return next;

      return each.map((e, i) => e + eachIndustryAvg[index][i]);
    });

    return [{
      月份: 9,
      大盤指數: amountAvg[0],
    }, {
      月份: 10,
      大盤指數: amountAvg[1],
    }, {
      月份: 11,
      大盤指數: amountAvg[2],
    }];
  }, [industryCardData]);

  if (isLoading) return <LoadingSpinner />;

  const filteredData = followingStocks.userModulesUpdated
    .map(u => u.usingStock.map(c => ({
      module: {
        id: u.moduleId,
        name: u.name,
        content: u.mathModule.content,
      },
      companyId: c.companyNumber,
    }))).flat();

  const companyIds = uniq(
    followingStocks.userModulesUpdated
      .map(u => u.usingStock.map(c => c.companyNumber))
      .flat()
  );

  const companyData = companyIds.map(companyId => ({
    companyId,
    modules: filteredData.reduce((accum, curr) => {
      if (curr.companyId === companyId) return [...accum, curr.module];

      return accum;
    }, []),
  }));

  return (
    <div css={styles.wrapper}>
      {localStorage.getItem('token') ? (
        <div css={styles.following}>
          <h3 css={styles.title}>
            已追蹤
          </h3>
          <div css={styles.cardWrapper}>
            {companyData.map(stock => (
              <FollowingCard
                key={stock.companyId}
                id={stock.companyId}
                name={stock.companyId}
                number={stock.companyId}
                modules={stock.modules} />
            ))}
          </div>
        </div>
      ) : null}
      <div css={styles.industry}>
        <h3 css={styles.title}>
          大盤產業
        </h3>
        <div css={styles.kLine}>
          <ResponsiveContainer>
            <LineChart data={gainChartData}>
              <Legend verticalAlign="top" />
              <XAxis dataKey="月份" />
              <YAxis type="number" dataKey="大盤指數" />
              <Line type="monotone" dataKey="大盤指數" stroke="#FF9500" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {industryCard}
    </div>
  );
}

const reduxHook = connect(
  state => ({
    industryCardData: state.IndustryCard.IndustryCardData,
    searchTerm: selector(state, 'searchTerm'),
  }),
  dispatch => bindActionCreators({
    ...IndustryCardActions,
  }, dispatch),
);

export default reduxHook(StocksInfoPage);
