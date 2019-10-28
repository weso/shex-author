
import React,{useState,useContext} from 'react';
import {ShapesContext} from '../../../../App';


function PrefixedComp (props) {

    const context = useContext(ShapesContext);

    let initialValue=props.shape.type.value;
    if(props.type !='shape'){
      //value = props.triple.type.value
    }

    const [value,setValue] = useState(initialValue);


   const getPrefixContex = ()=>{
        let prefix = 'prefixShape';
        let context = props.shape.type.context;
        if( context == 'tripleName'){
            prefix = 'prefixTriple';
        }
        if( context == 'valueName'){
            prefix = 'prefixValue';
        }
        return prefix;
    }

    const change = (e) =>{
          setValue(e.target.value);
          if(props.type == 'shape'){
            context.changeShapeValue(props.shape.id,e.target.value);
          }else{
            //this.props.changeTripleValue(this.props.shape.id,this.props.triple.id,e.target.value);
          }
    }

  

    return  (<div className='row col-sm'>
                    <select className={getPrefixContex()+' col-sm form-control'}/>
                    <input  className={props.shape.type.value+' form-control col-sm'} 
                            context="text" 
                            value={value}
                            onChange={change} />      
                </div>);
              
                               
    

}


    

export default PrefixedComp;

