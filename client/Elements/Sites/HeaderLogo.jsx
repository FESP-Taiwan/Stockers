// @flow

import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../static/images/logo_stockers.svg';

const styles = {
  logo: {
    width: 40,
    height: 40,
    marginLeft: 40,
  },
  placeholder: {
    flexGrow: 1,
  },
};

function HeaderLogo() {
  return (
    <Fragment>
      <Link
        to="/">
        <img alt="stockers" src={logo} style={styles.logo} />
      </Link>
      <div style={styles.placeholder} />
    </Fragment>
  );
}

export default HeaderLogo;
