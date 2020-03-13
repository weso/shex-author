import React,{useState,useContext} from 'react';
import {AppContext} from '../../../../App';
import { Collapse } from 'reactstrap';
import shexUtils from '../../../../utils/shexUtils';



function InlineOrRef (props) {
    
    const {triple} = props;
    const context = useContext(AppContext);


    let inlineValue = '';
    let inlineOpen = false;
    if(triple.shapeRef.shape != null){
        inlineValue = triple.shapeRef.shape.id;
        inlineOpen = true;
    }


    const [shapeRef,setShapeRef] = useState(inlineValue);


    const handleShapeRefChange = function(e){
        const shapeId = e.target.value;
        let shapeRef = null;
        let inlineSelector = '';
        if(shapeId!=''){
            shapeRef = shexUtils.getShapeById(context.shapes,shapeId);
            inlineSelector = shapeRef.id;
        }
        triple.getInlineShape().setShape(shapeRef);
        if(triple.value.value=='none'){
            triple.setValue('blankType');
            
        }
        
        if(shapeId=='' && triple.value.getTypeName() == 'blankType'){
            triple.setValue('primitive');
            triple.value.setValue('none');
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

