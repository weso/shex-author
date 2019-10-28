
import React,{useState,useContext} from 'react';
import {ShapesContext} from '../../../../App';


function BNodeComp(props) {

    const context = useContext(ShapesContext);

    let initialValue=props.shape.type.value;     
    if(initialValue == ''){
        initialValue = 'example';
        context.setShapeTypeValue(props.shape.id,initialValue);
    }

    const [value,setValue] = useState(initialValue);
        

    const change = (e) =>{
          setValue(e.target.value)
          context.setShapeTypeValue(props.shape.id,e.target.value);
    }
   

    return (<input   className={props.shape.type.context+' form-control col-sm'} 
                        context="text" 
                        value={value}
                        onChange={change}/>);

                                      
    

}

export default BNodeComp;

