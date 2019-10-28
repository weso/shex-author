import React, {Component} from 'react';
import 'yashe/dist/yashe.min.css';



let YASHE = require('yashe');

let Editor = require('../entities/editor.js');
let ShapeStore = require('../entities/shapeStore.js');

let tokenUtils = require('../utils/tokenUtils.js');


class EditorComp extends Component {


  constructor(props){
    super(props);

    this.replaceShapes = this.props.replaceShapes.bind(this);
  }

  componentDidMount(){
    
    let yashe = YASHE(document.getElementById("showcase"),
          {
              persistent:false,
              lineNumbers: true,
              viewportMargin: Infinity
          });

    
      yashe.replaceShapes=this.replaceShapes;

      yashe.on('blur', function() {
             
          if(!yashe.hasErrors(yashe)){

              let tokens = tokenUtils.getTokens();
              let defShapes = tokenUtils.getDefinedShapes(tokens);
              let newShapes = tokenUtils.getShapes(defShapes);
         
              yashe.replaceShapes(newShapes);
          }
      });


      yashe.on('humanEvent', function(shapes) {
          Editor.getInstance().draw(shapes);
      });

    
    Editor.getInstance().setYashe(yashe);
    
  }
  

  


  render(){
      return  <div id='showcase' className='col-lg show'/>
  }
    
}



export default EditorComp;

