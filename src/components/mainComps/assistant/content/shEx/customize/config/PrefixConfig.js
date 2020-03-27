import React,{useState,useContext} from 'react';
import { Collapse } from 'reactstrap';
import {AppContext} from '../../../../../../../App';

import {getPrefix} from '../../../../../../../utils/prefixUtils';

function PrefixConfig (props) {

    const context = useContext(AppContext);
    const {entity,isPrefixOpen,prefix,setPrefix,isConstraint} = props;

    let collapseClass = 'gridBox';
    let labelClass = 'customLabel';
    if(isConstraint){
        collapseClass = 'customConstraint';
        labelClass = '';
    }


    const handlePrefixChange = function(e){
        let prefix = getPrefix(e.target.value);
        if(isConstraint){
            entity.constraint.setPrefix(prefix);
        }else{
            entity.type.setPrefix(prefix);
        }
        context.emit();
        setPrefix(e.target.value);
    }

    return (
         <Collapse isOpen={isPrefixOpen} className={collapseClass}>
            <label className={labelClass}>Prefix </label>
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

