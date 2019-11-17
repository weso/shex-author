import React,{useContext} from 'react';
import Codemirror from 'codemirror';
import {ShapesContext} from '../../App';
import PrefixSelector from './PrefixSelector';
import {ALL_PREFIXES} from '../../utils/rdfUtils';
import  Editor from '../../entities/editor';

import {defaultExample} from '../../examples/defaultExample';
import {wikiExample} from '../../examples/wikiExample';

import yasheUtils from '../../utils/yasheUtils';

function Nav (props) {

    const {assistantToggle,visualizeToggle} = props;
    const context = useContext(ShapesContext);

    const  handle = function(){
        if(window.confirm('Are you sure?')){
            context.replaceShapes([]);
            // We can't do emit() because it takes 
            // like another call to change shapes state
            // I don't know exactly the reaseon...
            // It's something about react state
            Editor.getInstance().getYashe().setValue('');
        }
    }

    const readFile = function handleFileSelect(evt) {
        var file = evt.target.files[0];
        var reader = new FileReader();
        reader.onload = function(event) {
            Editor.getInstance().getYashe().setValue(event.target.result)
        };

        reader.readAsText(file);
    }

    const downloadFile = function(){
        var textFileAsBlob = new Blob([ Editor.getInstance().getYashe().getValue() ], { type: 'text/shex' });
        var fileNameToSaveAs = "document.shex";

        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.innerHTML = "Download File";
        if (window.URL != null) {
            // Chrome allows the link to be clicked without actually adding it to the DOM.
            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        } else {
            // Firefox requires the link to be added to the DOM before it can be clicked.
            downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
        }
        downloadLink.click();
    }

    const changeTheme = function(){
        let yashe = Editor.getInstance().getYashe();
        var themeValue = 'wiki'
        var color = 'black'
        if(yashe.getOption('theme') == 'wiki'){
            themeValue='dark'
            color = 'white'
            document.getElementById("downloadBtn").classList.add('light');
            document.getElementById("copyBtn").classList.add('light');
            document.getElementById("deleteBtn").classList.add('light');
            document.getElementById("themeBtn").classList.add('light');
            document.getElementById("smallBtn").classList.add('light');
            document.getElementById("fullBtn").classList.add('light');
            document.getElementById("uploadBntLabel").classList.add('light');
        }else{
            document.getElementById("downloadBtn").classList.remove('light');
            document.getElementById("copyBtn").classList.remove('light');
            document.getElementById("deleteBtn").classList.remove('light');
            document.getElementById("themeBtn").classList.remove('light');
            document.getElementById("smallBtn").classList.remove('light');
            document.getElementById("fullBtn").classList.remove('light');
            document.getElementById("uploadBntLabel").classList.remove('light');
        }
        
      yashe.setOption("theme",themeValue)
      Codemirror.signal(yashe,'themeChange');
    }

    const loadExample = function(example){ 
        let yashe = Editor.getInstance().getYashe();
        if(example=='default'){
            yashe.setValue(defaultExample)
        }else{
            yashe.setValue(wikiExample)
        }
        setTimeout(() => {//needed
            Codemirror.signal(yashe,'keyHandled');
        }, 10); 
    }

    const scrollTop = function(){
        window.scrollTo(0, 0);
    }
    
    const undo = function(){
        Editor.getInstance().getYashe().undo();
        setTimeout(() => {//needed
            context.replaceShapes(yasheUtils.replaceShapes());    
        }, 10); 
        
    }

    const redo = function(){
        Editor.getInstance().getYashe().redo();
        setTimeout(() => {//needed
            context.replaceShapes(yasheUtils.replaceShapes());    
        }, 10); 
    }

    return (<div className='lateral'>
                    <div className='lateralTop'>
                    <button className="col mdc-icon-button material-icons btns" title="Show ShEx Assistant"
                            type="button"
                            onClick={assistantToggle}>
                            info
                    </button>
                    <br/>

                    <button className="col mdc-icon-button material-icons btns"type="button" title="Visualize"
                        onClick={visualizeToggle}>
                        remove_red_eye
                    </button> 
                    
                    <div className="dropdown" title="Prefixes">
                        <button className="btn btn-default dropdown-toggle  
                                        mdc-icon-button material-icons 
                                        btns selector" type="button" data-toggle="dropdown">local_parking
                        <span className="caret"></span></button>
                        <ul className='dropdown-menu'>
                            <li>
                                <div id='prefixesDropdown' className='prefixes'>  

                                    <PrefixSelector namespaces={ALL_PREFIXES}/>
                                    
                                </div>
                            </li>
                        </ul>
                    </div>

                    <button className="col mdc-icon-button material-icons btns"type="button" title="Undo"
                        onClick={undo}>
                        undo
                    </button> 
                    <br/>
                    
                    <button className="col mdc-icon-button material-icons btns"type="button" title="Redo"
                        onClick={redo}>
                        redo
                    </button> 
                    <br/>

                     <button className="col btns svgBtn uploadBtn"type="button" onChange={readFile} title="Upload">
                        <input type="file" accept=".shex" name="file-1[]" id="file-1" className="inputfileBtn" data-multiple-caption="{count}'
                        +'files selected" multiple /><label htmlFor="file-1" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="30" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/></svg>
                        </label>
                    </button> 
                
                     <br/>

                     <button className="col btns svgBtn"type="button" title="Download"
                        onClick={downloadFile}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="30" baseProfile="tiny" viewBox="0 0 100 100"><path d="M88 84v-2c0-2.96-.86-4-4-4H16c-2.96 0-4 .98-4 4v2c0 3.102 1.04 4 4 4h68c3.02 0 4-.96 4-4zM58 12H42c-5 0-6 .94-6 6v22H16l34 34 34-34H64V18c0-5.06-1.06-6-6-6z"/></svg>
                    </button> 
                
                     <br/>

                     <button className="col btns svgBtn"type="button" title="Theme"
                        onClick={changeTheme}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="30" viewBox="0 0 24 24"><path fill="none" d="M24 0H0v24h24V0z"/><path d="M6.34 7.93c-3.12 3.12-3.12 8.19 0 11.31C7.9 20.8 9.95 21.58 12 21.58s4.1-.78 5.66-2.34c3.12-3.12 3.12-8.19 0-11.31l-4.95-4.95c-.39-.39-1.02-.39-1.41 0L6.34 7.93zM12 19.59c-1.6 0-3.11-.62-4.24-1.76C6.62 16.69 6 15.19 6 13.59s.62-3.11 1.76-4.24L12 5.1v14.49z"/></svg>
                    </button> 
                
                     <br/>
                  

                    <div className="dropdown" title="Galery">
                        <button className="btn btn-default dropdown-toggle  
                                        mdc-icon-button material-icons 
                                         btns selector" type="button" data-toggle="dropdown">folder_open
                        <span className="caret"></span></button>
                        <ul className='dropdown-menu'>
                            <li>
                                <div id='prefixesDropdown' className='prefixes'>  
                                    <button className="form-control"onClick={()=>loadExample('default')}>User</button>
                                    <button className="form-control" onClick={()=>loadExample('wiki')}>Wikidata</button>
                                    
                                </div>
                            </li>
                        </ul>
                    </div>
      



                     <button className="col mdc-icon-button material-icons  btns" title="Delete all"
                             onClick={handle}>
                            delete_outline
                     </button>
                    <br/>
                    </div>

                    <div className='lateralBottom'>
                      <button className="mdc-icon-button material-icons btns"type="button" title="Up"
                              onClick={scrollTop}
                        >
                        arrow_upward
                    </button> 
                   </div>
                    
        </div>);
    
    
}


export default Nav;
