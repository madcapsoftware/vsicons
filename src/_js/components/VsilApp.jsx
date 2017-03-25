import * as React from 'react';
import Header from './Header.jsx';
import Gallery from './Gallery.jsx';

const VsilApp = () => (
  <div className="ms-Grid vsil-printable vsil-wrapper">
    <div className="ms-Grid-row">
      <Header
        year={2017}
      />
    </div>
    <div className="ms-Grid-row">
      <Gallery
        dataurl="vsicons.json"
      />
    </div>
  </div>
);

export default VsilApp;
