// @flow
/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { flex } from '../../../Constant/emotion';

const styles = {
  wrapper: css`
    ${flex}
    min-width: 225px;
    height: 130px;
    flex-direction: row;
    border-radius: 40px;
    background-color: #262626;
    margin: 0 10px;
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
    margin: 0 0 18px;
  `,
  status: css`
    font-size: 13px;
    color: #FF9500;
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
      <div css={styles.leftPart}>
        <div css={styles.title}>
          <span>
            {number}
          </span>
          <span>
            {name}
          </span>
        </div>
        <div>
          <span css={styles.status}>
            {status}
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
      <div css={styles.rightPart}>
        Photo
      </div>
    </div>
  );
}

export default FollowingCard;
