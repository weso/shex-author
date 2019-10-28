
import React,{useState,useContext} from 'react';
import {ShapesContext} from '../../../../App';


function IriComp (props) {

    const context = useContext(ShapesContext);
    const {shape,triple,type} = props;

    let initialValue=shape.type.value;
    if(type !='shape'){
      initialValue = triple.type.value;
    }

    const [value,setValue] = useState(initialValue);

    
    const handleChange = (e) =>{
          setValue(e.target.value);
          if(type == 'shape'){
            context.setShapeTypeValue(shape.id,e.target.value);
          }else{
            context.setTripleTypeValue(shape.id,triple.id,e.target.value);
          }
          
    }
    

    return (<input className={shape.type.context+' form-control col-sm'} 
                      context="text" 
                      value={value}
                      onChange={handleChange}/>);
    
                                   
    

}

export default IriComp;

