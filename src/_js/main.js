import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as promise from 'es6-promise';
import VsilHeader from './components/VsilHeader';
import VsilGallery from './components/VsilGallery';

promise.polyfill();
ReactDOM.render(<VsilHeader year="2017" />, document.getElementById('VsilHeader'));

ReactDOM.render(<VsilGallery dataurl="vsicons.json" />, document.getElementById('VsilGallery'));
