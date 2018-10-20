import 'babel-polyfill'
import React from 'expose-loader?React!react'
import ReactDOM from 'expose-loader?ReactDOM!react-dom'
import App from './components/containers/App'

import { Provider } from 'react-redux'

import store from './store'

require('bootstrap/dist/css/bootstrap.css');
require('./theme.scss');
require('react-select/dist/react-select.css');

// const App = require('./components').default

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
