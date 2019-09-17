// @flow

import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import SiteHeader from '../Elements/Sites/SiteHeader';
import ModuleTableWrapper from '../Elements/FinanceTable/ModuleTableWrapper';
import EllipsisText from '../Elements/Misc/EllipsisText';

const styles = {
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    width: '100%',
    height: '100%',
  },
};

function MainBoard() {
  return (
    <div style={styles.wrapper}>
      <Switch>
        <Route component={SiteHeader} />
      </Switch>
      <div style={styles.main}>
        <Switch>
          <Route exact path="/tablepage" component={ModuleTableWrapper} />
          <Route render={() => (
            <div style={{ width: 100 }}>
              <EllipsisText
                editPlaceholder="備註文字"
                editTitle="編輯備註"
                editDesc="新增備註"
                onEdit={() => {
                  console.log('onEdit');
                }}>
                剩餘文字顯示！首頁未完成，Table這邊請：/tablepage
              </EllipsisText>
            </div>
          )} />
        </Switch>
      </div>
    </div>
  );
}

export default MainBoard;
