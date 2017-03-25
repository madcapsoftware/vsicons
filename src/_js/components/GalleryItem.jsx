import * as React from 'react';
import { Image } from 'office-ui-fabric-react/lib/index';
import DownloadButton from './DownloadButton.jsx';

const GalleryItem = props => (
  <div className="ms-Grid-row vsil-gallery-item" id={`Item_${props.id}`}>
    <div className="ms-Grid-col ms-u-sm8 ms-u-md4 vsil-gallery-item-name">
      <span>{props.name}</span>
    </div>
    <div className="ms-Grid-col ms-u-sm4 ms-u-md2 vsil-gallery-thumbnail">
      <span><Image src={`https://vsicons.blob.core.windows.net/assets/DevEnv/${props.name}/${props.name}_16x.svg`} alt={` ${props.name} `} width={32} /></span>
    </div>
    <div
      className="ms-Grid-col ms-u-hiddenMdDown ms-u-lg4 vsil-gallery-item-description"
    >
      <span>{props.description || ''}</span>
    </div>
    <div
      className="ms-Grid-col ms-u-hiddenSm ms-u-md2 vsil-gallery-item-download"
    >
      <span>
        <DownloadButton
          id={`Button_${props.id}`}
          name={props.name}
          items={[
            {
              key: 'svg',
              name: 'Responsive SVG',
              title: 'Responsive SVG',
              href: `https://vsicons.blob.core.windows.net/assets/DevEnv/${props.name}/${props.name}_16x.svg`,
              download: true,
            },
            {
              key: 'png',
              name: '16x16 PNG',
              title: '16x16 PNG',
              href: `https://vsicons.blob.core.windows.net/assets/DevEnv/${props.name}/${props.name}_16x.png`,
              download: true,
            },
            {
              key: 'xaml',
              name: 'XAML',
              title: 'XAML for ImageService',
              href: `https://vsicons.blob.core.windows.net/assets/DevEnv/${props.name}/${props.name}_16x.xaml`,
              download: true,
            },
          ]}
        />
      </span>
    </div>
  </div>
);


GalleryItem.propTypes = {
  id: React.PropTypes.number.isRequired,
  name: React.PropTypes.string.isRequired,
  description: React.PropTypes.string,
};

GalleryItem.defaultProps = {
  description: 'Refer to the icon name',
};

export default GalleryItem;
