import React,{useState,useContext,useEffect} from 'react';
import {ShapesContext} from '../../../../App';
import {getPrefix} from '../../../../utils/prefixUtils';

function PrefixedComp (props) {

    const context = useContext(ShapesContext);
 
    const {shape,triple,type} = props;

    let initialValue = shape.type.value;
    //We can't initializae initialPrefix 
    //beacause if it is called by a triple 
    //we don't know its shape's type
    let initialPrefix; 
    if(type=='shape'){
      initialPrefix = shape.type.prefix.prefixValue;
    }else if(type =='triple'){
      initialValue = triple.type.value;
      initialPrefix = triple.type.prefix.prefixValue;
    }else{ 
      initialValue = triple.value.value;
      initialPrefix = triple.value.prefix.prefixValue;
    }

    const [value,setValue] = useState(initialValue);
    const [prefix,setPrefix] = useState(initialPrefix);


  /**
    Esto igual se puede quitar
   */
   const getPrefixContex = ()=>{
        let prefix = 'prefixShape';
        let context = shape.type.context;
        if( context == 'tripleName'){
            prefix = 'prefixTriple';
        }
        if( context == 'valueName'){
            prefix = 'prefixValue';
        }
        return prefix;
    }

    const handleTypeChange = (e) =>{
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

    const handlePrefixChange = (e) =>{
      let prefix = getPrefix(e.target.value);

      if(type == 'shape'){
        shape.type.setPrefix(prefix);
      }else if(type == 'triple'){
        triple.type.setPrefix(prefix);  
      }else{
        triple.value.setPrefix(prefix);  
      }

      context.emit();
      setPrefix(e.target.value);
    }

    return  (<div className='row col-6'>
                <select className={getPrefixContex()+' col-5 form-control'}
                        value={prefix}
                        onChange={handlePrefixChange}>
                 
                  { 
                    context.prefixes.map((pre) =>{
                      return <option key={pre.key} value={pre.val}>{pre.key}</option>
                    })
                  }
                </select>
                   
                <input  className={shape.type.value+' form-control col'} 
                        context="text" 
                        value={value}
                        onChange={handleTypeChange} />
               
              </div>);
              
                               
    

}


    

export default PrefixedComp;

