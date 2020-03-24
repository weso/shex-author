import React,{useContext} from 'react';
import {AppContext} from '../../../../App';

import {redo} from '../../../../utils/toolbarUtils';
import yasheUtils from '../../../../utils/yasheUtils';

function RedoBtn () {

    const context = useContext(AppContext);

    const handleRedo = function(){
        redo();
        setTimeout(() => {//needed
            context.replaceShapes(yasheUtils.replaceShapes());
            //context.updatePrefixes(yasheUtils.updatePrefixes());
        }, 10); 
    }

    return (
        <button className="mdc-icon-button material-icons btns" 
                type="button" 
                title="Redo"
                onClick={handleRedo}>
                redo
        </button> );
    
}


export default RedoBtn;

