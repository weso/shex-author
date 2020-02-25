import React,{useContext} from 'react';
import {ShapesContext} from '../../../App';

function ShowAssistBtn () {

    const context = useContext(ShapesContext);

    return (
        <button className="mdc-icon-button material-icons btns" 
                type="button" 
                title="Visualize"
                onClick={context.visualizeToggle}>
                remove_red_eye
        </button> );
    
    
}


export default ShowAssistBtn;


