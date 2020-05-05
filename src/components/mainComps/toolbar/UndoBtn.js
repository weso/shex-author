import React from 'react';
import Editor from '../../../entities/editor';
import CodeMirror from 'codemirror';


function UndoBtn () {

    return (
        <button className="mdc-icon-button material-icons btns" 
                type="button" 
                title="Undo"
                onClick={()=>CodeMirror.signal(Editor.getYashe(),'undo')}>
                undo
        </button> );
    
  
}

export default UndoBtn;

