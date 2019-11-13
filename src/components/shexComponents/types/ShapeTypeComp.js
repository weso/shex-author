import React,{useContext,useState} from 'react';
import ComponentTypeFactory from './ComponentTypeFactory';

import {ShapesContext} from '../../../App';

function ShapeTypeComp (props) {

        const context = useContext(ShapesContext);
        const {shape,collapse} = props;

        const [type,setType] = useState(shape.type.getTypeName());
        const [colapseBtn,setColapseBtn] = useState('expand_more');
   
        const handleChange = (e)=>{
                const type = e.target.value;
                shape.setType(type)
                context.emit();
                setType(type)
        }

        const handleColapse = (e)=>{
                if(colapseBtn=='expand_more'){
                    setColapseBtn('expand_less');
                }else{
                    setColapseBtn('expand_more');
                }
                collapse();
        }


        return (<div className="row col-8">
                        <select className="col-3 form-control shapeType" 
                            value={type} 
                            onChange={handleChange}>

                            <option value="iriRef">IriRef</option>
                            <option value="prefixedIri">Prefixed</option>
                            <option value="bnodeType">BNode</option>
                        </select>

                        <ComponentTypeFactory shape={shape} 
                                    triple={null}
                                    type='shape'
                                    instance={shape.type.getTypeName()}/>

                        <button className="col-xs-1  colapseButton mdc-icon-button material-icons btn-primary"
                                onClick={handleColapse}>
                                {colapseBtn}
                        </button>


                        <button className="col-xs-1 deleteShapeButton mdc-icon-button material-icons btn-danger" 
                            onClick={()=>context.deleteShape(shape.id)}>
                            delete
                        </button>
                
                </div>);

                                   

}

export default ShapeTypeComp;

