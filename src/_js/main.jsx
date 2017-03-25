import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as promise from 'es6-promise';
import VsilApp from './components/VsilApp.jsx';

promise.polyfill();

ReactDOM.render(<VsilApp />, document.getElementById('VsilApp'));
