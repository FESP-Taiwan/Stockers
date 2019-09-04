// @flow

import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from './store';
import ModuleTableWrapper from './Elements/FinanceTable/ModuleTableWrapper';

const styles = {
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
};

function App() {
  return (
    <div style={styles.wrapper}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ModuleTableWrapper />
        </ConnectedRouter>
      </Provider>
    </div>
  );
}

export default App;
