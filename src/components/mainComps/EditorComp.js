import React, {useState,useContext,useEffect,useRef} from 'react';
import 'yashe/dist/yashe.min.css';
import {AppContext} from '../../App';

import YASHE from 'yashe';
import Editor from '../../entities/editor';

import yasheUtils from '../../utils/yasheUtils';
import Prefix from '../../entities/shexEntities/shexUtils/prefix';

import '../../css/Yashe.css';
import '../../css/author.css';
import '../../css/author-dark.css';

function EditorComp() {

    const [yashe,setYashe] = useState(null);
    const divRef = useRef(null);
    const context = useContext(AppContext);
    let oldShapes = [];

    const defaultPrefixes = [
                new Prefix('','http://example.org/',0),
                new Prefix('schema','http://schema.org/',1),
                new Prefix('xsd','http://www.w3.org/2001/XMLSchema#',2)
    ]

    useEffect(() => {
    
        if (!yashe) {
            const options = {
                persistent:false,
                lineNumbers: true,
                showTooltip:true,
                theme:'author-dark',
                value:yasheUtils.DEFAULT_SHAPE
            }
            
            const y = YASHE(divRef.current,options);

            
            y.on('humanEvent', function(shapes) {
                Editor.getInstance().draw(shapes);
                //console.log(shapes)
                oldShapes = shapes;
            });

            y.on('prefixChange', function(prefixes) {
                Editor.getInstance().draw(oldShapes,prefixes);
            });

            

            
            y.on('keyup',function(){
                if(!y.hasErrors(y)){
                    hideError();
                    let newShapes = getNewShapes();
                    //console.log(newShapes)
                    if(oldShapes.length == newShapes.length){ //Any new shape?
                        if(newShapes.toString()!=oldShapes.toString()){ //Any cupdate?
                            oldShapes = replaceShapes(newShapes);
                        }
                    }else{
                        updateAssist();
                    } 
                }else{
                    showError();
                }   
            });
            
   

            y.on('delete', function() {
                oldShapes = replaceShapes(getNewShapes());
                updatePrefixes(defaultPrefixes);
            });

            y.on('upload', function() {
                if(!y.hasErrors()){                   
                    updateAssist();
                    updatePrefixes(getNewPrefixes());
                }
            });
           

            /*
            y.on('blur', function() {
                if(!y.hasErrors()){                   
                    updateAssist();
                    updatePrefixes(getNewPrefixes());
                }
            });
            */

            //Fired after a key is handled through a key map
            //(for example "Ctrl-Z")
            
            y.on('keyHandled', function() {
                if(!y.hasErrors()){
                    oldShapes = replaceShapes(getNewShapes());
                    updatePrefixes(getNewPrefixes());
                }
            });

            

            //Load example from Galery
            y.on('galery', function() {
                if(!y.hasErrors()){                   
                    updateAssist();
                    updatePrefixes(getNewPrefixes());
                }
            });

        
            y.refresh();
            setYashe(y);
            
            Editor.getInstance().setYashe(y);

            oldShapes = replaceShapes(getNewShapes());
            updatePrefixes(defaultPrefixes)
        }
    }, [yashe]
    );

    

    const getNewShapes = function() {
        return yasheUtils.replaceShapes();
    }

    const getNewPrefixes = function() {
        return yasheUtils.updatePrefixes();
    }

    const replaceShapes = (newShapes)=>{
        context.replaceShapes(newShapes);
        return newShapes;
    }

    const updatePrefixes = (newPrefixes)=>{
        context.replacePrefixes(newPrefixes);
        return newPrefixes;
    }


    const updateAssist = function(){
        loading();
        setTimeout(function() {  
            oldShapes = replaceShapes(getNewShapes());                
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

    const showError = function(){
        context.setError('showError');
        context.setAsist('hideAsist');
    }

    const hideError = function(){
        context.setError('hideError');
        context.setAsist('showAsist');
    }


    return  (<div className="col edit" ref={divRef}/>);

}

   
export default EditorComp;

