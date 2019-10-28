// @flow
/** @jsx jsx */

import {
  useState,
  useMemo,
} from 'react';
import { jsx, css } from '@emotion/core';
import { Link, useParams } from 'react-router-dom';
import { flex } from '../../Constant/emotion';
import { industryStream } from '../../Mocks/Queries/IndustryDetails';

const button = css`
  width: 320px;
  height: 80px;
  border-radius: 40px;
  background-color: ${Colors.LAYER_FIRST};
`;

const styles = {
  wrapper: css`
    ${flex}
  `,
  blockWrapper: css`
    width: 100%;
    display: flex;
    flex-direction: column;
    max-width: 1200px;
    justify-content: flex-start;
    align-items: flex-start;
    flex-grow: 1;
    flex-basis: 0;
    flex-shrink: 0;
    margin: 0 auto 50px auto;
  `,
  industryBlock: css`
    ${flex}
    border-radius: 40px;
    background-color: ${Colors.LAYER_FIRST};
    padding: 40px;
    align-items: flex-start;
    justify-content: flex-start;
  `,
  article: css`
    font-size: 13px;
    letter-spacing: 2px;
    line-height: 25px;
  `,
  btnWrapper: css`
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: row;
    margin: 0 0 20px 0;
  `,
  firstButton: css`
    ${button}
  `,
  button: css`
    ${button}
    margin: 0 20px 0 0;
  `,
  buttonTitle: css`
    font-size: 18px;
    font-weight: 800,
  `,
  subIndustryWrapper: css`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin: 40px 0 0 0;
  `,
  subIndustry: css`
    ${flex}
    align-items: flex-start;
    justify-content: flex-start;
    margin: 0 0 20px 0;
  `,
  subTitle: css`
    font-size: 18px;
    font-weight: 500;
  `,
  subBtnWrapper: css`
    ${flex}
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    margin: 20px 20px 0 0;
  `,
  subBtn: css`
    width: 100px;
    height: 30px;
    margin: 0 20px 0 0;
    border-radius: 40px;
    background-color: ${Colors.LAYER_FIRST};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-decoration: none;
  `,
  subBtnTitle: css`
    font-size: 13px;
    color: ${Colors.PRIMARY};
  `,
  btnActive: css`
    ${button}
    margin: 0 20px 0 0;
    background-color: ${Colors.PRIMARY_THIRD};
  `,
  btnTitleActive: css`
    font-size: 18px;
    font-weight: 800;
    color: ${Colors.PRIMARY};
  `,
};

const INDUSTRY_TYPES = {
  UPPER: 'UPPER',
  MIDDLE: 'MIDDLE',
  LOWER: 'LOWER',
};

function IndustryPage() {
  const [industry, setIndustry] = useState('UPPER');

  const { industryId } = useParams();

  const middleStream = useMemo(() => {
    if (!industryStream[Number(industryId)].streams[1].name) return null;

    return (
      <button
        css={{
          ...styles.button,
          ...(industry === 'MIDDLE') ? styles.btnActive : {},
        }}
        onClick={() => setIndustry(INDUSTRY_TYPES.MIDDLE)}
        type="button">
        <span
          css={{
            ...styles.buttonTitle,
            ...(industry === 'MIDDLE') ? styles.btnTitleActive : {},
          }}>
          {industryStream[Number(industryId)].streams[1].name}
        </span>
      </button>
    );
  }, [industry, industryId]);

  const [streamInfo] = useMemo(() => industryStream[Number(industryId)].streams
    .filter(stream => stream.type === industry), [industry, industryId]);

  const stockLink = useMemo(() => {
    if (!streamInfo.stocks.length) {
      return (
        <div css={styles.subTitle}>
          <span css={styles.subTitle}>
            {streamInfo.name}
          </span>
          <div css={styles.subBtnWrapper}>
            <div css={styles.subBtn}>
              <span css={styles.subBtnTitle}>
                暫無提供
              </span>
            </div>
          </div>
        </div>
      );
    }

    return streamInfo.stocks.map(stock => (
      <div
        key={stock.number}
        css={styles.subIndustry}>
        <span css={styles.subTitle}>
          {streamInfo.name}
        </span>
        <div css={styles.subBtnWrapper}>
          <Link
            to={`/industry/${industryId}/stocks/${stock.number}`}
            css={styles.subBtn}>
            <span css={styles.subBtnTitle}>
              {stock.number}
            </span>
            <span css={styles.subBtnTitle}>
              &nbsp;
              {stock.name}
            </span>
          </Link>
        </div>
      </div>
    ));
  }, [streamInfo, industryId]);

  return (
    <div css={styles.wrapper}>
      <div css={styles.blockWrapper}>
        <h3>
          產業概觀
        </h3>
        <div css={styles.industryBlock}>
          <span css={styles.article}>
            &nbsp;&nbsp;&nbsp;&nbsp;
            {industryStream[Number(industryId)].description}
          </span>
          <div>
            <h4>
              漲跌幅走勢 單位%
            </h4>
            <div>
              圖表
            </div>
          </div>
        </div>
      </div>
      <div css={styles.blockWrapper}>
        <div css={styles.btnWrapper}>
          <button
            css={{
              ...styles.button,
              ...(industry === 'UPPER') ? styles.btnActive : {},
            }}
            onClick={() => setIndustry(INDUSTRY_TYPES.UPPER)}
            type="button">
            <span
              css={{
                ...styles.buttonTitle,
                ...(industry === 'UPPER') ? styles.btnTitleActive : {},
              }}>
              {industryStream[Number(industryId)].streams[0].name}
            </span>
          </button>
          {middleStream}
          <button
            css={{
              ...styles.button,
              ...(industry === 'LOWER') ? styles.btnActive : {},
            }}
            onClick={() => setIndustry(INDUSTRY_TYPES.LOWER)}
            type="button">
            <span
              css={{
                ...styles.buttonTitle,
                ...(industry === 'LOWER') ? styles.btnTitleActive : {},
              }}>
              &nbsp;
              {industryStream[Number(industryId)].streams[2].name}
            </span>
          </button>
        </div>
        <div css={styles.industryBlock}>
          <span css={styles.article}>
            {streamInfo.description}
          </span>
        </div>
        <div css={styles.subIndustryWrapper}>
          {stockLink}
        </div>
      </div>
    </div>
  );
}

export default IndustryPage;
