import React from 'react';
import { defaultProps, compose } from 'recompose';
// import mapPropsOnChange from 'recompose/mapPropsOnChange';
import { Motion } from 'react-motion';
import { clusterMarkerHOC } from './ClusterMarker';
import {greatPlaceStyle, greatPlaceStyleOk} from '../data/marker';


export class simpleMarker extends React.Component{
  componentDidMount() {
    // console.log('simple Marker');
  }

  render(){
    const {styles, defaultMotionStyle, motionStyle, number, detail} = this.props

    const style = detail.status.toLowerCase() == 'ok' ? greatPlaceStyleOk : greatPlaceStyle;
    // console.log('render', this.props);
    return (      
      <div className="hint hint--html hint--info hint--top" style={style}>
          {number}
          {this.props.hovered && 
            <div className="hint__content detail_box">
              <div className='detail_line'> <div className='field'>Manager:</div> <div className='value'>{detail.manager}</div></div>
              <div className='detail_line'> <div className='field'>Phone: </div> <div className='value'>{detail.phone}</div></div>
              <div className='detail_line'> <div className='field'>Address: </div> <div className='value'>{detail.address}</div></div>
              <div className='detail_line'> <div className='field'>Status: </div> <div className='value'>{detail.status}</div></div>
            </div>
          }
       </div>
    );
  }
}

// export const simpleMarker = ({
//   styles,
//   defaultMotionStyle, motionStyle,
// }) => (
  
// );

export const simpleMarkerHOC = compose(
  defaultProps({
    initialScale: 0.3,
    defaultScale: 0.6,
    hoveredScale: 0.7,
  }),
  // resuse HOC
  clusterMarkerHOC
);

export default simpleMarkerHOC(simpleMarker);
