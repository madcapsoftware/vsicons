import * as React from 'react';
import { SearchBox, List } from 'office-ui-fabric-react/lib/index';
import * as axios from 'axios';
import GalleryItem from './GalleryItem.jsx';

export default class Gallery extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
      filteredItems: [],
      limit: 0,
      count: 0,
      pages: 0,
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
      const isPublish = item => item.publish === 1;
      return data.filter(isPublish);
    };
  }
  componentWillMount() {
    // get data
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
          itemsFiltered: this.limitResult(
            this.filterResult(response.data),
            this.state.limit),
        });
        // update count
        this.setState({
          count: this.state.itemsFiltered.length,
        });
      });
  }

  render() {
    const items = this.state.items;
    let itemsFiltered = items;
    let count = itemsFiltered.length;
    return (
      <div className="ms-Grid-col ms-u-sm10 ms-u-smPush1 ms-u-xl8 ms-u-xlPush2">
        <div className="vsil-gallery">
          <div className="vsil-search vsil-hide-on-print">
            <SearchBox
              onChange={(value) => {
                const query = value.toLowerCase();
                itemsFiltered = items.filter((item) => {
                  const metadata = `${item.name.toLowerCase()} ${item.keywords ? item.keywords.join(' ').toLowerCase() : ''}`;
                  return metadata.indexOf(query) >= 0;
                });
                count = itemsFiltered.length;
                this.setState({
                  itemsFiltered,
                  count,
                });
              }}
            />
          </div>
          <div
            className="
            ms-bgColor-neutralSecondary
            ms-fontColor-white
            ms-Grid-row
            vsil-gallery-header"
          >
            <div className="ms-Grid-col ms-u-sm8 ms-u-md4"><span>Name</span></div>
            <div className="ms-Grid-col ms-u-sm4 ms-u-md2"><span>Icon</span></div>
            <div className="ms-Grid-col ms-u-hiddenMdDown ms-u-lg4"><span>Description</span></div>
            <div className="ms-Grid-col ms-u-hiddenSm ms-u-md2 vsil-hide-on-print">
              <span>Download</span>
            </div>
          </div>
          <List
            className="vsil-gallery-body"
            items={this.state.itemsFiltered}
            onRenderCell={item => (
              <GalleryItem id={item.id} name={item.name} description={item.description} />
            )}
            renderedWindowsAhead={500}
            renderedWindowsBehind={500}
          />
          <div className="vsil-gallery-footer vsil-hide-on-print">
            <p
              className="
              ms-fontColor-neutralSecondary
              ms-u-textAlignRight"
            >Displaying { this.state.count } Visual Studio icons.</p>
          </div>
        </div>
      </div>
    );
  }
}
Gallery.propTypes = {
  dataurl: React.PropTypes.string.isRequired,
  limit: React.PropTypes.number,
};

Gallery.defaultProps = {
  limit: 0,
};
