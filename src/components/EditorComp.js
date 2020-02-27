import React, {useState,useContext,useEffect,useRef} from 'react';
import 'yashe/dist/yashe.min.css';
import {ShapesContext} from '../App';

import YASHE from 'yashe';
import Editor from '../entities/editor';

import yasheUtils from '../utils/yasheUtils';

import '../css/Yashe.css';

function EditorComp() {

  const [yashe,setYashe] = useState(null);
  const divRef = useRef(null);
  const context = useContext(ShapesContext);
  let oldShapes = [];

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

                 y.on('humanEvent', function(shapes) {
                Editor.getInstance().draw(shapes);
            });


            y.on('keyup',function(){
                if(!y.hasErrors(y)){
                    let newShapes = getNewShapes();
                    if(oldShapes.length == newShapes.length){
                            if(newShapes.toString()!=oldShapes.toString()){
                                console.log('replace')
                                oldShapes = replaceShapes(newShapes);
                            }
                    }else{
                        context.setLoading('showLoader');
                        context.setAsist('hideAsist');
                        setTimeout(function() {  
                            oldShapes = replaceShapes(newShapes);
                            updatePrefixes();                       
                            context.setLoading('hideLoader');
                            context.setAsist('showAsist');
                        },500)
                    } 
                }
               
                });


                

            y.on('blur', function() {
                if(!y.hasErrors(y)){
                    oldShapes = replaceShapes(getNewShapes());
                    updatePrefixes();
                }
            });

      
           
            y.on('prefixUpdate', function() {
                updatePrefixes();
            });

/*
            y.on('themeChange', function() {
                changeThemeStyle();
            });

*/

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
           

            //Fired after a key is handled through a key map
            //(for example "Ctrl-Z")
            y.on('keyHandled', function() {
                if(!y.hasErrors()){
                    oldShapes = replaceShapes(getNewShapes());
                    updatePrefixes();
                }
            });

            //Load example from Galery
            y.on('galery', function() {
                if(!y.hasErrors()){
                    context.setLoading('showLoader');
                    context.setAsist('hideAsist');
                    setTimeout(function() {  
                        oldShapes = replaceShapes(getNewShapes());
                        updatePrefixes();                       
                        context.setLoading('hideLoader');
                        context.setAsist('showAsist');
                    },500)
                }
            });
            

            
            y.refresh();
            setYashe(y);
            
            Editor.getInstance().setYashe(y);

            oldShapes = replaceShapes(getNewShapes());
            updatePrefixes();

            
        }
    }, [yashe]
    );

    const debounce = function(func, wait, immediate) {
        let timeout; let result;
        return function() {
            const context = this; 
            const args = arguments;
            const later = function() {
            timeout = null;
            if (!immediate) result = func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) result = func.apply(context, args);
            return result;
        };
    };

    const getNewShapes = function() {
        return yasheUtils.replaceShapes();
    }

    const replaceShapes = (newShapes)=>{
        /*
        let valid = true;
        if(newShapes==null){
            valid = false;
            newShapes=[];
        }
         context.replaceShapes(newShapes,valid);

        */
        context.replaceShapes(newShapes);
        return newShapes;
    }

    const updatePrefixes = ()=>{
        context.updatePrefixes(yasheUtils.updatePrefixes());
    }

    return  (<div className="col edit" ref={divRef}/>);

}



export default EditorComp;

