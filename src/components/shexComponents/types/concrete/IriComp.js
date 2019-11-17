import React,{useState,useContext} from 'react';
import {ShapesContext} from '../../../../App';

function IriComp (props) {

    const context = useContext(ShapesContext);
    const {shape,triple,type} = props;

    let initialValue=shape.type.value;
    if(type =='triple'){
      initialValue = triple.type.value;
    }else if(type =='value'){
      initialValue = triple.value.value;
    }

    const [value,setValue] = useState(initialValue);

     
    const handleChange = (e) =>{
      
      const value = e.target.value;
      if(type == 'shape'){
        shape.type.setValue(value);
      }else if(type == 'triple'){
        triple.type.setValue(value);
      }else{
        triple.value.setValue(value);            
      }
      context.emit();
      setValue(value);


    
    }
    

    return (<input className={shape.type.context+' form-control col-4'} 
                      context="text" 
                      value={value}
                      onChange={handleChange}/>);
    
                                   
    

}

export default IriComp;

