import React, {useState,useContext,useEffect,useRef} from 'react';
import 'yashe/dist/yashe.min.css';
import {ShapesContext} from '../App';


let YASHE = require('yashe');

let Editor = require('../entities/editor.js');

let tokenUtils = require('../utils/tokenUtils.js');


function EditorComp() {

  const [yashe,setYashe] = useState(null);
  const textAreaRef = useRef(null);
  const context = useContext(ShapesContext);

  useEffect(() => {
    
        if (!yashe) {
            const options = {
                persistent:false,
                lineNumbers: true,
                viewportMargin: Infinity
            }
            
            const y = YASHE.fromTextArea(
                textAreaRef.current, 
                options)

             y.on('blur', function() {
                if(!y.hasErrors(y)){

                    let tokens = tokenUtils.getTokens();
                    let defShapes = tokenUtils.getDefinedShapes(tokens);
                    let newShapes = tokenUtils.getShapes(defShapes);
              
                 
                    context.replaceShapes(newShapes);
                }
            });

            y.on('humanEvent', function(shapes) {
                Editor.getInstance().draw(shapes);
            });


            //y.setValue(value)
            y.refresh();
            setYashe(y);

            Editor.getInstance().setYashe(y);
        }
    }, [yashe]
    );

    return  (<div className='col-lg show'>
                <textarea ref={textAreaRef}/>
            </div>            
    );

/*
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

  */
  
 
  
    
}



export default EditorComp;

