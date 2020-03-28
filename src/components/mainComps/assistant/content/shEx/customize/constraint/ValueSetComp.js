import React,{useState,useContext} from 'react';
import {AppContext} from '../../../../../../../App';

function ValueSetComp (props) {
    
    const {valueSetValue,deleteValue} = props;
    const context = useContext(AppContext);
    const iriStr = '<...>';

    const [value,setValue]=useState(valueSetValue);
    const [type,setType]=useState('iriRef');
    const [name,setName]=useState(valueSetValue.value);

    const handleTypeChange = function(e){
       let newType = e.target.value;
       setType(newType);
    }
    
    const handleNameChange = function(e){
        let newName = e.target.value;
        setName(newName);
        value.setValue(newName);
        context.emit(); 
    }

    return (  <div className="valueSets">
                <select className="customSelector"
                        value={type}
                        onChange={handleTypeChange}>
                    <option value="iriRef">{iriStr}</option>
                    <option value="prefixedIri">QName</option>
                    <option value="stringLiteral">String</option>
                    <option value="numericLiteral">Number</option>
                    <option value="booleanLiteral">Boolean</option>
                </select>
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
