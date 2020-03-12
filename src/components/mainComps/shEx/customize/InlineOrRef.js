import React,{useState,useContext} from 'react';
import {AppContext} from '../../../../App';
import { Collapse } from 'reactstrap';
import shexUtils from '../../../../utils/shexUtils';



function InlineOrRef (props) {
    
    const {triple} = props;
    const context = useContext(AppContext);


    let inlineValue = '';
    let inlineOpen = false;
    if(triple.inlineShape.shape != null){
        inlineValue = triple.inlineShape.shape.id;
        inlineOpen = true;
    }


    const [shapeRef,setShapeRef] = useState(inlineValue);


    const handleShapeRefChange = function(e){
        const shapeId = e.target.value;
        let inlineShape = null;
        let inlineSelector = '';
        if(shapeId!=''){
            inlineShape = shexUtils.getShapeById(context.shapes,shapeId);
            inlineSelector = inlineShape.id;
        }
        triple.getInlineShape().setShape(inlineShape);
        if(triple.value.value=='none'){
            triple.value.setValue('');
        }
        context.emit();
        setShapeRef(inlineSelector);
    }
     
    return ( 
            <div className="inline">
                    <label className="customLabel">ShapeRef</label>
                    <select className="customSelector"
                            value={shapeRef}
                            onChange={handleShapeRefChange}>
                    <option value=''>none</option>
                
                    { 
                    context.shapes.map(shape =>{
                        return <option key={shape.id} value={shape.id}>{'@'+shape.type}</option>
                        })
                    }
                    </select>  
            </div>);                          
}



export default InlineOrRef;

