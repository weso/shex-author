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

    

      yashe.on('blur', function() {
          if(!yashe.hasErrors(yashe)){
              //updateAssistant();
              
              let tokens = tokenUtils.getTokens();
              let defShapes = tokenUtils.getDefinedShapes(tokens);
              let shapeStore = ShapeStore.getInstance();
              let shapes = tokenUtils.getShapes(defShapes);

              shapeStore.setShapes(shapes);
              shapeStore.setShapesCount(shapes.length)
             // cambia(shapes)

             
          }
      });


      yashe.on('humanEvent', function(shapes) {
          Editor.getInstance().draw(shapes);
      });

    
    Editor.getInstance().setYashe(yashe);
    
  }
  

  cambia(){

    let yashe = Editor.getInstance().getYashe();

    if(!yashe.hasErrors(yashe)){
              //updateAssistant();
              
              let tokens = tokenUtils.getTokens();
              let defShapes = tokenUtils.getDefinedShapes(tokens);
              //let shapeStore = ShapeStore.getInstance();
              let newShapes = tokenUtils.getShapes(defShapes);

              //shapeStore.setShapes(shapes);
              //shapeStore.setShapesCount(shapes.length)
             // cambia(shapes)
            
              this.replaceShapes(newShapes);
           //  this.setProps({shapes:newShapes});
    
    }
  

  }


  render(){
      return  <div id='showcase' className='col-lg show'>
      
      <button onClick={this.cambia.bind(this)}>Imprime</button></div>
  }
    
}



export default EditorComp;

