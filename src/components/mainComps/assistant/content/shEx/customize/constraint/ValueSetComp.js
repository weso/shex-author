import React,{useState,useContext} from 'react';
import {AppContext} from '../../../../../../../App';
import { Collapse } from 'reactstrap';
import QNameValue from './valueSetValues/QNameValue';
import InputValue from './valueSetValues/InputValue';
import NumberValue from './valueSetValues/NumberValue';
import BooleanValue from './valueSetValues/BooleanValue';


function ValueSetComp (props) {
    
    const {valueSetValue,deleteValue} = props;
    const context = useContext(AppContext);
    const iriStr = '<...>';

    console.log(valueSetValue)
    const [value,setValue]=useState(valueSetValue);
    const [type,setType]=useState('iriRef');
   
    const [isIriRef,setIriRef]=useState(true);
    const [isQName,setQName]=useState(false);
    const [isString,setString]=useState(false);
    const [isNumber,setNumber]=useState(false);
    const [isBoolean,setBoolean]=useState(false);

    const handleTypeChange = function(e){
       let newType = e.target.value;
       setType(newType);

        setIriRef(false);
        setQName(false);
        setString(false);
        setNumber(false);
        setBoolean(false);
        
    
        if(newType=='iriRef'){
            setIriRef(true);
        }

        if(newType=='prefixedIri'){
            setQName(true);
        }

        if(newType=='stringLiteral'){
            setString(true);
        }

        if(newType=='numericLiteral'){
            setNumber(true);
        }

        if(newType=='booleanLiteral'){
            setBoolean(true);
        }
    }

    const handleValueChange = function(){

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

                <div>
                <InputValue value={value} isOpen={isIriRef}/>

                <QNameValue value={value} isOpen={isQName}/>

                <InputValue value={value} isOpen={isString}/>

                <NumberValue value={value} isOpen={isNumber}/>

                <BooleanValue value={value} isOpen={isBoolean}/>
                </div>
                <button className="tripleBtns deleteValueSetBtn mdc-icon-button material-icons" 
                    onClick={()=>deleteValue(value.id)}
                    title="Delete Value">
                    delete
                </button>
            </div> );                          
}



export default ValueSetComp;
