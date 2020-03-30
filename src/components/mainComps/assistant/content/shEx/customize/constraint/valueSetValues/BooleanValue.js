import React,{useState,useContext} from 'react';
import {AppContext} from '../../../../../../../../App';
import { Collapse } from 'reactstrap';

function BooleanValue (props) {
    
    const {type,isOpen} = props;
    const context = useContext(AppContext);
    const [boolean,setBoolean]=useState('');

    const handleBooleanChange = function(e){
        let newBoolean = e.target.value;
        setBoolean(newBoolean);
    }

    return (<Collapse isOpen={isOpen} className='imputSetCollapse'>
                <select className="customSelector boolSelect"
                        value={boolean}
                        onChange={handleBooleanChange}>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
            </Collapse>);                          
}



export default BooleanValue;
