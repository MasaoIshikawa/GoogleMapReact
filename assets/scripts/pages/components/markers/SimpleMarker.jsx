import React from 'react';
import { defaultProps, compose } from 'recompose';
// import mapPropsOnChange from 'recompose/mapPropsOnChange';
import { Motion } from 'react-motion';
import { clusterMarkerHOC } from './ClusterMarker';
import {greatPlaceStyle, greatPlaceStyleHover} from '../data/marker';


export class simpleMarker extends React.Component{
  componentDidMount() {
    // console.log('simple Marker');
  }

  render(){
    const {styles, defaultMotionStyle, motionStyle, number} = this.props
    const style = this.props.$hover ? greatPlaceStyleHover : greatPlaceStyle;
    console.log('render', this.props);
    return (      
      <div className="hint hint--html hint--info hint--top" style={style}>
          {number}
          {this.props.$hover && 
            <div style={{width: 80}} className="hint__content">
            Сlick me
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
