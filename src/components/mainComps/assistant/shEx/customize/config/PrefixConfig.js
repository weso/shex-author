import React,{useState,useContext} from 'react';
import { Collapse } from 'reactstrap';
import {AppContext} from '../../../../../../App';

import {getPrefix} from '../../../../../../utils/prefixUtils';

function PrefixConfig (props) {

    const context = useContext(AppContext);
    const {entity,isPrefixOpen,prefix,setPrefix} = props;

  
    const handlePrefixChange = function(e){
        let prefix = getPrefix(e.target.value);
        entity.type.setPrefix(prefix);
        context.emit();
        setPrefix(e.target.value);
    }

    return (
         <Collapse isOpen={isPrefixOpen} className={context.gridClass + " gridBox"}>
            <label className="customLabel">Prefix </label>
            <select className="customSelector" value={prefix} onChange={handlePrefixChange}>
                <option value="example">example</option>
                { 
                context.prefixes.map((pre) =>{
                    if(pre.prefixName!=''){
                        return <option key={pre.id} value={pre.prefixValue}>{pre.prefixName}</option>
                    }                        
                })
            }
            </select>
         </Collapse>
    );
                                   
    
}

export default PrefixConfig;

