import React,{useState,useContext} from 'react';
import { Collapse } from 'reactstrap';
import {AppContext} from '../../../App';
import {getPrefix} from '../../../utils/prefixUtils';
import shexUtils from '../../../utils/shexUtils';
import yasheUtils from '../../../utils/yasheUtils';

const primitives = ['String','Integer','Date','Boolean'];


function ConstraintComponent (props) {

    const context = useContext(AppContext);
    const {triple} = props;
    const [isCustomOpen,setCustomOpen] = useState(false);
    const [primitive,setPrimitive] = useState(triple.value.value);

  
    const [constraint,setConstraint] = useState(triple.value.getTypeName());
    const [cardinality,setCardinality] = useState(triple.cardinality);
        
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

      const handlePrimitiveChange = function(e){
        const primitive = e.target.value;
        triple.setValue('primitive');
        triple.value.setValue(primitive);
        setPrimitive(primitive)
        setCustomOpen(false);
        if(primitive =='custom'){
            triple.setValue('primitive');
            triple.value.setValue('');
            setConstraint('primitive');
            setName('');
            setCustomOpen(true);
            setNameOpen(false);
            setPrefixOpen(false);
        }
        
        context.emit();
    }


    const handleConstraintChange = function(e){
        let newConstraint = e.target.value;
        triple.setValue(newConstraint);
        triple.value.setValue(name);
       
        triple.value.setValue('');
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
            triple.setValue('primitive');
            context.emit(); 
        }

    }




    return (
                <div className="constraint">
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
                                    if(pre.key!=''){
                                        return <option key={pre.key} value={pre.val}>{pre.key}</option>
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

