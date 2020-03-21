import React,{useState,useContext} from 'react';
import { Collapse } from 'reactstrap';
import {AppContext} from '../../../../App';
import {getPrefix} from '../../../../utils/prefixUtils';
import shexUtils from '../../../../utils/shexUtils';
import yasheUtils from '../../../../utils/yasheUtils';

const primitives = ['String','Integer','Date','Boolean'];


function ConstraintComponent (props) {

    const context = useContext(AppContext);
    const {triple} = props;
    
    let constValue = triple.constraint.getTypeName();
    let primValue = triple.constraint.value;
    let customOpen = false;
    
    if(constValue!='primitive'){
        primValue = 'custom';
        customOpen = true;
    }

   

    const [primitive,setPrimitive] = useState(primValue);    
    const [constraint,setConstraint] = useState(constValue);
    const [isCustomOpen,setCustomOpen] = useState(customOpen);
        
    
    let initialPrefix = 'example';
    let initialOpenPrefix = false;
    if(triple.constraint.prefix!=undefined){
        initialPrefix = triple.constraint.prefix.prefixValue;
        initialOpenPrefix = true;
    }

    const [prefix,setPrefix] = useState(initialPrefix);
    const [isPrefixOpen,setPrefixOpen] = useState(initialOpenPrefix);


    let initialOpenName = false;
    if(triple.constraint.value!='' && constraint!='primitive'){
        initialOpenName = true;
    }


    const [name,setName] = useState(triple.constraint.value);
    const [isNameOpen,setNameOpen] = useState(initialOpenName);

    const handlePrefixChange = function(e){ 
        let prefix = getPrefix(e.target.value);
        triple.constraint.setPrefix(prefix);
        context.emit();
        setPrefix(e.target.value);

    }

    const handleNameChange = function(e){
        let newName = e.target.value;
        triple.constraint.setValue(newName);
        context.emit();
        setName(newName);
    }

      const handlePrimitiveChange = function(e){
        const primitive = e.target.value;
        triple.setConstraint('primitive');
        triple.constraint.setValue(primitive);
        setPrimitive(primitive)
        setCustomOpen(false);
        if(primitive =='custom'){
            triple.setConstraint('primitive');
            triple.constraint.setValue('');
            setConstraint('primitive');
            setName('');
            setCustomOpen(true);
            setNameOpen(false);
            setPrefixOpen(false);
        }

        checkRefs(primitive);
        
        context.emit();
    }


    const handleConstraintChange = function(e){
        let newConstraint = e.target.value;
        triple.setConstraint(newConstraint);
        triple.constraint.setValue(name);
       
        triple.constraint.setValue('');
        context.emit();
        setConstraint(newConstraint);

        setNameOpen(false);
        setPrefixOpen(false);

    
        if(newConstraint == 'iriRef'){
            setNameOpen(true);
        }

        if(newConstraint == 'prefixedIri'){
            setNameOpen(true);
            setPrefixOpen(true);
        }

        if(newConstraint == 'primitive'){
            setCustomOpen(false);  
            triple.setConstraint('primitive');
            context.emit(); 
        }

    }

    const checkRefs = function(prim){
        if(prim =='none' && triple.shapeRef.shape != null){
            triple.setConstraint('blankType');
        }
    }

    checkRefs(primitive);


    return (
                <div className={context.gridClass + " gridBox constraint"}>
                    <label className='gridLabel'>Constraint</label>
                    <select className="customSelector" 
                        value={primitive} 
                        onChange={handlePrimitiveChange}
                        title="Constraint">
                        <option value='none'>None</option>
                        {
                            primitives.map(prim =>{
                                return <option key={prim} value={prim.toLowerCase()}>{prim}</option>
                            })
                        }
                        <option value='custom'>Custom</option>
                    </select>    

                    <Collapse isOpen={isCustomOpen} className='constraintCollapse'>
                        <div className="customConstraint">
                        <label>Kind </label>
                        <select className="customSelector"
                                value={constraint}
                                onChange={handleConstraintChange}>
                            <option value="primitive">Primitive</option>
                            <option value="iriRef">IriRef</option>
                            <option value="prefixedIri">PrefixedIri</option>
                            <option value="literal">Literal</option>
                            <option value="nonliteral">NonLiteral</option>
                            <option value="iri">IRI</option>
                            <option value="bnode">BNode</option>
                        </select>
                        </div>     

            
                        <Collapse isOpen={isNameOpen} className='customConstraint'>
                            <label  >Name</label>
                            <input  type="text" 
                                    className="name"
                                    value={name}
                                    onChange={handleNameChange}/> 
                        </Collapse>

                        <Collapse isOpen={isPrefixOpen} className='customConstraint'>
                            <label  >Prefix</label>
                            <select className="customSelector" 
                                    value={prefix}
                                    onChange={handlePrefixChange}>
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
                    </Collapse>                                                         
                </div>
  
    );
                                   
    
}


export default ConstraintComponent;

