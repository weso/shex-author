import React,{useState,useContext} from 'react';
import { Collapse } from 'reactstrap';

import {ShapesContext} from '../../../App';
import {getPrefix} from '../../../utils/prefixUtils';


function CustomConstraint (props) {

    const context = useContext(ShapesContext);
    const {triple,isCustomOpen} = props;

    const [constraint,setConstraint] = useState(triple.value.getTypeName());
    
    const [isShapeRefOpen,setShapeRefOpen] = useState(false);
    const [isQualiOpen,setQualiOpen] = useState(false);


    let initialPrefix = 'example';
    let initialOpenPrefix = false;
    if(triple.value.prefix!=undefined){
        initialPrefix = triple.value.prefix.prefixValue;
        initialOpenPrefix = true;
    }

    const [prefix,setPrefix] = useState(initialPrefix);
    const [isPrefixOpen,setPrefixOpen] = useState(initialOpenPrefix);

    let initialOpenName = false;
    if(triple.value.value!='' && constraint!='primitive'){
        initialOpenName = true;
    }

    const [name,setName] = useState(triple.value.value);
    const [isNameOpen,setNameOpen] = useState(initialOpenName);

    const handlePrefixChange = function(e){ 
        let prefix = getPrefix(e.target.value);
        triple.value.setPrefix(prefix);
        context.emit();
        setPrefix(e.target.value);

    }

    const handleNameChange = function(e){
        let newName = e.target.value;
        triple.value.setValue(newName);
        context.emit();
        setName(newName);
    }



    const handleConstraintChange = function(e){
        let newConstraint = e.target.value;
        if(newConstraint!='shape'){
            //This is necesary when we change from ShapeType to otherType
            triple.inlineShape.shape = null;
        }
        triple.setValue(newConstraint);
        //conserve the name
        triple.value.setValue(name);

        context.emit();
        setConstraint(newConstraint);

        setNameOpen(false);
        setPrefixOpen(false);
        setShapeRefOpen(false);
        setQualiOpen(false);


        if(newConstraint == 'iriRef'){
            setNameOpen(true);
        }

        if(newConstraint == 'prefixedIri'){
            setNameOpen(true);
            setPrefixOpen(true);
        }

        if(newConstraint == 'shape'){
            setShapeRefOpen(true);
            setQualiOpen(true);
        }

    }


    return (
         <Collapse isOpen={isCustomOpen} className='customColapse'>
                <div className="customConstraint">
                    <div className="gridBox">
                        <label className="customLabel">Type </label>
                        <select className="customSelector"
                                value={constraint}
                                onChange={handleConstraintChange}>
                            <option value="primitive">Primitive</option>
                            <option value="iriRef">IriRef</option>
                            <option value="prefixedIri">PrefixedIri</option>
                            <option value="shape">ShapeRef</option>
                            <option value="literal">Literal</option>
                            <option value="nonliteral">NonLiteral</option>
                            <option value="iri">IRI</option>
                            <option value="bnode">BNode</option>
                        </select>
                    </div>     
                    <Collapse isOpen={isNameOpen} className="gridBox">
                        <label className="customLabel">Name</label>
                        <input  type="text" 
                                className="form-control shapeName"
                                value={name}
                                onChange={handleNameChange}/> 
                    </Collapse>

                    <Collapse isOpen={isPrefixOpen} className="gridBox">
                        <label className="customLabel">Prefix</label>
                        <select className="form-control customSelector" 
                                value={prefix}
                                onChange={handlePrefixChange}>
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

                    <Collapse isOpen={isShapeRefOpen} className="gridBox">
                        <label className="customLabel">ShapeRef</label>
                        <select className="customSelector">
                        <option value=''></option>
                        { 
                        context.shapes.map(shape =>{
                            return <option key={shape.id} value={shape.id}>{'@'+shape.type}</option>
                            })
                        }
                        </select>    
                    </Collapse>
       
                    <Collapse isOpen={isQualiOpen} className="gridBox">
                        <label className="customLabel">Qualifier </label>
                        <select className="customSelector" >
                            <option value="shape">None</option>
                            <option value="iri">Iri</option>
                            <option value="literal">Literal</option>
                            <option value="nonliteral">NonLiteral</option>
                            <option value="bnode">Bnode</option>
                        </select>  
                    </Collapse>
                        
                          
                                                                
                </div>
            </Collapse>             
    );
                                   
    
}


export default CustomConstraint;

