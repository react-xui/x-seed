import React from 'react';
import ReactDOM from 'react-dom';
import Seed from '../src/index';

var appElement = document.getElementById('example');
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {show:false};
  }
  testFunc(){
    this.setState({show:true});
  }
  render(){
    return  (
    <div><button onClick={this.testFunc.bind(this)}>测试方法1</button>{this.state.show ? <Seed/> : undefined}</div>
    )
  }
}
ReactDOM.render(<App/>, appElement);