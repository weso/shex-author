
import React,{useState,useContext} from 'react';
import {ShapesContext} from '../../../../App';


function IriComp (props) {

    const context = useContext(ShapesContext);
    const {shape,triple,type} = props;

    let initialValue=shape.type.value;
    if(type !='shape'){
      //value = props.triple.type.value
    }

    const [value,setValue] = useState(initialValue);

    
    const change = (e) =>{
          setValue(e.target.value);
          if(type == 'shape'){
            context.changeShapeValue(shape.id,e.target.value);
          }else{
            context.changeTripleValue(shape.id,triple.id,e.target.value);
          }
          
    }
    

    return (<input className={shape.type.context+' form-control col-sm'} 
                      context="text" 
                      value={value}
                      onChange={change}/>);
    
                                   
    

}

export default IriComp;

