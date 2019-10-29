
import React,{useContext,useState} from 'react';
import FactoryTypeComp from './FactoryTypeComp';
import CardinalityComp from '../cardinality/CardinalityComp';

import {ShapesContext} from '../../../App';


function TripleTypeComp (props){

        const context = useContext(ShapesContext);

        const {shape,triple,deleteTriple} = props;

        const [type,setType] = useState(triple.type.getTypeName());

        const handleChange = (e)=>{
                const type = e.target.value;
                triple.setType(type)
                context.emit();
                setType(type)
        }


        return (<div className="row col-9">
                        <select className="col-3 form-control tripleType" 
                                value={type} 
                                onChange={handleChange}>

                                <option value="iriRef">IriRef</option>
                                <option value="prefixedIri">Prefixed</option>
                                
                        </select>

                        <FactoryTypeComp shape={shape} 
                                        triple={triple}
                                        type='triple'
                                        instance={triple.type.getTypeName()}/>
                        
                        <CardinalityComp shape={shape} triple={triple}/>
                         <button className="col-xs-1 deletePropButton mdc-icon-button material-icons btn-danger"
                            onClick={() => deleteTriple(triple.id)}>
                            delete
                        </button>

                        <div className="checkbox valuesCheck">
                        <label>Values 
                            <input className="check" type="checkbox" value=""/>
                        </label>
                    </div>
                        
                </div>);

}

export default TripleTypeComp;

