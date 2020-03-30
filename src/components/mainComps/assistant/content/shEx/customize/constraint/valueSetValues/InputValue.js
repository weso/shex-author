import React,{useState,useContext} from 'react';
import {AppContext} from '../../../../../../../../App';
import { Collapse } from 'reactstrap';

function InputValue (props) {
    
    const {type,isOpen} = props;
    const context = useContext(AppContext);
    const [name,setName]=useState('');

    const handleNameChange = function(e){
        let newName = e.target.value;
        type.setValue(newName);
        context.emit();
        setName(newName);
    }

    return (<Collapse isOpen={isOpen} className='imputSetCollapse'>
                    <input  type="text" 
                        className="name"
                        value={name}
                        onChange={handleNameChange}/>

                </Collapse>);                          
}



export default InputValue;
