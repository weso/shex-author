import React,{useContext} from 'react';
import {AppContext} from '../../../../App';

function PrefixesBtn (props) {

    const context = useContext(AppContext);

    return (        
        <button className="mdc-icon-button material-icons btns" 
                type="button" 
                title="Prefixes"
                onClick={context.shapesToggle}>
                local_parking
        </button>);
    
    
}

export default PrefixesBtn;