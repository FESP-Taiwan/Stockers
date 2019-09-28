// @flow

import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import HeaderLogo from './HeaderLogo';

const styles = {
  wrapper: {
    width: '100%',
    height: 100,
    display: 'flex',
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

function SiteHeader() {
  return (
    <header style={styles.wrapper}>
      <Switch>
        <Route component={HeaderLogo} />
      </Switch>
    </header>
  );
}

export default SiteHeader;
