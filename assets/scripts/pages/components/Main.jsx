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
    filteredData: [],
    detail: null,
    showDetail: false,
    storeType: [],
    salesType: [],
    classification: [],
    masterBranch: [],
    status: [],
  }
  componentDidMount() {
    let data = [];
    let number = 0;
    let storeType = ['All'];
    let salesType = ['All'];
    let classification = ['All'];
    let masterBranch = ['All'];
    let status = ['All'];
    _.map(markersData_Address, (m, index) => {      
      // if(index < 10)
      data.push({
        id: index,
        lat: parseFloat(m.lat),
        lng: parseFloat(m.long),
        number: index,
        detail: m
      });
      if(storeType.indexOf(m.storeType) == -1)
        storeType.push(m.storeType);
      if(classification.indexOf(m.classification) == -1)
        classification.push(m.classification);
      if(masterBranch.indexOf(m.masterBranch) == -1)
        masterBranch.push(m.masterBranch);
      if(status.indexOf(m.status) == -1)
        status.push(m.status);
    });    
    this.setState({
      data: data, 
      filteredData: data.slice(),
      storeType: storeType.sort(), 
      salesType: salesType.sort(), 
      classification: classification.sort(), 
      masterBranch: masterBranch.sort(),
      status: status.sort(),
    });
  }

  onClick(index){
    const {data} = this.state;
    if(data.length > index && index >= 0){
      let detail = data[index].detail;
      detail.number = index;
      this.setState({detail: detail, showDetail: true});
    }    
  }

  onChange_dropdown(e){
    let storeType = this.refs.storeType.value;
    let salesType = this.refs.salesType.value;
    let classification = this.refs.classification.value;
    let masterBranch = this.refs.masterBranch.value;
    let status = this.refs.status.value;

    // console.log(storeType, salesType, classification, masterBranch, status);
    let {data} = this.state;
    let filtered = [];
    _.map(data, (d, index)=>{
      let exclude = false
      if(storeType != 'All' && storeType != d.detail.storeType)
        exclude = true
      if(salesType != 'All' && salesType != d.detail.salesType)
        exclude = true
      if(classification != 'All' && classification != d.detail.classification)
        exclude = true
      if(masterBranch != 'All' && masterBranch != d.detail.masterBranch)
        exclude = true
      if(status != 'All' && status != d.detail.status)
        exclude = true
      if(!exclude){
        filtered.push(d);
      }
    });
    this.setState({filteredData: filtered});
  }

  onClick_close(){
    this.setState({showDetail: false})
  }

  render() {
    const {detail, showDetail, filteredData, storeType, salesType, classification, masterBranch, status} = this.state

    let dropdown_storeType = _.map(storeType, (type, index)=>{
      return (<option key={type} value={type}>{type}</option>)
    })
    let dropdown_salesType = _.map(salesType, (type, index)=>{
      return (<option key={type} value={type}>{type}</option>)
    })
    let dropdown_classification = _.map(classification, (type, index)=>{
      return (<option key={type} value={type}>{type}</option>)
    })
    let dropdown_masterBranch = _.map(masterBranch, (type, index)=>{
      return (<option key={type} value={type}>{type}</option>)
    })
    let dropdown_status = _.map(status, (type, index)=>{
      return (<option key={type} value={type}>{type}</option>)
    })

    return (
      <div className='layout'>
        <header className='header'>
          <div className='dropdown'>
            Store Type: 
            <select ref='storeType' onChange={::this.onChange_dropdown}>
              {dropdown_storeType}
            </select>
          </div>
          <div className='dropdown'>
            Sales Type: 
            <select ref='salesType' onChange={::this.onChange_dropdown}>
              {dropdown_salesType}
            </select>
          </div>
          <div className='dropdown'>
            Classification: 
            <select ref='classification' onChange={::this.onChange_dropdown}>
              {dropdown_classification}
            </select>
          </div>
          <div className='dropdown'>
            Master Branch: 
            <select ref='masterBranch' onChange={::this.onChange_dropdown}>
              {dropdown_masterBranch}
            </select>
          </div>
          <div className='dropdown'>
            Status: 
            <select ref='status' onChange={::this.onChange_dropdown}>
              {dropdown_status}
            </select>
          </div>
          <div className='dropdown'>
            Showing: {filteredData.length}
          </div>
        </header>
        <main className='main'>
          <div className='map'>
            <GMap markers={filteredData} onClick={::this.onClick}/>
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