// @flow

import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import type { ApolloClient } from 'apollo-client';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';

// Root Pages
import RegisterPage from './Pages/Auth/RegisterPage';

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

function App({
  client,
}: {
  client: ApolloClient,
}) {
  return (
    <div style={styles.wrapper}>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <ConnectedRouter history={history}>
            <Switch>
              <Route exact path="/register" component={RegisterPage} />
              <Route render={() => <div>Stockers</div>} />
            </Switch>
          </ConnectedRouter>
        </ApolloProvider>
      </Provider>
    </div>
  );
}

export default App;
