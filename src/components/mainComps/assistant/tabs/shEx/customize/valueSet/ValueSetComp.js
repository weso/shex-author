import React,{useState,useContext,useEffect} from 'react';
import {AppContext} from '../../../../../../../App';
import { Collapse } from 'reactstrap';
import QNameValue from './valueSetValues/QNameValue';
import InputValue from './valueSetValues/InputValue';
import NumberValue from './valueSetValues/NumberValue';
import BooleanValue from './valueSetValues/BooleanValue';
import Properties from '../../../../../../../conf/properties';

function ValueSetComp (props) {
    
    const {value,deleteValue} = props;
    const context = useContext(AppContext);
    const styles = Properties.getInstance().getConstraintStyle();
    const iriStr = '<...>';
    const [type,setType]=useState(value.type.getTypeName());
    const [isIriRef,setIriRef]=useState(true);
    const [isQName,setQName]=useState(false);
    const [isString,setString]=useState(false);
    const [isNumber,setNumber]=useState(false);
    const [isBoolean,setBoolean]=useState(false);

    const handleTypeChange = function(e){
        let newType = e.target.value;
        setType(newType);
        value.setType(newType);
        context.emit();
        checkCollapses();
    }

    const checkCollapses = function(){
        setIriRef(false);
        setQName(false);
        setString(false);
        setNumber(false);
        setBoolean(false);
        

        if(type=='iriRef'){
            setIriRef(true);
        }

        if(type=='prefixedIri'){
            setQName(true);
        }

        if(type=='stringLiteral'){
            setString(true);
        }

        if(type=='numberLiteral'){
            setNumber(true);
        }

        if(type=='booleanLiteral'){
            setBoolean(true);
        }
    }


    useEffect(() => {
        checkCollapses();
    });
    


    return (  <div className="valueSets">
                <select className="customSelector"
                        value={type}
                        onChange={handleTypeChange}>
                    <option value="iriRef">{iriStr}</option>
                    <option value="prefixedIri">QName</option>
                    <option value="stringLiteral">String</option>
                    <option value="numberLiteral">Number</option>
                    <option value="booleanLiteral">Boolean</option>
                </select>

                <div>
                    <InputValue type={value.type} isOpen={isIriRef}/>

                    <QNameValue type={value.type} isOpen={isQName}/>

                    <InputValue type={value.type} isOpen={isString}/>

                    <NumberValue type={value.type} isOpen={isNumber}/>

                    <BooleanValue type={value.type} isOpen={isBoolean}/>
                </div>
                
                <button className="tripleBtns deleteValueSetBtn mdc-icon-button material-icons" 
                    style={styles.delete}
                    onClick={()=>deleteValue(value.id)}
                    title="Delete Value">
                    delete
                </button>
            </div> );                          
}



export default ValueSetComp;
