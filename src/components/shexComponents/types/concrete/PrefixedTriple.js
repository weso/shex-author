import React,{useState,useContext} from 'react';
import PrefixedComp from './PrefixedComp';
import {ShapesContext} from '../../../../App';
import {getPrefix} from '../../../../utils/prefixUtils';

function PrefixedTriple (props) {

    const context = useContext(ShapesContext);
    const {triple} = props;
    const [value,setValue] = useState(triple.type.value);
    const [prefix,setPrefix] = useState(triple.type.prefix.prefixValue);

    const handleTypeChange = (e) =>{
        const value = e.target.value;
        triple.type.setValue(value);
        context.emit();
        setValue(value);
    }

    const handlePrefixChange = (e) =>{
        let prefix = getPrefix(e.target.value);
        triple.type.setPrefix(prefix);  
        context.emit();
        setPrefix(e.target.value);
    }

    return  (<PrefixedComp 
                prefix={prefix}
                value={value}
                handlePrefixChange={handlePrefixChange}
                handleTypeChange={handleTypeChange}/>);
              
}

export default PrefixedTriple;

