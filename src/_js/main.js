'use strict'
import * as axios from 'axios';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
    SearchBox,
    FocusZone,
    FocusZoneDirection,
    List,
    Link,
    Image,
    ImageFit
} from 'office-ui-fabric-react/lib/index';

export class Search extends React.Component < any, any > {
    render() {
        return ( <div className='search'><SearchBox /></div>
        );
    }
}

ReactDOM.render( <Search / > , document.getElementById('rcSearch'));

class Gallery extends React.Component {
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
      <ul className='gallery'>
          {this.state.items.map((item)=>{
            return (
              <li className='gallery-item' title={ item.name }>
                <div className='center-both'>
                  <Link href={ this.props.prefix + item.name + '\\' + item.name + this.props.suffix } target='_blank'>
                    <Image src={ this.props.prefix + item.name + '\\' + item.name + this.props.suffix } alt={` ${item.name} doesn't have default thumbnail `} height={16} width={16} />
                  </Link>
                </div>
              </li>
            );
          })}
      </ul>
    );
  }
}

ReactDOM.render( <Gallery dataurl='vsicons.json' prefix='https://vsicons.blob.core.windows.net/assets/DevEnv/' suffix='_16x.png' /> , document.getElementById('rcGallery'));
