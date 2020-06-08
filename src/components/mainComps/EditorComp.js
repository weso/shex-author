import React, {useState,useContext,useEffect,useRef} from 'react';
import 'yashe/dist/yashe.min.css';
import {AppContext} from '../../App';
import {DEFAULTS} from '../../conf/config';

import CodeMirror from 'codemirror';
import YASHE from 'yashe';
import Editor from '../../entities/editor';

import yasheUtils from '../../utils/yasheUtils';
import {defaultExample} from '../../galery/defaultExample';
import Prefix from '../../entities/shexEntities//others//prefix';

import {undo,redo} from '../../utils/toolbarUtils';

import '../../css/Yashe.css';
import '../../css/themes/author.css';
import '../../css/themes/author-dark.css';

const ERROR_EDITOR_MSG = 'Ops... There are some errors in the editor';
const COMPLEX_SHAPE_MSG = 'Sorry that Shape is too complex for me';

function EditorComp() {

    const context = useContext(AppContext);
    const [yashe,setYashe] = useState(null);
    const divRef = useRef(null);
    

    const defaultPrefixes = [
                new Prefix('','http://example.org/',0),
                new Prefix('schema','http://schema.org/',1),
                new Prefix('xsd','http://www.w3.org/2001/XMLSchema#',2)
    ]

    useEffect(() => {
    
        if (!yashe) {
            const options = {
                persistent:false,
                showThemeButton:false,
                theme:'author-dark',
                value:defaultExample
            }
            
            const y = YASHE(divRef.current,options);

            
            y.on('humanEvent', function(shapes,width) {
                yasheUtils.draw(shapes);
                y.isComplex=false;
                y.oldShapes = shapes;
                let data={size:{width:width}};
                context.handleResize(null,data);
            });

            y.on('forceReplacement', function(shapes,width) {
                y.isComplex=false;
                y.oldShapes = replaceShapes();
            });

            y.on('convert',function(){
                if(!y.hasErrors(y)){
                    hideError();
                    updateAssist();
                }else{
                    hideError();
                    hideConvert();
                    loading();
                    setTimeout(function() {
                        loaded();  
                        showConvert();
                        showError(ERROR_EDITOR_MSG);
                    },500) 
                }
            })

            //When the sinc is activated we activate the appropriate handlers 
            //Otherwise it will be desactivated
            y.on('sinc', function(sinc) {
                if(sinc){
                    y._handlers.focus = null;
                    hideConvert();
                    if(y.isComplex)showError(COMPLEX_SHAPE_MSG);
                    if(y.hasErrors(y))showError(ERROR_EDITOR_MSG);
                    let isErrMsg=false;
                    y.on('keyup',yasheUtils.debounce(function( e ) {
                        if(!y.hasErrors(y)){
                            hideError();
                            updatePrefixes();
                            if(isErrMsg){   
                                isErrMsg=false;
                                updateAssist();
                            }else{
                                let newShapes = yasheUtils.getShapes();
                                if(y.oldShapes.length == newShapes.length){ //Any new shape?
                                    //Nope
                                    if(newShapes.toString()!=y.oldShapes.toString()){ //Any update?
                                        //Yes
                                        y.isComplex=false;
                                        y.oldShapes = replaceShapes();
                                    }
                                }else{
                                    updateAssist();
                                } 

                            }
                            
                        }else{
                            isErrMsg=true;
                            showError(ERROR_EDITOR_MSG);
                        }   
                    }, 500));


                }else{
                    //Not really elegant I know     
                    y._handlers.keyup = null; 
                    y._handlers.keyHandled = null; 
                    if(y.hasErrors(y))showConvert();
                    if(y.isComplex)showConvert();
                    y.on('focus', function() {
                       showConvert();
                    });       
                }
                
            });

            y.on('prefixChange', function(prefixes,width) {
                yasheUtils.draw(y.oldShapes,prefixes);
               // let data={size:{width:width}};
               // context.handleResize(null,data); */
            });

            y.on('undo', function(prefixes,width) {
                undo();
                updateAssist();
            });

             y.on('redo', function(prefixes,width) {
                redo();
                updateAssist();
            });


            y.on('forceError', function(prefixes) {
                y.isComplex=true;
                hideError();
                loading();
                setTimeout(function() {
                    loaded(); 
                    showError(COMPLEX_SHAPE_MSG);
                    if(!DEFAULTS.sincronize)showConvert();
                },500)
            });

            y.on('delete', function() {
                y.isComplex=false;
                y.oldShapes = replaceShapes();
                updatePrefixes(defaultPrefixes);
            });

            y.on('upload', function() {
                if(!y.hasErrors()){                   
                    updateAssist();
                    updatePrefixes();
                }
            });

            //Load example from Galery
            y.on('galery', function() {
                if(!y.hasErrors()){                   
                    updateAssist();
                    updatePrefixes();
                }
            });

        
            y.refresh();
            setYashe(y);
            

            Editor.getInstance().setYashe(y);

            y.oldShapes = replaceShapes();
            updatePrefixes(defaultPrefixes)

            CodeMirror.signal(y,'sinc',DEFAULTS.sincronize);
        }
    }, [yashe]
    );

    

    const replaceShapes = function(){
        let newShapes = yasheUtils.getShapes();
        context.replaceShapes(newShapes);
        return newShapes;
    }

    const updatePrefixes = function(prefixes){
        if(!prefixes) prefixes = yasheUtils.getPrefixes();
        context.replacePrefixes(prefixes);
        return prefixes;
    }


    const updateAssist = function(){
        let yashe = Editor.getYashe();
        hideConvert();
        loading();
        setTimeout(function() {
            yashe.isComplex=false;  
            yashe.oldShapes = replaceShapes();               
            loaded();
        },500)
    }


     const animate = function(before1,after1,before2,after2){
        let e1 = document.getElementsByClassName(before1)[0];
        if(e1) e1.className = after1;
        let e2 = document.getElementsByClassName(before2)[0];
        if(e2) e2.className = after2;
     }

    const loading = function(){
        animate('showAsist','hideAsist','hideLoader','showLoader');
    }

    const loaded = function(){
         animate('showLoader','hideLoader','hideAsist','showAsist');
    }

    const showError = function(err){
        animate('hideError','showError','showAsist','hideAsist');
        document.getElementsByClassName('errorMsg')[0].textContent = err;
    }

    const showConvert = function(err){
        animate('hideConvert','showConvert','showAsist','hideAsist');
    }

    const hideError = function(){
        animate('showError','hideError','hideAsist','showAsist');
    }

    const hideConvert = function(){
        animate('showConvert','hideConvert','hideAsist','showAsist');
    }


    return  (<div id='editorComp' className="col edit" ref={divRef}/>);

}

   
export default EditorComp;

