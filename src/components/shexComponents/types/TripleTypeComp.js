
import React,{useContext} from 'react';
import FactoryTypeComp from './FactoryTypeComp';

import {ShapesContext} from '../../../App';


function TripleTypeComp (props){

    const context = useContext(ShapesContext);
    const {shape,triple} = props;


    return (<div className="row col-sm-6">
                    <select className="col-sm form-control tripleType" 
                            value={triple.type.getTypeName()} 
                            onChange={(e)=>context.setTripleType(shape.id,triple.id,e)}>

                            <option value="iriRef">IriRef</option>
                            <option value="prefixedIri">Prefixed</option>
                             
                    </select>

                   <FactoryTypeComp shape={shape} 
                                    triple={triple}
                                    type='triple'
                                    instance={triple.type.getTypeName()}/>
                
            </div>);

}

export default TripleTypeComp;

