import React,{useState,useContext} from 'react';
import { Collapse } from 'reactstrap';

import {ShapesContext} from '../../../App';
import {getPrefix} from '../../../utils/prefixUtils';


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
                    <div className={context.customTripleClass+" gridBox"}>
                        <label className="customLabel">Type </label>
                        <select className="customSelector" 
                                value={type}
                                onChange={handleTypeChange}>
                            <option value="iriRef">IriRef</option>
                            <option value="prefixedIri">PrefixedIri</option>
                        </select>
                    </div>

                    <Collapse isOpen={isPrefixOpen} className={context.customTripleClass+" gridBox"}>                       
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
                </div>
            </Collapse>                  
    );
                                   
    
}


export default CustomTriple;

