import React,{useState,useContext} from 'react';
import { Collapse } from 'reactstrap';

import {ShapesContext} from '../../../App';

import {getPrefix} from '../../../utils/prefixUtils';

function CustomTriple (props) {

    const context = useContext(ShapesContext);
    const {triple,isTripleCustomOpen} = props;

    const [type,setType] = useState(triple.type.getTypeName());
    const [valueType,setValueType] = useState(triple.value.getTypeName());

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

    const handleValueTypeChange = function(e){
        let newType = e.target.value;
        if(newType!='shape'){
            //This is necesary when we change from ShapeType to otherType
            triple.inlineShape.shape = null;
        }
        triple.setValue(newType);
        context.emit();
        setValueType(newType);
    }

    return (
        <Collapse isOpen={isTripleCustomOpen} className='customColapse'>
                <div className="customTriple">
                    <div className="gridTriplesBox">
                        <div/>
                        <label>Type </label>
                        <select className="customSelector" 
                                value={type}
                                onChange={handleTypeChange}>
                            <option value="iriRef">IriRef</option>
                            <option value="prefixedIri">PrefixedIri</option>
                        </select>
                    </div>

                    <Collapse isOpen={isPrefixOpen} className="gridTriplesBox">
                        <div/>
                        <label>Prefix </label>
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


                    <div className="gridTriplesBox">
                        <div/>
                        <label>Value </label>
                        <select className="customSelector"
                                value={valueType}
                                onChange={handleValueTypeChange}>
                            <option value="iriRef">IriRef</option>
                            <option value="prefixedIri">PrefixedIri</option>
                            <option value="shape">Shape</option>
                            <option value="literal">Literal</option>
                            <option value="nonliteral">NonLiteral</option>
                            <option value="iri">IRI</option>
                            <option value="bnode">BNode</option>
                        </select>
                    </div>
        
                </div>
            </Collapse>                  
    );
                                   
    
}


export default CustomTriple;

