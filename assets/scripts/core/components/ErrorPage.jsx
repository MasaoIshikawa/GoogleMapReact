import React from 'react'

export default class ErrorPage extends React.Component {
  render() {
    return (
      <div className="hold-transition skin-ttf sidebar-collapse">
        <div className="wrapper">
          <div className="content-wrapper">
            <div className="container-fluid">
              <div className="row">
                <div className="col-sm-6 col-sm-offset-3">
                  <h1>Oops</h1>
                  <p>There was problem processing your request. Please try again.</p>
                </div>
              </div>
            </div>
          </div>
          <footer className="main-footer">
            Copyright © 2017 <a href="https://react.thinkcrew.com">ThinkCrew</a>. All rights reserved.
          </footer>
        </div>
      </div>
    )
  }
}

