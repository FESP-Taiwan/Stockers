// @flow
/** @jsx jsx */

import { jsx, css } from '@emotion/core';

const flex = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const styles = {
  wrapper: css`
    ${flex}
    width: 225px;
    height: 130px;
    flex-direction: row;
    border: solid 1px #FFF;
    border-radius: 40px;
  `,
  leftPart: css`
    ${flex}
  `,
};

function FollowingCard() {
  return (
    <div css={styles.wrapper}>
      <div css={styles.leftPart}>
        <span>
          2330 台積電
        </span>
        <span>
          買ＡＢ
        </span>
      </div>
      Photo
    </div>
  );
}

export default FollowingCard;
