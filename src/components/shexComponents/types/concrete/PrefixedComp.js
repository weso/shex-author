import React,{useState,useContext} from 'react';
import {ShapesContext} from '../../../../App';
import {getPrefix} from '../../../../utils/prefixUtils';

function PrefixedComp (props) {

    const context = useContext(ShapesContext);
    const {element} = props;
    const [value,setValue] = useState(element.getInitialValue());
    const [prefix,setPrefix] = useState(element.getInitialPrefix());



    const handleTypeChange = (e) =>{
        console.log(element)
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

    return  (<div className='row col-6'>
                <select className=' col-5 form-control'
                        value={prefix}
                        onChange={handlePrefixChange}>
                
                    { 
                        context.prefixes.map((pre) =>{
                        return <option key={pre.key} value={pre.val}>{pre.key}</option>
                        })
                    }
                </select>

                <input  className={value+' form-control col'} 
                        context="text" 
                        value={value}
                        onChange={handleTypeChange} />           
            </div>); 
              
}


export default PrefixedComp;

