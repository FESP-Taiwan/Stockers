// @flow

import React from 'react';
import {
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import logo from '../../static/images/logo_stockers.svg';
import HeaderIndustry from './HeaderIndustry';

const styles = {
  wrapper: {
    width: '100%',
    height: 100,
    display: 'flex',
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    marginLeft: 40,
  },
  placeholder: {
    flexGrow: 1,
  },
};

function SiteHeader() {
  return (
    <header style={styles.wrapper}>
      <Link
        to="/">
        <img alt="stockers" src={logo} style={styles.logo} />
      </Link>
      <div style={styles.placeholder}>
        <Switch>
          <Route exact path="/industry" component={HeaderIndustry} />
        </Switch>
      </div>
    </header>
  );
}

export default SiteHeader;
