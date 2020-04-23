import React, {useState,useContext,useEffect,useRef} from 'react';
import 'yashe/dist/yashe.min.css';
import {AppContext} from '../../App';
import {DEFAULTS} from '../../conf/config';

import CodeMirror from 'codemirror';
import YASHE from 'yashe';
import Editor from '../../entities/editor';

import yasheUtils from '../../utils/yasheUtils';
import Prefix from '../../entities/shexEntities/shexUtils/prefix';

import '../../css/Yashe.css';
import '../../css/themes/author.css';
import '../../css/themes/author-dark.css';

const ERROR_EDITOR_MSG = 'Ops... There are some errors in the editor';
const COMPLEX_SHAPE_MSG = 'Sorry that Shape is too complex for me';

function EditorComp() {

    const context = useContext(AppContext);
    const [yashe,setYashe] = useState(null);
    const divRef = useRef(null);
    let isComplex = false;
    

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

            
            y.on('humanEvent', function(shapes,width) {
                draw(y,shapes);
                isComplex=false;
                y.oldShapes = shapes;
                let data={size:{width:width}};
                context.handleResize(null,data);
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
                    if(isComplex)showError(COMPLEX_SHAPE_MSG);
                    if(y.hasErrors(y))showError(ERROR_EDITOR_MSG);
        
                    y.on('keyup',yasheUtils.debounce(function( e ) {
                        if(!y.hasErrors(y)){
                            hideError();
                            let newShapes = getNewShapes();

                            console.table(newShapes);
                            console.table(y.oldShapes);
                            console.log(y.historySize(10))

                            if(y.oldShapes.length == newShapes.length){ //Any new shape?
                                if(newShapes.toString()!=y.oldShapes.toString()){ //Any cupdate?
                                    isComplex=false;
                                    y.oldShapes = replaceShapes(newShapes);
                                }
                            }else{
                                updateAssist();
                            } 
                        }else{
                            showError(ERROR_EDITOR_MSG);
                        }   
                    }, 500));


                }else{
                    //Not really elegant I know     
                    y._handlers.keyup = null; 
                    y._handlers.keyHandled = null; 
                    if(y.hasErrors(y))showConvert();
                    if(isComplex)showConvert();
                    y.on('focus', function() {
                       showConvert();
                    });       
                }
                
            });

            y.on('prefixChange', function(prefixes,width) {
                draw(yashe,y.oldShapes,prefixes);
                let data={size:{width:width}};
                context.handleResize(null,data);
            });

            y.on('forceError', function(prefixes) {
                isComplex=true;
                hideError();
                loading();
                setTimeout(function() {
                    loaded(); 
                    showError(COMPLEX_SHAPE_MSG);
                    if(!DEFAULTS.sincronize)showConvert();
                },500)
            });

            y.on('delete', function() {
                isComplex=false;
                y.oldShapes = replaceShapes(getNewShapes());
                updatePrefixes(defaultPrefixes);
            });

            y.on('upload', function() {
                if(!y.hasErrors()){                   
                    updateAssist();
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

            y.oldShapes = replaceShapes(getNewShapes());
            updatePrefixes(defaultPrefixes)

            CodeMirror.signal(y,'sinc',DEFAULTS.sincronize);
        }
    }, [yashe]
    );

    

    const draw = function(yashe,shapes,prefixes){
        let newContent=prefixes;
        if(!prefixes){
            newContent = getPrefixes(yashe);
        }
            
        shapes.forEach(element =>{
            newContent += element.toString()
        });
        yashe.setValue(newContent);
    }

    const getPrefixes = function (yashe) {
        let definedPrefixes = yashe.getDefinedPrefixes();
        let prefixes='';
        for(let pre in definedPrefixes){
            prefixes+='PREFIX '+pre+':    <'+definedPrefixes[pre]+'>\n';
        }
        prefixes+='\n';
        return prefixes;
    }


    const getNewShapes = function() {
        return yasheUtils.getCurrentShapes();
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
        hideConvert();
        loading();
        setTimeout(function() {
            isComplex=false;  
            Editor.getYashe().oldShapes = replaceShapes(getNewShapes());  
            replaceShapes(getNewShapes());              
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


    return  (<div className="col edit" ref={divRef}/>);

}

   
export default EditorComp;

