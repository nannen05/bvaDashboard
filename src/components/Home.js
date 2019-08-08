import React, { Component } from 'react';
import { connect } from "react-redux";
import logo from '../logo.svg';
import '../App.css';
import * as actions from "../store/actions";
import { withRouter } from 'react-router-dom'

import Weather from './Weather/Weather'

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="App grid">
        <div className="">
          <Weather/>
        </div>
      </div>
    );
  }
}

export default withRouter(connect(null, actions)(Home));
