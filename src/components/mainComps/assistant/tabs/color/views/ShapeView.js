import React,{useContext,useState} from 'react';
import { Textbox } from 'react-inputs-validation';
import {AssistContext} from '../../../../Assistant';

function ShapeView (props) {

        const {colors} = props;
        const assistContext = useContext(AssistContext);
        
        const styles ={
            header:assistContext.shapeStyles.header,
            label:assistContext.shapeStyles.label,
            custom:assistContext.shapeStyles.custom,
            delete:assistContext.shapeStyles.delete,
            collapse:assistContext.shapeStyles.collapse,
        }   
    
        return ( <div className='header' style={styles.header}>            
                        <label style={styles.label}>Shape</label>
                        <Textbox/> 
                        <button style={styles.custom} 
                        className="buildBtn mdc-icon-button material-icons">build</button>
                        <button style={styles.delete} 
                        className="deleteShapeBtn mdc-icon-button material-icons" >delete</button>
                        <button style={styles.collapse} 
                        className="collapseBtn mdc-icon-button material-icons">menu</button>
                    </div>);
}

export default ShapeView;
