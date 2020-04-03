import React,{useState,useContext,useEffect} from 'react';
import { Collapse } from 'reactstrap';
import {AppContext} from '../../../../../../App';
import {getPrefix} from '../../../../../../utils/prefixUtils';
import shexUtils from '../../../../../../utils/shexUtils';
import yasheUtils from '../../../../../../utils/yasheUtils';
import PrefixConfig from './config/PrefixConfig';
import ValueSetContainer from './constraint/ValueSetContainer';
import Properties from '../../../../../../conf/properties';

const primitives = ['String','Integer','Date','Boolean'];
const iriStr ='<...>';

function ConstraintComp (props) {

    const context = useContext(AppContext);
    const {triple} = props;
    const styles = Properties.getInstance().getConstraintStyle();
    
    let constValue = triple.constraint.getTypeName();
    let primValue = triple.constraint.value;

    if(constValue!='primitive'){
        primValue = 'custom';
    }

    let initialPrefix = 'example';
    if(triple.constraint.prefix!=undefined){
        initialPrefix = triple.constraint.prefix.prefixValue;
    }

    let initialValueSet = [];
    if(constValue == 'valueSet'){
        initialValueSet = triple.constraint.getValues();
    }
    
    const [name,setName] = useState(triple.constraint.value || '');
    const [prefix,setPrefix] = useState(initialPrefix);
    const [valueSet,setValueSet] = useState(initialValueSet);
    const [primitive,setPrimitive] = useState(primValue);    
    const [constraint,setConstraint] = useState(constValue);
    const [isCustomOpen,setCustomOpen] = useState(false);
    const [isValueSetOpen,setValueSetOpen] = useState(false);
    const [isNameOpen,setNameOpen] = useState(false);
    const [isPrefixOpen,setPrefixOpen] = useState(false);
        
   

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
        const newPrimitive = e.target.value;
        triple.setConstraint('primitive');
        triple.constraint.setValue(newPrimitive);
        setConstraint('primitive');
        setPrimitive(newPrimitive);
        checkRefs(newPrimitive);     
        context.emit();
    }


    const handleConstraintChange = function(e){
        let newConstraint = e.target.value;
        setConstraint(newConstraint);
        triple.setConstraint(newConstraint);
        triple.constraint.setValue(name);
        context.emit();
    }

 

    const checkCollapses = function(){
        setCustomOpen(true);  
        setNameOpen(false);
        setPrefixOpen(false);
        setValueSetOpen(false);
        
        if(constraint == 'iriRef'){
            setNameOpen(true);
        }

        if(constraint == 'prefixedIri'){
            setNameOpen(true);
            setPrefixOpen(true);
        }

        if(constraint == 'primitive'){
            if(primitive!='custom'){
                setCustomOpen(false);
            }else{
                setConstraint('prefixedIri');
                setName('');
                triple.setConstraint('prefixedIri');
                context.emit();
            }
        }

        if(constraint == 'valueSet'){
            setValueSetOpen(true);
        }

    }

    const checkRefs = function(prim){
        if(prim =='none'){
            if(triple.shapeRef.shape != null){
                triple.setConstraint('blankType');
            }
        }
    }

    checkRefs(primitive);

    useEffect(() => {
        checkCollapses();
    })

    return (
                <div className="xs-gridBox" style={styles.body}>
                    <label className='gridLabel' style={styles.label}>Constraint</label>
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
                        <div className="xs-customConstraint">
                            <label style={styles.label}>Type</label>
                            <select className="customSelector"
                                    value={constraint}
                                    onChange={handleConstraintChange}>
                                
                                <option value="iriRef">{iriStr}</option>
                                <option value="prefixedIri">QName</option>
                                <option value="valueSet">ValueSet</option>
                                <option value="literal">Literal</option>
                                <option value="nonliteral">NonLiteral</option>
                                <option value="iri">IRI</option>
                                <option value="bnode">BNode</option>
                            </select>
                        </div>     

            
                        <Collapse isOpen={isNameOpen}>
                            <div className="xs-customConstraint">
                                <label style={styles.label}>Name</label>
                                <input  type="text" 
                                        className="name"
                                        value={name}
                                        onChange={handleNameChange}/>
                            </div> 
                        </Collapse>

                         <Collapse isOpen={isPrefixOpen}>
                            <div className="xs-customConstraint">
                                <label style={styles.label}>Prefix </label>
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
                            </div>
                        </Collapse>


                        <Collapse isOpen={isValueSetOpen}>
                            <ValueSetContainer  triple={triple} valueSet={valueSet}/>
                        </Collapse>
                    </Collapse>                                                         
                </div>
  
    );
                                   
    
}


export default ConstraintComp;

