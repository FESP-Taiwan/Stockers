// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import store, { history } from './store';

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
          <div>aa</div>
        </ConnectedRouter>
      </Provider>
    </div>
  );
}

export default App;
