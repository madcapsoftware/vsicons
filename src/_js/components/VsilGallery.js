import * as React from 'react';
import { Image } from 'office-ui-fabric-react/lib/index';
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
  prefix: React.PropTypes.string.isRequired,
  suffix: React.PropTypes.string.isRequired,
  limit: React.PropTypes.number,
};

VsilGallery.defaultProps = {
  limit: 0,
};
