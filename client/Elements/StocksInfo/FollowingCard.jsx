// @flow
/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { flex } from '../../Constant/emotion';

const styles = {
  wrapper: css`
    ${flex}
    align-items: flex-start;
    min-width: 150px;
    height: 130px;
    border-radius: 40px;
    background-color: #262626;
    margin: 0 10px;
    padding: 0 30px;
  `,
  leftPart: css`
    ${flex}
    flexGrow: 1;
    align-items: flex-start;
    margin: 0 0 0 40px;
  `,
  rightPart: css`
    ${flex}
    flexGrow: 1;
  `,
  word: css`
    font-size: 13px;
  `,
  title: css`
    display: flex;
    flex-direction: row;
  `,
  status: css`
    font-size: 13px;
    color: #FF9500;
  `,
  followingWrapper: css`
    margin: 10px 0 0 0;
  `,
};

type Props = {
  id: number,
  name: string,
  number: number,
  status: string,
  following: Array,
};

function FollowingCard({
  id,
  name,
  number,
  status,
  following,
}: Props) {
  return (
    <div css={styles.wrapper}>
      <div css={styles.title}>
        <span>
          {number}
        </span>
        <span>
          {name}
        </span>
      </div>
      <div css={styles.followingWrapper}>
        <span css={styles.status}>
          {status}
          &nbsp;
        </span>
        {following.map(s => (
          <span
            key={s.id}
            css={styles.word}>
            {s.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default FollowingCard;
