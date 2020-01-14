import React,{useState,useContext} from 'react';
import {ShapesContext} from '../../../../App';

function IriComp (props) {

    const context = useContext(ShapesContext);
    const {element} = props;
    const [value,setValue] = useState(element.getInitialValue());

    const handleChange = (e) =>{
      const value = e.target.value;
      element.setTypeValue(value);
      context.emit();
      setValue(value);
    }
    
    return (<input className={element.type.context+' form-control col-4'} 
                      context="text" 
                      value={value}
                      onChange={handleChange}/>);
    
}

export default IriComp;

