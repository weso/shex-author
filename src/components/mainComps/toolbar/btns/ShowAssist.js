import React,{useContext} from 'react';
import {ShapesContext} from '../../../../App';

function VisualizeBtn () {

    const context = useContext(ShapesContext);

    return (
        <button className="mdc-icon-button material-icons btns" 
                title="Show ShEx Assistant"
                type="button"
                onClick={context.assistantToggle}>
                info
        </button>);
    
    
}


export default VisualizeBtn;

