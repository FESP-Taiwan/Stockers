// @flow
/* eslint import/no-extraneous-dependencies: 0 */

import React from 'react';
import { render } from 'react-dom';
import debug from 'debug';
import App from './App';
import './static/main.css';

debug.enable('Sportholic:*');

declare var module: {
  hot: {
    accept: Function,
  },
}

function renderPage() {
  render(
    <App />,
    document.getElementById('root'),
  );
}

renderPage();

if (module.hot) {
  module.hot.accept('./App', () => {
    renderPage();
  });
}
