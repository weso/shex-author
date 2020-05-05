import React from 'react';
import Editor from '../../../entities/editor';
import CodeMirror from 'codemirror';

function RedoBtn () {

    return (
        <button className="mdc-icon-button material-icons btns" 
                type="button" 
                title="Redo"
                onClick={()=>CodeMirror.signal(Editor.getYashe(),'redo')}>
                redo
        </button> );
    
}


export default RedoBtn;

