
import React,{useContext,useState} from 'react';
import FactoryTypeComp from './FactoryTypeComp';

import {ShapesContext} from '../../../App';


function TripleTypeComp (props){

        const context = useContext(ShapesContext);
        const {shape,triple} = props;

        const [type,setType] = useState(triple.type.getTypeName());

        const handleChange = (e)=>{
                const type = e.target.value;
                triple.setType(type)
                context.emit();
                setType(type)
        }

        return (<div className="row col-sm-6">
                        <select className="col-sm form-control tripleType" 
                                value={type} 
                                onChange={handleChange}>

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

