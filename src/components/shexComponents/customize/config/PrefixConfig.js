import React,{useState,useContext} from 'react';
import { Collapse } from 'reactstrap';
import {ShapesContext} from '../../../../App';

import {getPrefix} from '../../../../utils/prefixUtils';

function ShapeKindConfig (props) {

    const context = useContext(ShapesContext);
    const {shape,isPrefixOpen,prefix,setPrefix} = props;

  
    const handlePrefixChange = function(e){
        let prefix = getPrefix(e.target.value);
        shape.type.setPrefix(prefix);
        context.emit();
        setPrefix(e.target.value);
    }

    return (
         <Collapse isOpen={isPrefixOpen} className={context.customClass+" box2 gridBox"}>
            <label className="customLabel">Prefix </label>
            <select className="customSelector" value={prefix} onChange={handlePrefixChange}>
                <option value="example">example</option>
                { 
                context.prefixes.map((pre) =>{
                    if(pre.key!=''){
                        return <option key={pre.key} value={pre.val}>{pre.key}</option>
                    }                        
                })
            }
            </select>
         </Collapse>
    );
                                   
    
}

export default ShapeKindConfig;

