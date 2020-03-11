import React,{useState,useContext} from 'react';
import { Collapse } from 'reactstrap';
import {AppContext} from '../../../App';
import CustomConstraint from './customize/CustomConstraint';


const primitives = ['String','Integer','Date','Boolean'];


function ConstraintComponent (props) {

    const context = useContext(AppContext);
    const {triple,collapseConstraints} = props;
    const [isCustomOpen,setCustomOpen] = useState(false);
    const [primitive,setPrimitive] = useState(triple.value.value);


    const handlePrimitiveChange = function(e){
        const primitive = e.target.value;
        triple.setValue('primitive');
        triple.value.setValue(primitive);
        context.emit();
        setPrimitive(primitive)
    }



    return (
                <div className="constraint">
                    <label className='gridLabel'>Constraint</label>
                    <select className="customSelector" 
                        value={primitive} 
                        onChange={handlePrimitiveChange}
                        title="Constraint">
                        {
                            primitives.map(prim =>{
                                return <option key={prim} value={prim.toLowerCase()}>{prim}</option>
                            })
                        }
                        <option value='custom'>Custom</option>
                    </select>                                                             
                </div>
  
    );
                                   
    
}

/*

    <Collapse isOpen={isCustomOpen}>
                        <CustomConstraint
                        triple={triple}
                        collapseConstraints={collapseConstraints}/> 
                    </Collapse>

<select className="customSelector" 
                    value={primitive} 
                    onChange={handlePrimitiveChange}
                    title="Constraint">
                {
                    primitives.map(prim =>{
                        return <option key={prim} value={prim.toLowerCase()}>{prim}</option>
                    })
                }
            </select>

            <select className="customSelector" 
                    value={cardinality} 
                    onChange={handleCardinalityChange} 
                    title="Cardinality">
                    <option value="">Exactly one</option>
                    <option value="*">Zero or more</option>
                    <option value="+">One at least</option>
                    <option value="?">One or none</option>
            </select>*/


export default ConstraintComponent;

