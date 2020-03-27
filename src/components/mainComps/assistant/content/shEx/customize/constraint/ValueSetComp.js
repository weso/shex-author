import React,{useState,useContext} from 'react';
import {AppContext} from '../../../../../../../App';

function ValueSetComp (props) {
    
    const {valueSetValue,deleteValue} = props;
    const context = useContext(AppContext);
    

    const [value,setValue]=useState(valueSetValue);
   
    const handleValueChange = function(value){
        /* facet.setValue(value);
        setValue(value);
        context.emit(); */
    }

    return (  <div className="valueSets">
                <input  type="text" 
                        className="name"
                        value={value}
                        onChange={handleValueChange}/>
                <button className="tripleBtns deleteValueSetBtn mdc-icon-button material-icons" 
                    onClick={()=>deleteValue(value.id)}
                    title="Delete Value">
                    delete
                </button>
            </div> );                          
}



export default ValueSetComp;
