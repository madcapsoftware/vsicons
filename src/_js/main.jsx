import * as axios from 'axios';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  SearchBox,
  Image,
} from 'office-ui-fabric-react/lib/index';

export class VsilHeader extends React.Component {
  render() {
    return (
      <div className="vsil-header">
        <h1>Microsoft Visual Studio Image Library 2017</h1>
        <div className="ms-fontColor-themePrimary">
          <p>Use Instructions:</p><p>Some of these images are offered in various sizes and color schemes although only preview image is displayed in the table below. The same usage restrictions apply to all variations of a given image. As part of a visual language, the following images (or any part of the images) must be used in a manner consistent with the image name or concept description indicated below.</p><p className="vsil-show-on-print">Icon image files are sorted in the <strong>VS2017</strong> folder. Each icon folder name matches the icon concept name you can find in below table.</p>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<VsilHeader />, document.getElementById('VsilHeader'));

export class VsilSearch extends React.Component {
  render() {
    return (
      <SearchBox
        className="vsil-search" onChange={(query) => {
          const items = document.getElementById(this.props.target).querySelectorAll('.vsil-gallery-item');
          for (const item of items) {
            const name = item.querySelector('.vsil-gallery-item-name').innerHTML.toLowerCase();
            const keywords = item.querySelector('.vsil-gallery-item-keywords').innerHTML.toLowerCase();
            query.toLowerCase();
            item.style.display = 'initial';
            if (!name.includes(query) && !keywords.includes(query)) {
              item.style.display = 'none';
            }
          }
        }}
      />
    );
  }
}

VsilSearch.propTypes = {
  target: React.PropTypes.string.isRequired,
};

ReactDOM.render(<VsilSearch target="VsilGallery" />, document.getElementById('VsilSearch'));

class VsilGallery extends React.Component {
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
      let dataFiltered = [];
      data.map((item) => {
        if (item.publish === 1) {
          dataFiltered.push(item);
        }
      });
      return dataFiltered;
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
      })
  }

  render() {
    return (
      <table className="vsil-gallery">
        <thead className="ms-Grid">
          <tr className="ms-bgColor-neutralSecondary ms-fontColor-white ms-Grid-row">
            <th className="ms-Grid-col ms-u-sm9 ms-u-md4"><span>Name</span></th>
            <th className="ms-Grid-col ms-u-sm3 ms-u-md2"><span>Icon</span></th>
            <th className="ms-Grid-col ms-u-hiddenMdDown ms-u-md6"><span>Keywords</span></th>
          </tr>
        </thead>
        <tbody className="ms-Grid">
          {
            this.state.items.map((item) => {
              return (
                <tr className="ms-Grid-row vsil-gallery-item" id={`Item_${item.id}`}>
                  <td className="ms-Grid-col ms-u-sm9 ms-u-md4"><span className="vsil-gallery-item-name">{item.name}</span></td>
                  <td className="ms-Grid-col ms-u-sm3 ms-u-md2 vsil-gallery-thumbnail"><span><Image src={`${this.props.prefix}${item.name}/${item.name}${this.props.suffix}`} alt={` ${item.name} `} /></span></td>
                  <td className="ms-Grid-col ms-u-hiddenMdDown ms-u-md6"><span className="vsil-gallery-item-keywords">{item.keywords ? item.keywords.join(', ') : ''}</span></td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    );
  }
}
VsilGallery.propTypes = {
  dataurl: React.PropTypes.string.isRequired,
  prefix: React.PropTypes.string,
  suffix: React.PropTypes.string,
  limit: React.PropTypes.number,
};
ReactDOM.render(<VsilGallery dataurl="vsicons.json" prefix="https://vsicons.blob.core.windows.net/assets/DevEnv/" suffix="_16x.svg" />, document.getElementById('VsilGallery'));
