import React,{useState,useContext} from 'react';
import { Collapse } from 'reactstrap';

import {ShapesContext} from '../../../App';
import {getPrefix} from '../../../utils/prefixUtils';


function CustomConstraint (props) {

    const context = useContext(ShapesContext);
    const {triple,isCustomOpen} = props;

    const [constraint,setConstraint] = useState(triple.value.getTypeName());
    const [isNameOpen,setNameOpen] = useState(false);
    const [isPrefixOpen,setPrefixOpen] = useState(false);
    const [isShapeRefOpen,setShapeRefOpen] = useState(false);
    const [isQualiOpen,setQualiOpen] = useState(false);

    const handleConstraintChange = function(e){
        let newConstraint = e.target.value;
        if(newConstraint!='shape'){
            //This is necesary when we change from ShapeType to otherType
            triple.inlineShape.shape = null;
        }
        triple.setValue(newConstraint);
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
                        <input  type="text" className="form-control shapeName"/> 
                    </Collapse>

                    <Collapse isOpen={isPrefixOpen} className="gridBox">
                        <label className="customLabel">Prefix</label>
                        <select className="customSelector">
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

