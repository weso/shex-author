import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import EditorComp from './components/EditorComp';
import AssistantComp from './components/AssistantComp';

let YASHE = require('yashe');
let ShapeStore = require('./entities/shapeStore.js');


class App extends Component {

  
  render(){
      return <div className="row separator"> 
        <AssistantComp shapes={ShapeStore.getInstance().getShapes()}/>
        <EditorComp/>
      </div>
  
  }
    

}


export default App;
