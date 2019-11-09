import React,{useState,useContext} from 'react';
import {ShapesContext} from '../../../../App';

function BNodeComp(props) {

    const context = useContext(ShapesContext);
    const {shape} = props;

    let initialValue=shape.type.value;     
    if(initialValue == ''){
        initialValue = 'example';
        shape.type.setValue(value);
    }

    const [value,setValue] = useState(initialValue);
        

    const change = (e) =>{
          const value = e.target.value;
          shape.type.setValue(value);
          context.emit();
          setValue(value)
    }
   

    return (<input   className={shape.type.context+' form-control col-4'} 
                        context="text" 
                        value={value}
                        onChange={change}/>);

                                      
    

}

export default BNodeComp;

