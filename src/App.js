import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import EditorComp from './components/EditorComp';
import AssistantComp from './components/AssistantComp';


class App extends Component {

  
  render(){
      return <div className="row separator"> 
        <AssistantComp/>
        <EditorComp/>
      </div>
  
  }
    

}


export default App;
