import React from 'react';
import { defaultProps, compose } from 'recompose';
// import mapPropsOnChange from 'recompose/mapPropsOnChange';
import { Motion } from 'react-motion';
import { clusterMarkerHOC } from './ClusterMarker';


export class simpleMarker extends React.Component{
  componentDidMount() {
    console.log('simple Marker');
  }

  render(){
    const {styles, defaultMotionStyle, motionStyle} = this.props
    console.log('render', this.props);
    return (
      <Motion
        defaultStyle={defaultMotionStyle}
        style={motionStyle}
      >
      {
        ({ scale }) => (
          <div
            className='marker'
            style={{
              transform: `translate3D(0,0,0) scale(${scale}, ${scale})`,
            }}
          >
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
    hoveredScale: 0.7,
  }),
  // resuse HOC
  clusterMarkerHOC
);

export default simpleMarkerHOC(simpleMarker);
