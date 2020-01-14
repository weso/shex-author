import React,{useState,useContext} from 'react';
import PrefixedComp from './PrefixedComp';
import {ShapesContext} from '../../../../App';
import {getPrefix} from '../../../../utils/prefixUtils';

function PrefixedTest (props) {

    const context = useContext(ShapesContext);
    const {element} = props;
    const [value,setValue] = useState(element.getInitialValue());
    const [prefix,setPrefix] = useState(element.getInitialPrefix());

    const handleTypeChange = (e) =>{
        const value = e.target.value;
        element.setTypeValue(value);            
        context.emit();
        setValue(value);
    }

    const handlePrefixChange = (e) =>{
        let prefix = getPrefix(e.target.value);
        element.setPrefix(prefix);  
        context.emit();
        setPrefix(e.target.value);
    }

    return  (<PrefixedComp 
                prefix={prefix}
                value={value}
                handlePrefixChange={handlePrefixChange}
                handleTypeChange={handleTypeChange}/>);
              
}


export default PrefixedTest;

