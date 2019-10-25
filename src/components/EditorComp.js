import React, {Component} from 'react';
import 'yashe/dist/yashe.min.css';


let YASHE = require('yashe');
let Editor = require('../entities/editor.js');
let tokenUtils = require('../utils/tokenUtils.js');


class EditorComp extends Component {

  componentDidMount(){
    
    let yashe = YASHE(document.getElementById("showcase"),
          {
              persistent:false,
              lineNumbers: true,
              viewportMargin: Infinity
          });

    

      yashe.on('blur', function() {
          if(!yashe.hasErrors(yashe)){
              //updateAssistant();
              let tokens = tokenUtils.getTokens();
              let defShapes = tokenUtils.getDefinedShapes(tokens);
              //let shapeStore = ShapeStore.getInstance();
              let shapes = tokenUtils.getShapes(defShapes);
             
          }
      });

    
    Editor.getInstance().setYashe(yashe);

  }


  render(){
      return  <div id='showcase' className='col-lg show'></div>
  
  }
    
}


export default EditorComp;
