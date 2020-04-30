import React,{useState,useContext} from 'react';
import {AppContext} from '../../../../../../App';
import { Collapse } from 'reactstrap';
import shexUtils from '../../../../../../utils/shexUtils';
import Properties from '../../../../../../conf/properties';

function ShapeRefComp (props) {
    
    const {entity} = props;
    const context = useContext(AppContext);
    const styles = Properties.getInstance().getShapeRefStyle();

    let refValue = '';
    let refOpen = false;
    if(entity.shapeRef.shape != null){
        refValue = entity.shapeRef.shape.id;
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
        entity.shapeRef.shape = shapeRef;

        context.emit();
        setShapeRef(refSelector);
    }
     
    return ( 
            <div className="xs-gridBox" style={styles.body}>
                   <label className='gridLabel' style={styles.label}>Shape <br/>Reference</label>
                    <select className="customSelector refSelector"
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

