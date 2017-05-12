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
    const {styles, defaultMotionStyle, motionStyle} = this.props
    const style = this.props.$hover ? greatPlaceStyleHover : greatPlaceStyle;
    console.log('render', this.props);
    return (
      <Motion
        defaultStyle={defaultMotionStyle}
        style={motionStyle}
      >
      {
        ({ scale }) => (
          <div
            className='marker1'
            style={{
              transform: `translate3D(0,0,0) scale(${scale}, ${scale})`,
            }}
          >
           <div style={style}>
              vdg
           </div>
          </div>
        )
      }
      </Motion>
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
    hoveredScale: 0.75,
  }),
  // resuse HOC
  clusterMarkerHOC
);

export default simpleMarkerHOC(simpleMarker);
