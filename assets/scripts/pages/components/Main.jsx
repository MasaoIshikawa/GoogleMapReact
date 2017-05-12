import React from 'react';
import _ from 'lodash';

import { withRouter } from 'react-router';
import classNames from 'classnames';

import GoogleMapReact from 'google-map-react';
import GMap from './GMap';
import {markersData_Address} from './data/branches';

@withRouter
export default class Main extends React.Component {  
  state = {
    data: [],
    detail: null,
    showDetail: false,
  }
  componentDidMount() {
    let data = [];
    let number = 0;
    _.map(markersData_Address, (m, index) => {      
      // if(index < 10)
      data.push({
        id: index,
        lat: parseFloat(m.lat),
        lng: parseFloat(m.long),
        number: index,
        detail: m
      });
    });
    this.setState({data: data});
  }

  onClick(index){
    const {data} = this.state;
    if(data.length > index && index >= 0){
      let detail = data[index].detail;
      detail.number = index;
      this.setState({detail: detail, showDetail: true});
    }    
  }

  onClick_close(){
    this.setState({showDetail: false})
  }

  render() {
    const {detail, showDetail} = this.state
    return (
      <div className='layout'>
        <header className='header'>
          <div>
            Clustering example google-map-react (zoom, move to play with)
          </div>          
        </header>
        <main className='main'>
          <div className='map'>
            <GMap markers={this.state.data} onClick={::this.onClick}/>
          </div>
          {detail && showDetail && 
          <div className='detail_panel'>
            <div className='title'> 
              <div className='detail_title'>Details of Branch: {detail.branch}</div>
              <div className='close_button' onClick={::this.onClick_close}/>
            </div>
            <div className='details'>
              <div className='detail_line'><div className='field'>Number:</div> <div className='value'>{detail.number}</div></div>
              <div className='detail_line'><div className='field'>Branch:</div> <div className='value'>{detail.branch}</div></div>
              <div className='detail_line'><div className='field'>Manager:</div> <div className='value'>{detail.manager}</div></div>
              <div className='detail_line'><div className='field'>Address:</div> <div className='value'>{detail.address}</div></div>
              <div className='detail_line'><div className='field'>Phone:</div> <div className='value'>{detail.phone}</div></div>
              <div className='detail_line'><div className='field'>Store Type:</div> <div className='value'>{detail.storeType}</div></div>
              <div className='detail_line'><div className='field'>Sales Type:</div> <div className='value'>Local</div></div>
              <div className='detail_line'><div className='field'>Classification:</div> <div className='value'>{detail.classification}</div></div>
              <div className='detail_line'><div className='field'>Master Branch:</div> <div className='value'>{detail.masterBranch}</div></div>
              <div className='detail_line'><div className='field'>Latitude:</div> <div className='value'>{detail.lat}</div></div>
              <div className='detail_line'><div className='field'>Longitude:</div> <div className='value'>{detail.long}</div></div>
              <div className='detail_line'><div className='field'>STATUS:</div> <div className='value'>{detail.status}</div></div>
            </div>
          </div>
          }
        </main>
      </div>
    );
  }
}