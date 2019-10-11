// @flow
/** @jsx jsx */

import { jsx, css } from '@emotion/core';
import { flex } from '../../Constant/emotion';
import { industries } from '../../Mocks/Queries/IndustryDetails';

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
    ${flex}
    justify-content: flex-start;
    align-items: flex-start;
    flex-grow: 1;
    flex-basis: 0;
    flex-shrink: 0;
    margin: 0 0 50px 0;
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
    margin: 0 10px;
  `,
  buttonTitle: css`
    font-size: 20px;
    font-weight: 800,
  `,
};

function IndustryPage() {
  return (
    <div css={styles.wrapper}>
      <div css={styles.blockWrapper}>
        <h3>
          產業概觀
        </h3>
        <div css={styles.industryBlock}>
          <span css={styles.article}>
            &nbsp;&nbsp;&nbsp;&nbsp;半導體產業是台灣電子產業最重要的支柱，其中就包含台股市值最大的公司——台積電。

            半導體位於電子產業的最上游。研究產業時，從上游開始學習是最有系統的。當你往下游走時，可以清楚的知道這些產品是由哪些上游所構成。

            半導體產業最上游是 IC 設計公司（IC 是積體電路）與矽晶圓製造公司，IC 設計公司計依客戶的需求設計出積體電路圖，矽晶圓製造公司則以多晶矽為原料製造出矽晶圓。

            中游的 IC 製造公司主要的任務，就是把 IC 設計公司設計好的電路圖，移植到矽晶圓製造公司製造好的晶圓上。完成後的晶圓再送往下游的 IC 封測廠封裝與測試，就大功告成囉！

            總合來說：
            * 半導體產業鏈上游為 IP 設計及 IC 設計業
            * 中游為 IC 製造、晶圓製造、相關生產製程檢測設備、光罩、化學品等
            * 下游為 IC 封裝測試、相關生產製程檢測設備、零組件（如基板、導線架）、IC模組、IC通路等

            台灣擁有全球最完整的半導體產業聚落及專業分工，IC 設計公司在產品設計完成後，交由專業晶圓代工廠或 IDM 廠（整合型半導體廠，從 IC 設計、製造、封裝、測試一條龍服務）製作成晶圓半成品，經由前段測試，再轉給封裝廠進行切割及封裝，最後由測試廠進行後段測試，測試後的成品再經由銷售管道賣給系統廠生產為系統產品。
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
            css={styles.firstButton}
            type="button">
            <span css={styles.buttonTitle}>
              上游
            </span>
          </button>
          <button
            css={styles.button}
            type="button">
            <span css={styles.buttonTitle}>
              中游
            </span>
          </button>
          <button
            css={styles.button}
            type="button">
            <span css={styles.buttonTitle}>
              下游
            </span>
          </button>
        </div>
        <div css={styles.industryBlock}>
          <span css={styles.article}>
            &nbsp;&nbsp;&nbsp;&nbsp;半導體產業鏈上游包含IC設計及IP設計業。
            IC 的中文叫「積體電路」，在電子學中是把電路（包括半導體裝置、元件）小型化、並製造在半導體晶圓表面上。所以半導體只是製作 IC 的原料。
            蓋房子前總得先畫出藍圖，在IC產品誕生之前總得先設計出 IC，沒有設計圖，擁有再強製造能力都沒有用，所以IC設計這個設計師的角色就特別重要了。所謂的IC設計就是將一片晶片的功能從邏輯設計到晶圓設計的整個過程，IC 設計屬於 IC 生產流程的前段，包括邏輯設計、電路設計與佈局等，設計好IC之後，再交給晶圓廠代工製造，知名的IC 設計廠商包括聯發科、聯詠、高通等。
            如果說 IC 設計是半導體業的設計師，那半導體業的軍師就非IP設計莫屬了。
            就像設計所有產品一樣，從零開始總是特別勞心勞力，所以在 IC 設計中，可以透過購買IP授權的方式來縮短產品的開發時間和降低成本；IP 又叫作矽智財，是一種販售電路設計架構相關智慧財產權授權的行業，簡單來說，IP 就是 IC 設計的智慧財產權，採用IP可以更快、更好、更省的完成晶片設計。知名的IP設計廠商有 IP 大廠安謀（ARM）、晶心科、力旺和後起之秀的 M31 等。
          </span>
        </div>
        <div css={styles.subIndustryWrapper}>
          <div css={styles.subIndustry}>
            <span css={styles.subTitle}>
              IP/IC
            </span>
            <div css={styles.subBtnWrapper}>
              <button
                css={styles.subBtn}
                type="button">
                2401 凌陽
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IndustryPage;
