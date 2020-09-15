  
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
 import { HashRouter } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom'
 import {Provider} from 'react-redux';
 import store from './ducks/store'; // store is blank....

 /* ReactDOM.render(
 <Provider store={store}>
<HashRouter>
    <App />
</HashRouter>
 </Provider>
, document.getElementById('root')); */

 ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));

