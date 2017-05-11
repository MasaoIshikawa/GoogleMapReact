import React from 'react';
import classNames from 'classnames';
import { IndexRoute, Route } from 'react-router';

import Root from './pages/Root';
import Main from './pages/components/Main';
/**
 * Includes Sidebar, Header and Footer.
 */

export default function({dispatch, getState}) {
  const requireLogin = (nextState, replace, cb) => {
    const check = () => {
      // const {session} = getState()
      // if (!session.has('user')) {
      //   replace({pathname: '/signin', query: {next: '/events'}})
      // }
      replace({pathname: '/main'})
      cb()
    }
    check()
    // const session = getState().session
    // if (session.get('initialized')) {
    //   check()
    // } else {
    //   dispatch(FETCH_SESSION()).then(check, check)
    // }
  }
  return (
    <Route path='/' component={Root}>
      <IndexRoute component={Map}/>
      <Route path='main' component={Main} />
	 </Route>
  )
}
