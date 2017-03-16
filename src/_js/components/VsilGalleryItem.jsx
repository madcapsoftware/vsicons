import * as React from 'react';
import { Image } from 'office-ui-fabric-react/lib/index';

const VsilGalleryItem = props => {
  return (
    <div className="ms-Grid-row vsil-gallery-item" id={`Item_${props.id}`}>
      <div className="ms-Grid-col ms-u-sm9 ms-u-md4 vsil-gallery-item-name">
        <span>{props.name}</span>
      </div>
      <div className="ms-Grid-col ms-u-sm3 ms-u-md2 vsil-gallery-thumbnail">
        <span><Image src={`https://vsicons.blob.core.windows.net/assets/DevEnv/${props.name}/${props.name}_16x.svg`} alt={` ${props.name} `} width={32} /></span>
      </div>
      <div
        className="ms-Grid-col ms-u-hiddenMdDown ms-u-md6 vsil-gallery-item-description"
      >
        <span>{props.description || ''}</span>
      </div>
    </div>
  );
};


VsilGalleryItem.propTypes = {
  id: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  description: React.PropTypes.string,
};

export default VsilGalleryItem;
