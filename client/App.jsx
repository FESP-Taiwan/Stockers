// @flow

import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import store, { history } from './store';
import MessageHandler from './Elements/MessageHandler';
import ErrorHandler from './Elements/ErrorHandler';

// Root Pages
import RegisterPage from './Pages/Auth/RegisterPage';
import LoginPage from './Pages/Auth/LoginPage';
import MainBoard from './Pages/MainBoard';
import BreadCrumb from './Elements/BreadCrumb/BreadCrumb';

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
          <MessageHandler>
            <ErrorHandler>
              <Switch>
                <Route exact path="/breadCrumb" component={BreadCrumb} />
                <Route exact path="/register" component={RegisterPage} />
                <Route exact path="/login" component={LoginPage} />
                <Route component={MainBoard} />
              </Switch>
            </ErrorHandler>
          </MessageHandler>
        </ConnectedRouter>
      </Provider>
    </div>
  );
}

export default App;
