import React,{useState,useContext} from 'react';
import { Collapse } from 'reactstrap';
import {AppContext} from '../../../../../../App';
import {AssistContext} from '../../../../Assistant';
import TypeConfig from './config/TypeConfig';
import PrefixConfig from './config/PrefixConfig';
import QualifierConfig from './config/QualifierConfig';

import '../../../../../../css/shexComponents/customize/Custom.css'

function CustomComp (props) {

    const context = useContext(AppContext);
    const asssistContext = useContext(AssistContext);
    const {entity,isCustomOpen,qualifier,bnode,customClass} = props;

    let initialPrefix = 'example';
    let initialOpenPrefix = false;
    if(entity.type.prefix!=undefined){
        initialPrefix = entity.type.prefix.prefixValue;
        initialOpenPrefix = true;
    }

    const [prefix,setPrefix] = useState(initialPrefix);
    const [isPrefixOpen,setPrefixOpen] = useState(initialOpenPrefix);
 
    const collapsePrefix = function(e){
        if(e.target.value=='prefixedIri'){
            setPrefixOpen(true);
        }else{
            setPrefixOpen(false);
        }    
    }
    
    const styles ={
        body:asssistContext.shapeStyles.body,
    }

    return (
        <Collapse isOpen={isCustomOpen}
                  className='customColapse'>

            <div className={customClass} style={styles.body}>
                <TypeConfig 
                    entity={entity}
                    setPrefix={setPrefix}
                    collapsePrefix={collapsePrefix}
                    bnode={bnode}/>
               
                <PrefixConfig 
                    entity={entity}
                    isPrefixOpen={isPrefixOpen}
                    prefix={prefix}
                    setPrefix={setPrefix}/> 

                 <Qualifier 
                    isQualifier={qualifier}
                    entity={entity}/>              
            </div>
        </Collapse>                 
    );
                                   
    
}

function Qualifier(props) {
  const {isQualifier,entity} = props;
  if (isQualifier) {
    return (<QualifierConfig shape={entity}/>)
  }
  return null;
}


export default CustomComp;

