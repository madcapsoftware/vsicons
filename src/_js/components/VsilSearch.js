import * as React from 'react';
import { SearchBox } from 'office-ui-fabric-react/lib/index';

const VsilSearch = (props) => {
  const searchBox = (
    <SearchBox
      className="vsil-search" onChange={(query) => {
        const items = Array.prototype.slice.call(document.getElementById(props.target).querySelectorAll('.vsil-gallery-item'));
        items.map((item) => {
          const listItem = item;
          const name = listItem.querySelector('.vsil-gallery-item-name').innerHTML.toLowerCase();
          const keywords = listItem.querySelector('.vsil-gallery-item-keywords').innerHTML.toLowerCase();
          query.toLowerCase();
          listItem.style.display = 'initial';
          if (!name.includes(query) && !keywords.includes(query)) {
            listItem.style.display = 'none';
          }
          return null;
        });
      }}
    />);
  return searchBox;
};
VsilSearch.propTypes = {
  target: React.PropTypes.string.isRequired,
};
export default VsilSearch;
