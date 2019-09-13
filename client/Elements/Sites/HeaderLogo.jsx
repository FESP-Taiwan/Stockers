// @flow

import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../static/images/logo_stockers.png';

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
        <img alt="國家兩廳院場館設施服務系統" src={logo} style={styles.logo} />
      </Link>
      <div style={styles.placeholder} />
    </Fragment>
  );
}

export default HeaderLogo;
