import React,{useState,useContext} from 'react';
import {ShapesContext} from '../../../../App';
import Qualifier from '../../utils/Qualifier';

import shexUtils from '../../../../utils/shexUtils';

function ShapeRefComp (props) {

    const context = useContext(ShapesContext);
    const {shape,triple} = props;

    let inlineValue = '';
    if(triple.inlineShape.shape != null){
        inlineValue = triple.inlineShape.shape.id;
    }
    
    const [inlineShape,setInlineShape] = useState(inlineValue);
    const [valueType,setValueType] = useState(triple.value.getTypeName())


    const handleInlineChange = (e) =>{
        const shapeId = e.target.value;
        let inlineShape = null;
        let inlineSelector = '';
        if(shapeId!=''){
            inlineShape = shexUtils.getShapeById(context.shapes,shapeId);
            inlineSelector = inlineShape.id;
        }
        triple.getInlineShape().setShape(inlineShape);
        context.emit();
        setInlineShape(inlineSelector);
    }

    const handleTypeChange = (e) =>{
        let newType = e.target.value;
        triple.setValue(newType);
        context.emit();
        setValueType(newType);
    }


    return (<div className='row col'>
                <select className="col form-control valueInlineShape"
                        value={inlineShape}
                        onChange={handleInlineChange}>
                    <option value=''></option>
                    { 
                    context.shapes.map(shape =>{
                      return <option key={shape.id} value={shape.id}>{'@'+shape.type}</option>
                    })
                  }
                </select>

                <Qualifier triple={triple} scope='triple'/>
            </div>

    
    
    
    );
    
}

export default ShapeRefComp;

