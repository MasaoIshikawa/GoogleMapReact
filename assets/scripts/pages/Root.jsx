import classNames from 'classnames'
import React from 'react'
import {connect} from 'react-redux'
import Modal from 'react-modal'
import DevTools from '../core/components/DevTools'

const debug = process.env.NODE_ENV !== 'production'

@connect((state) => {
  return {
    navigation: state.navigation.toJS()
  }
}, {})
class Root extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    const {navigation} = this.props
    // console.log('navi = ', navigation)
    return (
      <div id='root'>
        {this.props.children}          
      </div>
    )
  }
}
export default Root
