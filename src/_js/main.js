import * as React from 'react';
import * as ReactDOM from 'react-dom';

import VsilHeader from './components/VsilHeader';
import VsilGallery from './components/VsilGallery';

ReactDOM.render(<VsilHeader />, document.getElementById('VsilHeader'));

ReactDOM.render(<VsilGallery dataurl="vsicons.json" />, document.getElementById('VsilGallery'));
