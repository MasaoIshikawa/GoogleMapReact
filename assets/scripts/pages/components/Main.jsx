import React from 'react';

import { withRouter } from 'react-router';
import classNames from 'classnames';

@withRouter
export default class Homepage extends React.Component {
  handleNavigation() {
    this.props.router.push('/');
  }

  render() {
    return (
      <div>
        hello
      </div>     
    );
  }
}