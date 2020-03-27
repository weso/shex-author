import React,{useState,useContext} from 'react';
import {AppContext} from '../../../../../../../App';

function ValueSetComp (props) {
    
    const {valueSetValue,deleteValue} = props;
    const context = useContext(AppContext);

    const [value,setValue]=useState(valueSetValue);
    const [name,setName]=useState(valueSetValue.value);
    
    const handleNameChange = function(e){
        let newName = e.target.value;
        setName(newName);
        value.setValue(newName);
        context.emit(); 
    }

    return (  <div className="valueSets">
                <input  type="text" 
                        className="name"
                        value={name}
                        onChange={handleNameChange}/>
                <button className="tripleBtns deleteValueSetBtn mdc-icon-button material-icons" 
                    onClick={()=>deleteValue(value.id)}
                    title="Delete Value">
                    delete
                </button>
            </div> );                          
}



export default ValueSetComp;
