import React,{useState,useContext} from 'react';
import { Collapse } from 'reactstrap';
import {ShapesContext} from '../../../../App';
import KindConfig from './config/KindConfig';
import PrefixConfig from './config/PrefixConfig';
import QualifierConfig from './config/QualifierConfig';

import '../../../../css/shexComponents/customize/Custom.css'

function CustomComp (props) {

    const context = useContext(ShapesContext);
    const {entity,isCustomOpen,rounder,qualifier,bnode,customClass} = props;

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
    

    return (
        <Collapse isOpen={isCustomOpen}
                  className='customColapse' 
                  onExited={rounder}
                  onEntering={rounder}>

            <div className={customClass}>
                <KindConfig 
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

