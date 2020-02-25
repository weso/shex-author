import React,{useState,useContext} from 'react';
import { Collapse } from 'reactstrap';

import {ShapesContext} from '../../../App';
import {getPrefix} from '../../../utils/prefixUtils';

import KindConfig from './config/KindConfig';
import PrefixConfig from './config/PrefixConfig';

function CustomTriple (props) {

    const context = useContext(ShapesContext);
    const {triple,isTripleCustomOpen,rounder} = props;

    const [type,setType] = useState(triple.type.getTypeName());
   

    let initialPrefix = 'example';
    let initialOpenPrefix = false;
    if(triple.type.prefix!=undefined){
        initialPrefix = triple.type.prefix.prefixValue;
        initialOpenPrefix = true;
    }

    const [prefix,setPrefix] = useState(initialPrefix);
    const [isPrefixOpen,setPrefixOpen] = useState(initialOpenPrefix);

    const handleTypeChange = function(e){
        const type  = e.target.value;
        const value = triple.type.value;
        triple.setType(type);
        triple.type.value = value;
        context.emit();
        setType(type);
        setPrefix('example');
        collapsePrefix(e)
    }


    const handlePrefixChange = function(e){
        let prefix = getPrefix(e.target.value);
        triple.type.setPrefix(prefix);
        context.emit();
        setPrefix(e.target.value);
    }


    const collapsePrefix = function(e){
        if(e.target.value=='prefixedIri'){
            setPrefixOpen(true);
        }else{
            setPrefixOpen(false);
        }    
    }


    return (
        <Collapse isOpen={isTripleCustomOpen} 
                  className='customColapse'
                  onExited={rounder}
                  onEntering={rounder}>
                  
                <div className="customTriple">
                    <KindConfig
                        entity={triple}
                        setPrefix={setPrefix}
                        collapsePrefix={collapsePrefix}
                        bnode="false"/>

                     <PrefixConfig 
                        entity={triple}
                        isPrefixOpen={isPrefixOpen}
                        prefix={prefix}
                        setPrefix={setPrefix}/>
                                       
                </div>
            </Collapse>                  
    );
                                   
    
}


export default CustomTriple;

