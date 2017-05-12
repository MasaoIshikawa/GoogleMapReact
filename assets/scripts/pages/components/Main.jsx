import React from 'react';
import _ from 'lodash';

import { withRouter } from 'react-router';
import classNames from 'classnames';

import GoogleMapReact from 'google-map-react';
import GMap from './GMap';
import {markersData_Address} from './data/branches';

const AnyReactComponent = ({ text }) => (
  <div style={{
    position: 'relative', color: 'white', background: 'red',
    height: 40, width: 60, top: -20, left: -30,    
  }}>
    {text}
  </div>
);


@withRouter
export default class Main extends React.Component {
  static defaultProps = {
    center: {lat: 59.95, lng: 30.33},
    zoom: 11
  };

  state = {
    data: []
  }

  handleNavigation() {
    this.props.router.push('/');
  }
  componentDidMount() {
    var geocoder = new google.maps.Geocoder();
    //var address = "new york";

    // console.log(markersData_Address);
    let data = [];
    let number = 0;
    _.map(markersData_Address, (m, index) => {      
      data.push({
        id: index,
        lat: parseFloat(m.lat),
        lng: parseFloat(m.long),
        detail: m
      });
    });
    this.setState({data: data});
  }

  render() {
    return (
      <GMap markers={this.state.data}/>
    );
  }
}