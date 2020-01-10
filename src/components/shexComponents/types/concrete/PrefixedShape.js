import React,{useState,useContext} from 'react';
import PrefixedComp from './PrefixedComp';
import {ShapesContext} from '../../../../App';
import {getPrefix} from '../../../../utils/prefixUtils';

function PrefixedShape (props) {

    const context = useContext(ShapesContext);
    const {shape} = props;
    const [value,setValue] = useState(shape.type.value);
    const [prefix,setPrefix] = useState(shape.type.prefix.prefixValue);


    const handleTypeChange = (e) =>{
        const value = e.target.value;
        shape.type.setValue(value);
        context.emit();
        setValue(value);
    }

    const handlePrefixChange = (e) =>{
        let prefix = getPrefix(e.target.value);
        shape.type.setPrefix(prefix);
        context.emit();
        setPrefix(e.target.value);
    }

    return  (<PrefixedComp 
                prefix={prefix}
                value={value}
                handlePrefixChange={handlePrefixChange}
                handleTypeChange={handleTypeChange}/>);
              
}

export default PrefixedShape;

