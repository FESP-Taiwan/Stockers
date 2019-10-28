// @flow
/** @jsx jsx */

import {
  useCallback,
  useState,
  useMemo,
} from 'react';
import { jsx } from '@emotion/core';
import {
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import { reduxForm } from 'redux-form';
import logo from '../../static/images/logo_stockers.svg';
import HeaderIndustry from './HeaderIndustry';
import HeaderStock from './HeaderStock';
import { userInfo } from '../../Mocks/Queries/User';
import SearchBar from '../../Form/SearchBar';
import { FORM_SITE_HEADER } from '../../Constant/form';
import { FOOTER_INDEX } from '../../Constant/zIndex';

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
    padding: '0 5px 0 0',
  },
  userInfoWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfoBtn: {
    padding: '5px 20px 0 0',
    zIndex: FOOTER_INDEX,
  },
  userOptionsWrapper: {
    width: 150,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    position: 'absolute',
    top: 80,
    right: 20,
  },
  logOutBtn: {
    width: 90,
    height: 80,
    borderRadius: 40,
    color: Colors.BULL_MARKET,
    backgroundColor: '#4D2622',
    textAlign: 'center',
    lineHeight: '80px',
    margin: '10px 0',
  },
  filterBtn: {
    width: 140,
    height: 80,
    borderRadius: 40,
    color: '#FFF',
    backgroundColor: Colors.LAYER_SECOND,
    textAlign: 'center',
    lineHeight: '80px',
    margin: '10px 0',
  },
  mask: {
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    left: 0,
    top: 0,
    opacity: 0.7,
    backgroundColor: Colors.LAYER_SECOND,
  },
};

const filterModals = [{
  id: 1,
  name: 'Ａ基本面篩選',
}, {
  id: 2,
  name: 'Ｂ基本面篩選',
}, {
  id: 3,
  name: 'Ｃ基本面篩選',
}, {
  id: 4,
  name: 'Ｄ基本面篩選',
}];

function SiteHeader() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMenuOpened, setMenuOpened] = useState(false);

  const onClick = useCallback(() => {
    setMenuOpened(!isMenuOpened);
  }, [isMenuOpened]);

  const mask = useMemo(() => {
    if (!isMenuOpened) return null;

    return (
      <div style={styles.mask} />
    );
  }, [isMenuOpened]);

  const userOptions = useMemo(() => {
    if (!isMenuOpened) return null;

    return (
      <div style={styles.userOptionsWrapper}>
        <div style={styles.logOutBtn}>
          登出
        </div>
        <div>
          你的模型
        </div>
        {filterModals.map(filterModal => (
          <button
            key={filterModal.id}
            onClick={() => console.log('切換模型')}
            type="button"
            style={styles.filterBtn}>
            {filterModal.name}
          </button>
        ))}
      </div>
    );
  }, [isMenuOpened]);

  return (
    <header style={styles.wrapper}>
      <Link
        to="/">
        <img alt="stockers" src={logo} style={styles.logo} />
      </Link>
      <div style={styles.middle}>
        <Switch>
          <Route path="/industry/:industryId/stocks/:stockId">
            <HeaderStock />
          </Route>
          <Route path="/industry/:industryId">
            <HeaderIndustry />
          </Route>
        </Switch>
      </div>
      <div style={styles.searchBar}>
        <SearchBar
          input={{
            value: searchTerm,
            onChange: setSearchTerm,
          }}
          placeholder="以股號/股名查詢" />
      </div>
      <div style={styles.userInfoWrapper}>
        <span style={styles.email}>
          {userInfo[0].email}
        </span>
        <button
          onClick={onClick}
          style={styles.userInfoBtn}
          type="button">
          <svg width="24" height="24" viewBox="0 0 24 24">
            <path fill="white" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
          </svg>
        </button>
        {mask}
        {userOptions}
      </div>
    </header>
  );
}

const formHook = reduxForm({
  form: FORM_SITE_HEADER,
});

export default formHook(SiteHeader);
