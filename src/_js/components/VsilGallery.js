import * as React from 'react';
import { Image, List } from 'office-ui-fabric-react/lib/index';
import * as axios from 'axios';

export default class VsilGallery extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
      limit: 0,
    };
    this.limitResult = (data, amount) => {
      let dataLimited;
      if (amount) {
        dataLimited = data.slice(0, amount);
      } else {
        dataLimited = data;
      }
      return dataLimited;
    };
    this.filterResult = (data) => {
      const isPublish = (item) => {
        return item.publish === 1;
      };
      return data.filter(isPublish);
    };
  }
  componentWillMount() {
    axios.get(this.props.dataurl)
      .then((response) => {
        // grab props and set some initials
        this.setState({
          limit: this.props.limit || null,
        });
        // filter and limit
        this.setState({
          items: this.limitResult(
            this.filterResult(response.data),
            this.state.limit),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const items = this.state.items;
    return (
      <div className="vsil-gallery ms-Grid">
          <div className="ms-bgColor-neutralSecondary ms-fontColor-white ms-Grid-row vsil-gallery-header">
            <div className="ms-Grid-col ms-u-sm9 ms-u-md4"><span>Name</span></div>
            <div className="ms-Grid-col ms-u-sm3 ms-u-md2"><span>Icon</span></div>
            <div className="ms-Grid-col ms-u-hiddenMdDown ms-u-md6"><span>Description</span></div>
          </div>
        <div className="vsil-gallery-body">
        <List items={ items } onRenderCell={ (item, index) => (
          <div className="ms-Grid-row vsil-gallery-item" id={`Item_${item.id}`} data-keywords={ item.keywords }>
                      <div className="ms-Grid-col ms-u-sm9 ms-u-md4 vsil-gallery-item-name"><span>{item.name}</span></div>
                      <div className="ms-Grid-col ms-u-sm3 ms-u-md2 vsil-gallery-thumbnail"><span><Image src={`https://vsicons.blob.core.windows.net/assets/DevEnv/${item.name}/${item.name}_16x.svg`} alt={` ${item.name} `} width={32} /></span></div>
                      <div className="ms-Grid-col ms-u-hiddenMdDown ms-u-md6 vsil-gallery-item-description"><span>{item.description || ''}</span></div>
          </div>
        ) }
        />
        </div>
        <div className="vsil-gallery-footer">
          <p className="ms-fontColor-neutralSecondary ms-u-textAlignRight">Displaying { items.length } Visual Studio icons.</p>
        </div>
      </div>
    );
  }
}
VsilGallery.propTypes = {
  dataurl: React.PropTypes.string.isRequired,
  prefix: React.PropTypes.string.isRequired,
  suffix: React.PropTypes.string.isRequired,
  limit: React.PropTypes.number,
};

VsilGallery.defaultProps = {
  limit: 0,
};
