'use strict'
import * as axios from 'axios';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
    SearchBox,
    Image
} from 'office-ui-fabric-react/lib/index';

export class VsilHeader extends React.Component < any, any > {
    render() {
        return (
            <div className='vsil-header'>
              <h1>Microsoft Visual Studio Image Library 2017</h1>
              <div className='ms-fontColor-themePrimary'>
                <p>Use Instructions:</p>
                <p>Some of these images are offered in various sizes and color schemes although only preview image is displayed in the table below. The same usage restrictions apply to all variations of a given image. As part of a visual language, the following images (or any part of the images) must be used in a manner consistent with the image name or concept description indicated below.</p>
                <p className='vsil-show-on-print'>Icon image files are sorted in the <strong>VS2017</strong> folder. Each icon folder name matches the icon concept name you can find in below table.
                </p>
              </div>
            </div>
        );
    }
}

ReactDOM.render( <VsilHeader / > , document.getElementById('VsilHeader'));

export class VsilSearch extends React.Component < any, any > {
    render() {
        return ( <SearchBox className='vsil-search' onChange={ (query) => {
          let items = document.getElementById(this.props.target).querySelectorAll('.vsil-gallery-item');
          for (let item of items) {
            let name = item.querySelector('.vsil-gallery-item-name').innerHTML.toLowerCase();
            let keywords = item.querySelector('.vsil-gallery-item-keywords').innerHTML.toLowerCase();
            query.toLowerCase();
            item.style.display = 'initial';
            if (!name.includes(query) && !keywords.includes(query)) {
              item.style.display = 'none';
            }
          }
        } } />
        );
    }
}

ReactDOM.render( <VsilSearch target='VsilGallery' / > , document.getElementById('VsilSearch'));

class VsilGallery extends React.Component {
  constructor() {
    super();
    this.state = {
      items: []
    };
  }
  componentWillMount() {
    axios.get(this.props.dataurl)
    .then((response)=>{
      this.setState({
        items: response.data
      })
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  render() {
    return(
      <table className='vsil-gallery'>
        <thead className='ms-Grid'>
          <tr className='ms-bgColor-neutralSecondary ms-fontColor-white ms-Grid-row'>
            <th className='ms-Grid-col ms-u-sm9 ms-u-md4'><span>Name</span></th>
            <th className='ms-Grid-col ms-u-sm3 ms-u-md2'><span>Icon</span></th>
            <th className='ms-Grid-col ms-u-hiddenMdDown ms-u-md6'><span>Keywords</span></th>
          </tr>
        </thead>
        <tbody className='ms-Grid'>
        {
          // TODO: need to use the List component for lazy load. I'll just put 500 items as example for now.
          this.state.items.slice(0,this.props.limit).map((item)=>{
          return (
            <tr className='ms-Grid-row vsil-gallery-item' id={`Item_${item.id}`}>
              <td className='ms-Grid-col ms-u-sm9 ms-u-md4'><span className='vsil-gallery-item-name'>{ item.name }</span></td>
              <td className='ms-Grid-col ms-u-sm3 ms-u-md2 vsil-gallery-thumbnail'><span><Image src={ this.props.prefix + item.name + '\\' + item.name + this.props.suffix } alt={` ${item.name} `} /></span></td>
              <td className='ms-Grid-col ms-u-hiddenMdDown ms-u-md6'><span className='vsil-gallery-item-keywords'>{ item.keywords.join(', ') }</span></td>
            </tr>
          );
        })
      }
        </tbody>
      </table>
    );
  }
}

ReactDOM.render( <VsilGallery dataurl='vsicons.json' prefix='https://vsicons.blob.core.windows.net/assets/DevEnv/' suffix='_16x.svg' limit='300'  /> , document.getElementById('VsilGallery'));
