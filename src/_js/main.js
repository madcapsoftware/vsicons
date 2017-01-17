import * as React from 'react';
import * as ReactDOM from 'react-dom';

import VsilHeader from './components/VsilHeader';
import VsilSearch from './components/VsilSearch';
import VsilGallery from './components/VsilGallery';

ReactDOM.render(<VsilHeader />, document.getElementById('VsilHeader'));

ReactDOM.render(<VsilSearch target="VsilGallery" />, document.getElementById('VsilSearch'));

ReactDOM.render(<VsilGallery dataurl="vsicons.json" prefix="https://vsicons.blob.core.windows.net/assets/DevEnv/" suffix="_16x.svg" limit={100} />, document.getElementById('VsilGallery'));
