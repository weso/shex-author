import React,{useState,useContext} from 'react';
import {AppContext} from '../../../../../../App';
import { Collapse } from 'reactstrap';
import shexUtils from '../../../../../../utils/shexUtils';
import Styles from '../../../../../../conf/styles';

function ShapeRefComp (props) {
    
    const {triple} = props;
    const context = useContext(AppContext);
    const styles = Styles.getInstance().getShapeRefStyle();

    let refValue = '';
    let refOpen = false;
    if(triple.shapeRef.shape != null){
        refValue = triple.shapeRef.shape.id;
        refOpen = true;
    }


    const [shapeRef,setShapeRef] = useState(refValue);


    const handleShapeRefChange = function(e){
        const shapeId = e.target.value;
        let shapeRef = null;
        let refSelector = '';
        if(shapeId!=''){
            shapeRef = shexUtils.getShapeById(context.shapes,shapeId);
            refSelector = shapeRef.id;
        }
        triple.getShapeRef().setShape(shapeRef);
        if(triple.constraint.value=='none'){
            triple.setConstraint('blankType');
            
        }
        
        if(shapeId=='' && triple.constraint.getTypeName() == 'blankType'){
            triple.setConstraint('primitive');
            triple.constraint.setValue('none');
        }
        
      
        context.emit();
        setShapeRef(refSelector);
    }
     
    return ( 
            <div className="gridBox" style={styles.body}>
                    <label className="customLabel" style={styles.label}>Shape <br/><span>Reference</span></label>
                    <select className="shapeRefSelector"
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



export default ShapeRefComp;

