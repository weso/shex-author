
import React,{useContext} from 'react';
import FactoryTypeComp from './FactoryTypeComp';

import {ShapesContext} from '../../../App';


function ShapeTypeComp (props) {

        const context = useContext(ShapesContext);
        const {shape} = props;
   
        return (<div className="row col-sm-6">
                    <select className="col-sm form-control shapeType" 
                            value={shape.type.getTypeName()} 
                            onChange={ (e) => context.setShapeType(shape.id,e)}>

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

