// @flow
/** @jsx jsx */

import {
  useState,
  useMemo,
  useEffect,
} from 'react';
import { jsx, css } from '@emotion/core';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import arrow from '../../static/images/arrow.png';
import * as IndustryCardActions from '../../actions/IndustryCard';
import LoadingSpinner from '../LoadingSpinner';

const styles = {
  wrapper: css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  `,
  arrow: css`
    width: 24px;
    height: 24px;
    margin: 0 20px;
  `,
  industryName: css`
    font-size: 20px;
    font-weight: 800;
  `,
};

function HeaderIndustry({
  fetchIndustryCardData,
  industryCardData,
}: {
  fetchIndustryCardData: Function,
  industryCardData: Array,
}) {
  const { industryId } = useParams();
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

  const industryName = useMemo(() => {
    if (!industryCardData.length) return null;

    if (isLoading) return <LoadingSpinner />;

    return industryCardData[Number(industryId)].industry_type;
  }, [industryCardData, industryId, isLoading]);

  return (
    <div css={styles.wrapper}>
      <img src={arrow} alt="arrow" css={styles.arrow} />
      <span css={styles.industryName}>
        {industryName}
      </span>
    </div>
  );
}

const reduxHook = connect(
  state => ({
    industryCardData: state.IndustryCard.IndustryCardData,
  }),
  dispatch => bindActionCreators({
    ...IndustryCardActions,
  }, dispatch),
);

export default reduxHook(HeaderIndustry);
