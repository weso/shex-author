import React,{useState,useContext} from 'react';
import { Collapse } from 'reactstrap';
import {AppContext} from '../../../../../../../App';
import {AssistContext} from '../../../../../Assistant';
import {getPrefix} from '../../../../../../../utils/prefixUtils';
import Properties from '../../../../../../../conf/properties';

function PrefixConfig (props) {

    const context = useContext(AppContext);
    const assistContext = useContext(AssistContext);
    const {entity,isPrefixOpen,prefix,setPrefix} = props;
    const shapeStyles = Properties.getInstance().getShapeStyle();
    const tripleStyles = Properties.getInstance().getTripleStyle();
    const styles = entity.triples ? shapeStyles : tripleStyles; //is a Shape or a Triple?

    const handlePrefixChange = function(e){
        let prefix = getPrefix(e.target.value);
        entity.type.setPrefix(prefix);
        context.emit();
        setPrefix(e.target.value);
    }

    return (
         <Collapse isOpen={isPrefixOpen} className="gridBox">
            <label className="customLabel" style={styles.label}>Prefix </label>
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

