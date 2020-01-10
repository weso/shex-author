import React,{useState,useContext} from 'react';
import PrefixedComp from './PrefixedComp';
import {ShapesContext} from '../../../../App';
import {getPrefix} from '../../../../utils/prefixUtils';

function PrefixedValue (props) {

    const context = useContext(ShapesContext);
    const {triple} = props;
    const [value,setValue] = useState(triple.value.value);
    const [prefix,setPrefix] = useState(triple.value.prefix.prefixValue);

    const handleTypeChange = (e) =>{
        const value = e.target.value;
        triple.value.setValue(value);            
        context.emit();
        setValue(value);
    }

    const handlePrefixChange = (e) =>{
        let prefix = getPrefix(e.target.value);
        triple.value.setPrefix(prefix);  
        context.emit();
        setPrefix(e.target.value);
    }

    return  (<PrefixedComp 
                prefix={prefix}
                value={value}
                handlePrefixChange={handlePrefixChange}
                handleTypeChange={handleTypeChange}/>);
              
}


export default PrefixedComp;

