import React,{useState,useContext} from 'react';
import { Collapse } from 'reactstrap';
import {AppContext} from '../../../App';
import CustomConstraint from './customize/CustomConstraint';


const primitives = ['String','Integer','Date','Boolean'];


function ConstraintComponent (props) {

    const context = useContext(AppContext);
    const {triple} = props;
    const [isCustomOpen,setCustomOpen] = useState(false);
    const [primitive,setPrimitive] = useState(triple.value.value);


    const handlePrimitiveChange = function(e){
        const primitive = e.target.value;
        triple.setValue('primitive');
        triple.value.setValue(primitive);
        context.emit();
        setPrimitive(primitive)
        setCustomOpen(false);
        if(primitive =='custom'){
            setCustomOpen(true);
        }
    }

    const forceCollapse = function(){
        setCustomOpen(false);
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
                        <CustomConstraint
                        triple={triple}
                        forceCollapse={forceCollapse}/> 
                    </Collapse>                                                         
                </div>
  
    );
                                   
    
}


export default ConstraintComponent;

