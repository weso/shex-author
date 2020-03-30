import React,{useState,useContext} from 'react';
import {AppContext} from '../../../../../../../../App';
import { Collapse } from 'reactstrap';
import NumericInput from 'react-numeric-input';

function NumberValue (props) {
    
    const {type,isOpen} = props;
    const context = useContext(AppContext);
    const [number,setNumber]=useState(type.value);

    const handleNumberChange = function(e){
        let newNumber = e;
        type.setValue(newNumber);
        context.emit();
        setNumber(newNumber);
    }

    return (<Collapse isOpen={isOpen} className='imputSetCollapse'>
                    <NumericInput   className="form-control" 
                                    min={0} 
                                    value={number}
                                    onChange={handleNumberChange}/>

                </Collapse>);                          
}



export default NumberValue;
