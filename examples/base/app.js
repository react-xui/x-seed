import React from 'react';
import ReactDOM from 'react-dom';
import Seed from '../../lib/index';

var appElement = document.getElementById('example');

var App = React.createClass({

  getInitialState: function() {
    return { show: false };
  },

  testFunc: function() {
    this.setState({ show: true });
  },

  render: function() {
    return (<div><button onClick={this.testFunc}>测试方法</button>{this.state.show ? <Seed/> : undefined}</div>)
  }
});

ReactDOM.render(<App/>, appElement);
