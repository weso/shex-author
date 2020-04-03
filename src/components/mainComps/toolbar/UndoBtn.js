import React,{useContext} from 'react';
import {AppContext} from '../../../App';
import yasheUtils from '../../../utils/yasheUtils';
import {undo} from '../../../utils/toolbarUtils';

function UndoBtn () {

    const context = useContext(AppContext);

    const handleUndo = function(){
        undo();
        setTimeout(() => {//needed
            context.replaceShapes(yasheUtils.replaceShapes());
            //context.updatePrefixes(yasheUtils.updatePrefixes());
        }, 10); 
    }

    return (
        <button className="mdc-icon-button material-icons btns" 
                type="button" 
                title="Undo"
                onClick={handleUndo}>
                undo
        </button> );
    
  
}


export default UndoBtn;

