import React,{useState,useContext} from 'react';
import { Collapse } from 'reactstrap';

import {ShapesContext} from '../../../App';

import {getPrefix} from '../../../utils/prefixUtils';

function CustomShape (props) {

    const context = useContext(ShapesContext);
    const {shape,isCustomOpen} = props;
    const [type,setType] = useState(shape.type.getTypeName());
    const [qualifier,setQualifier] = useState(shape.qualifier.getTypeName())
    
    let initialPrefix = 'example';
    let initialOpenPrefix = false;
    if(shape.type.prefix!=undefined){
        initialPrefix = shape.type.prefix.prefixValue;
        initialOpenPrefix = true;
    }

    const [prefix,setPrefix] = useState(initialPrefix);
    const [isPrefixOpen,setPrefixOpen] = useState(initialOpenPrefix);

    const handleTypeChange = function(e){
        const type  = e.target.value;
        const value = shape.type.value;
        shape.setType(type);
        shape.type.value = value;
        context.emit();
        setType(type);
        collapsePrefix(e)
    }

    const handleQualifierChange = function(e){
        let newType = e.target.value;
        shape.setQualifier(newType);
        context.emit();
        setQualifier(newType);
    }

    const handlePrefixChange = function(e){
        let prefix = getPrefix(e.target.value);
        shape.type.setPrefix(prefix);
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
        <Collapse isOpen={isCustomOpen} >
            <div className="custom">
                <div className="box1 gridBox">
                    <label className="customLabel">Type </label>
                    <select className="customSelector" value={type} onChange={handleTypeChange}>
                        <option value="iriRef">IriRef</option>
                        <option value="prefixedIri">PrefixedIri</option>
                        <option value="bnodeType">Bnode</option>
                    </select>
                </div>
                <Collapse isOpen={isPrefixOpen} className="box2 gridBox">
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
                <div className="box3 gridBox">
                    <label className="customLabel">Qualifier </label>
                    <select className="customSelector" value={qualifier} onChange={handleQualifierChange}>
                        <option value="shape">None</option>
                        <option value="iri">Iri</option>
                        <option value="literal">Literal</option>
                        <option value="nonliteral">NonLiteral</option>
                        <option value="bnode">Bnode</option>
                    </select>
                </div>
            </div>
        </Collapse>                 
    );
                                   
    
}


export default CustomShape;

