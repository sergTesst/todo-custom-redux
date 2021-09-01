import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

import './api/server'
import store from './app/store'
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux'
import {InitialActions} from './dispatchingInitialActions';


InitialActions(store);

ReactDOM.render(
  <Provider store={store}>
      <React.StrictMode>
        <App />
    </React.StrictMode>
  </Provider>
,
  document.getElementById('root')
)
