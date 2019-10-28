
import React,{useState,useContext} from 'react';
import {ShapesContext} from '../../../../App';


function IriComp (props) {

    const context = useContext(ShapesContext);

    let initialValue=props.shape.type.value;
    if(props.type !='shape'){
      //value = props.triple.type.value
    }

    const [value,setValue] = useState(initialValue);

    
    const change = (e) =>{
          setValue(e.target.value);
          if(props.type == 'shape'){
            context.changeShapeValue(props.shape.id,e.target.value);
          }else{
            //this.props.changeTripleValue(this.props.shape.id,this.props.triple.id,e.target.value);
          }
          
    }
    

    return (<input className={props.shape.type.context+' form-control col-sm'} 
                      context="text" 
                      value={value}
                      onChange={change}/>);
    
                                   
    

}

export default IriComp;

