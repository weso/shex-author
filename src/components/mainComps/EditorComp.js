import React, {useState,useContext,useEffect,useRef} from 'react';
import 'yashe/dist/yashe.min.css';
import {AppContext} from '../../App';

import YASHE from 'yashe';
import Editor from '../../entities/editor';

import yasheUtils from '../../utils/yasheUtils';

import '../../css/Yashe.css';

function EditorComp() {

  const [yashe,setYashe] = useState(null);
  const divRef = useRef(null);
  const context = useContext(AppContext);
  let oldShapes = [];

    useEffect(() => {
    
        if (!yashe) {
            const options = {
                persistent:false,
                lineNumbers: true,
                showTooltip:true,
                value:yasheUtils.DEFAULT_SHAPE
            }
            
            const y = YASHE(divRef.current,options);

            
            y.on('humanEvent', function(shapes) {
                Editor.getInstance().draw(shapes);
            });

            /*
            y.on('keyup',function(){
                if(!y.hasErrors(y)){
                    let newShapes = getNewShapes();
                    if(oldShapes.length == newShapes.length){ //Any new shape?
                        if(newShapes.toString()!=oldShapes.toString()){ //Any cupdate?
                            oldShapes = replaceShapes(newShapes);
                        }
                    }else{
                        updateAssist();
                    } 
                }   
            });
            */

           
            y.on('prefixUpdate', function() {
                updatePrefixes();
            });
            

            y.on('delete', function() {
                oldShapes = replaceShapes(getNewShapes());
                updatePrefixes();

            });

            y.on('upload', function() {
                if(!y.hasErrors()){                   
                    updateAssist();
                }
            });
           

            y.on('blur', function() {
                if(!y.hasErrors()){                   
                    updateAssist();
                }
            });

            //Fired after a key is handled through a key map
            //(for example "Ctrl-Z")
            /*
            y.on('keyHandled', function() {
                if(!y.hasErrors()){
                    oldShapes = replaceShapes(getNewShapes());
                    updatePrefixes();
                }
            });

            */

            //Load example from Galery
            y.on('galery', function() {
                if(!y.hasErrors()){                   
                    updateAssist();
                }
            });

            y.on('themeChange', function() {
               
            });
        
            y.refresh();
            setYashe(y);
            
            Editor.getInstance().setYashe(y);

            oldShapes = replaceShapes(getNewShapes());
            updatePrefixes();

            
        }
    }, [yashe]
    );

    

    const getNewShapes = function() {
        return yasheUtils.replaceShapes();
    }

    const replaceShapes = (newShapes)=>{
        context.replaceShapes(newShapes);
        return newShapes;
    }

    const updatePrefixes = function(){
        context.updatePrefixes(yasheUtils.updatePrefixes());
    }


    const updateAssist = function(){
        loading();
        setTimeout(function() {  
            oldShapes = replaceShapes(getNewShapes());
            updatePrefixes();                       
            loaded();
        },500)
    }

    const loading = function(){
        context.setLoading('showLoader');
        context.setAsist('hideAsist');
    }

    const loaded = function(){
        context.setLoading('hideLoader');
        context.setAsist('showAsist');
    }



    return  (<div className="col edit" ref={divRef}/>);

}

    /*
        let valid = true;
        if(newShapes==null){
            valid = false;
            newShapes=[];
        }
         context.replaceShapes(newShapes,valid);

        */



/*

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

    */




/*
            y.on('themeChange', function() {
                changeThemeStyle();
            });

*/




export default EditorComp;

