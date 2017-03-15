import * as React from 'react';

const VsilHeader = props => (
  <div className="vsil-header">
    <h1>Microsoft Visual Studio Image Library { props.year }</h1>
    <div className="ms-fontColor-themePrimary">
      <p>Use Instructions:</p>
      <p>Some of these images are offered in various sizes and color schemes
       although only preview image is displayed in the table below.
       The same usage restrictions apply to all variations of a given image.
       As part of a visual language, the following images (or any part of the images)
       must be used in a manner consistent
       with the image name or concept description indicated below.</p>
      <p className="vsil-show-on-print">Icon image files are sorted in the
       <strong>{`VS${props.year}`}</strong> folder.
       Each icon folder name matches the icon concept name you can find in below table.</p>
    </div>
  </div>
);

VsilHeader.propTypes = {
  year: React.PropTypes.number.isRequired,
};

VsilHeader.defaultProps = {
  year: 2017,
};
export default VsilHeader;
