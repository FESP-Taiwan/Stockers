// @flow
/* eslint import/no-extraneous-dependencies: 0 */

import React from 'react';
import { render } from 'react-dom';
import debug from 'debug';
import moment from 'moment';
import 'moment/locale/zh-tw';
import App from './App';
import './static/main.css';

debug.enable('Stockers:*');

declare var module: {
  hot: {
    accept: Function,
  },
}

moment.locale('zh-tw');

function renderPage() {
  const root = document.getElementById('root');

  if (root) {
    render(
      <App />,
      root,
    );
  }
}

// Initialize rendering
renderPage();

// Hot reload for development
async function init() {
  if (module.hot) {
    module.hot.accept('./App', () => {
      renderPage();
    });
  }
}

init();
