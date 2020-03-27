import React,{useState,useContext} from 'react';
import {AppContext} from '../../../../../../../App';

function ValueSetComp (props) {
    
    const {facet,addFacet,deleteFacet,updateFacets} = props;
    const context = useContext(AppContext);
    

    const [value,setValue]=useState('');
   
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
                    title="Delete Value">
                    delete
                </button>
            </div> );                          
}



export default ValueSetComp;
