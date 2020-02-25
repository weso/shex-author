import React,{useContext} from 'react';
import {ShapesContext} from '../../../App';
import  Editor from '../../../entities/editor';
import {scrollTop} from '../../../utils/toolbarUtils';

function ScrollBtn () {

    const context = useContext(ShapesContext);



    return (
         <button className="mdc-icon-button material-icons btns" 
                 type="button" 
                 title="Up"
                 onClick={scrollTop}>
                 arrow_upward
        </button>   );
    
  
}

export default ScrollBtn;




