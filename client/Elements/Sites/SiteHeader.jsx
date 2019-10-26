// @flow
/** @jsx jsx */

import { jsx } from '@emotion/core';
import {
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import logo from '../../static/images/logo_stockers.svg';
import HeaderIndustry from './HeaderIndustry';
import HeaderStock from './HeaderStock';
import { userInfo } from '../../Mocks/Queries/User';
import SearchBar from '../../Form/SearchBar';
import { FORM_SITE_HEADER } from '../../Constant/form';

const styles = {
  wrapper: {
    width: '100%',
    height: 100,
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'center',
    gridTemplateColumns: '80px 1fr 250px 200px',
  },
  logo: {
    width: 40,
    height: 40,
    marginLeft: 40,
  },
  middle: {
    flexGrow: 4,
  },
  right: {
    flexGrow: 1,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  email: {
    width: '100%',
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display: 'block',
    cursor: 'default',
    minWidth: '1em',
    minHeight: '1em',
    fontSize: 13,
    fontWeight: 500,
    padding: '0 20px 0 0',
  },
};

function SiteHeader() {
  return (
    <form>
      <header style={styles.wrapper}>
        <Link
          to="/">
          <img alt="stockers" src={logo} style={styles.logo} />
        </Link>
        <div style={styles.middle}>
          <Switch>
            <Route exact path="/" render={() => null} />
            <Route exact path="/industry" component={HeaderIndustry} />
            <Route exact paht="/industry/stock" component={HeaderStock} />
          </Switch>
        </div>
        <div style={styles.searchBar}>
          <Field
            name="searchTerm"
            placeholder="以股號/股名查詢"
            component={SearchBar} />
        </div>
        <span style={styles.email}>
          {userInfo[0].email}
        </span>
      </header>
    </form>
  );
}

const formHook = reduxForm({
  form: FORM_SITE_HEADER,
});

export default formHook(SiteHeader);
