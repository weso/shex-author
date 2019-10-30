
import React,{useState,useContext} from 'react';
import {ShapesContext} from '../../../../App';

let shexUtils = require('../../../../utils/shexUtils.js');


function ShapeRefComp (props) {

    const context = useContext(ShapesContext);
    const {shape,triple} = props;

    let inlineValue = '';
    if(triple.inlineShape.shape != null){
        inlineValue = triple.inlineShape.shape.id;
    }
    const [inlineShape,setInlineShape] = useState(inlineValue);


    const handleChange = (e) =>{
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


    return (<div className='row col'>
                <select className="col form-control valueInlineShape"
                        value={inlineShape}
                        onChange={handleChange}>
                    <option value=''></option>
                    { 
                    context.shapes.map(shape =>{
                      return <option key={shape.id} value={shape.id}>{'@'+shape.type}</option>
                    })
                  }
                </select>

                <select className="col form-control valueInlineShape">
                    <option></option>
                    <option>Iri</option>
                    <option>Literal</option>
                    <option>NonLiteral</option>
                    <option>BNode</option>
                </select>
            </div>

    
    
    
    );
    
}

export default ShapeRefComp;

