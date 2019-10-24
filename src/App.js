import React, {useState, useEffect, useRef} from 'react';
import logo from './logo.svg';
import './App.css';

import Editor from './components/Editor';
import Assistant from './components/Assistant';

function App() {

    return (
      
      <div className="row separator"> 
        <Assistant/>
        <Editor/>
      </div>

    );

}

export default App;
