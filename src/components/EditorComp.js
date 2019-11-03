import React, {useState,useContext,useEffect,useRef} from 'react';
import 'yashe/dist/yashe.min.css';
import {ShapesContext} from '../App';


const YASHE = require('yashe');

const Editor = require('../entities/editor.js');

const yasheUtils = require('../utils/yasheUtils.js');


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
                    replaceShapes();
                    updatePrefixes();
                }
            });


            y.on('change', function(shapes) {
               y.refresh();
            });

            y.on('humanEvent', function(shapes) {
                Editor.getInstance().draw(shapes);
            });


            y.on('prefixUpdate', function(shapes) {
                updatePrefixes();
            });

            y.on('themeChange', function(shapes) {
                changeThemeStyle();
            });

            y.on('delete', function(shapes) {
                replaceShapes();
                updatePrefixes();
            });


            y.setValue(yasheUtils.DEFAULT_SHAPE)
            y.refresh();
            setYashe(y);
            
            Editor.getInstance().setYashe(y);
            replaceShapes();
            updatePrefixes();
        }
    }, [yashe]
    );

    const replaceShapes = ()=>{
        context.replaceShapes(yasheUtils.replaceShapes());
    }

    const updatePrefixes = ()=>{
        context.updatePrefixes(yasheUtils.updatePrefixes());
    }

     const changeThemeStyle = ()=>{
         context.changeThemeStyle();
    }



    return  (<div className='col show'>
                <textarea ref={textAreaRef}/>
            </div>            
    );

}



export default EditorComp;

