import * as React from 'react';
import { Image } from 'office-ui-fabric-react/lib/index';
import DownloadButton from './DownloadButton.jsx';

const urlPrefix = 'files';

const GalleryItem = props => (
  <div className="ms-Grid-row vsil-gallery-item" id={`Item_${props.id}`}>
    <div className="ms-Grid-col ms-u-sm8 ms-u-md4 vsil-gallery-item-name">
      <span>{props.name}</span>
    </div>
    <div className="ms-Grid-col ms-u-sm4 ms-u-md2 vsil-gallery-thumbnail">
      <span><Image src={`${urlPrefix}/${props.name}/${props.name}_16x.svg`} alt={` ${props.name} `} width={32} /></span>
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
              href: `${urlPrefix}/${props.name}/${props.name}_16x.svg`,
              download: `${urlPrefix}/${props.name}/${props.name}_16x.svg`,
            },
            {
              key: 'png',
              name: '16x16 PNG',
              title: '16x16 PNG',
              href: `${urlPrefix}/${props.name}/${props.name}_16x.png`,
              download: `${urlPrefix}/${props.name}/${props.name}_16x.png`,
            },
            {
              key: 'xaml',
              name: 'XAML',
              title: 'XAML for ImageService',
              href: `${urlPrefix}/${props.name}/${props.name}_16x.xaml`,
              download: `${urlPrefix}/${props.name}/${props.name}_16x.xaml`,
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
