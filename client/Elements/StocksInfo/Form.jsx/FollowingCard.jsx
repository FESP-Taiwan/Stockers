// @flow
/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { flex } from '../../../Constant/emotion';

const styles = {
  wrapper: css`
    ${flex}
    width: 225px;
    height: 130px;
    flex-direction: row;
    border-radius: 40px;
    background-color: #262626;
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
};

function FollowingCard() {
  return (
    <div css={styles.wrapper}>
      <div css={styles.leftPart}>
        <span>
          2330 台積電
        </span>
        <div>
          <span>
            買ＡＢ
          </span>
        </div>
      </div>
      <div css={styles.rightPart}>
        Photo
      </div>
    </div>
  );
}

export default FollowingCard;
