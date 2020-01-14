import React, {useState,useContext,useEffect,useRef} from 'react';
import 'yashe/dist/yashe.min.css';
import {ShapesContext} from '../App';

import YASHE from 'yashe';
import Editor from '../entities/editor';

import yasheUtils from '../utils/yasheUtils';

function EditorComp() {

  const [yashe,setYashe] = useState(null);
  const divRef = useRef(null);
  const context = useContext(ShapesContext);


    useEffect(() => {
    
        if (!yashe) {
            const options = {
                persistent:false,
                lineNumbers: true,
                showTooltip:false,
                value:yasheUtils.DEFAULT_SHAPE
            }
            
            const y = YASHE(
                divRef.current, 
                options)

             y.on('blur', function() {
                if(!y.hasErrors(y)){
                    replaceShapes();
                    updatePrefixes();
                }
            });


             
            y.on('humanEvent', function(shapes) {
                Editor.getInstance().draw(shapes);
                console.log(shapes)
            });


            y.on('prefixUpdate', function() {
                updatePrefixes();
            });


            y.on('delete', function() {
                replaceShapes();
                updatePrefixes();

            });

            y.on('upload', function() {
                //TimeOut necesary
                setTimeout(function(){
                  replaceShapes();
                  updatePrefixes();
                }, 10);
                
            });


            y.on('keydown', function() {
                 setTimeout(function(){
                    if(!y.hasErrors()){
                        replaceShapes();
                        updatePrefixes();
                    }
                }, 20);
                
            });


            //Fired after a key is handled through a key map
            //(for example "Ctrl-Z")
            y.on('keyHandled', function() {
                if(!y.hasErrors()){
                    replaceShapes();
                    updatePrefixes();
                }
            });

            
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

    return  (<div className="col edit" ref={divRef}/>);

}

export default EditorComp;

