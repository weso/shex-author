
import React,{useContext,useState} from 'react';
import FactoryTypeComp from './FactoryTypeComp';

import {ShapesContext} from '../../../App';


function ShapeTypeComp (props) {

        const context = useContext(ShapesContext);
        const {shape} = props;

        const [type,setType] = useState(shape.type.getTypeName());
   
        const handleChange = (e)=>{
                const type = e.target.value;
                shape.setType(type)
                context.emit();
                setType(type)
        }


        return (<div className="row col-sm-6">
                    <select className="col-sm form-control shapeType" 
                            value={type} 
                            onChange={handleChange}>

                            <option value="iriRef">IriRef</option>
                            <option value="prefixedIri">Prefixed</option>
                            <option value="bnode">BNode</option>
                    </select>

                   <FactoryTypeComp shape={shape} 
                                    triple={null}
                                    type='shape'
                                    instance={shape.type.getTypeName()}/>
                
                </div>);

                                   

}

export default ShapeTypeComp;

