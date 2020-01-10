import React,{useContext} from 'react';
import {ShapesContext} from '../../../../App';

function PrefixedComp (props) {

    const context = useContext(ShapesContext);
    const {prefix,value,handlePrefixChange,handleTypeChange} = props;
 
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

