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
    data: [{lat: -7.0796144, lng: -41.432841800000006}]
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
    let self = this;
    _.map(markersData_Address, (m, index) => {
      let address = m.address + ', Brazil';
      address = address.replace(/None /g, '');
      
      geocoder.geocode( { 'address': address}, function(results, status) {
        // if(address == 'FELIPE DE OLIVEIRA PORTO ALEGRE RS 90630000, Brazil'){
        //   console.log('-------------found');
        // }
        // console.log('address = ', address, results);
        if (status == google.maps.GeocoderStatus.OK) {
          var latitude = results[0].geometry.location.lat();
          var longitude = results[0].geometry.location.lng();
          data.push({id: index, lat: latitude, lng: longitude});
          if(data.length> 7){
            // if(markersData_Address.length - 1 == index){
              console.log('called', data.length);
              self.setState({data: data});
            // }
          }
        }        
      }); 
    });

    // var address =   "FELIPE DE OLIVEIRA   PORTO ALEGRE RS 90630000, Brazil";
    // geocoder.geocode( { 'address': address}, function(results, status) {
    //     console.log('address = ', address, results);
    //     if (status == google.maps.GeocoderStatus.OK) {
    //       var latitude = results[0].geometry.location.lat();
    //       var longitude = results[0].geometry.location.lng();
    //       console.log('address = ', address, latitude, longitude);
    //     } 
    //   }); 
  }

  render() {
    return (
      <GMap markers={this.state.data}/>
    );
  }
}