import React,{useContext,useState} from 'react';
import FactoryTypeComp from './FactoryTypeComp';

import {ShapesContext} from '../../../App';

function TripleTypeComp (props){

        const context = useContext(ShapesContext);

        const {shape,triple,deleteTriple,handeCollapse} = props;

        const [type,setType] = useState(triple.type.getTypeName());
        const [collapseBtn,setCollapseBtn] = useState('expand_more');

        const handleChange = (e)=>{
                const type = e.target.value;
                triple.setType(type)
                context.emit();
                setType(type)
        }

        const handleCollapseBtn = (e)=>{
                if(collapseBtn=='expand_more'){
                    setCollapseBtn('expand_less');
                }else{
                    setCollapseBtn('expand_more');
                }

                handeCollapse();

        }


        return (<div className="row col triples-header">
                        <label className="col-xs-1 tripleLabel">Triple</label>                        
                        <select className="col-2 form-control tripleType" 
                                value={type} 
                                onChange={handleChange}>

                                <option value="iriRef">IriRef</option>
                                <option value="prefixedIri">Prefixed</option>
                                
                        </select>

                        <FactoryTypeComp shape={shape} 
                                        triple={triple}
                                        type='triple'
                                        instance={triple.type.getTypeName()}/>
                          
                        <button className="col-xs-1  colapseButton mdc-icon-button material-icons btn-primary"
                                onClick={handleCollapseBtn}>
                                {collapseBtn}
                        </button>

                        <button className="col-xs-1 deletePropButton mdc-icon-button material-icons btn-danger"
                                onClick={() => deleteTriple(triple.id)}>
                                delete
                        </button>

                       

                         
                </div>);

}

export default TripleTypeComp;

