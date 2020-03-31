import React,{useContext,useState} from 'react';
import { Textbox } from 'react-inputs-validation';
import {AssistContext} from '../../../Assistant';

function ShapeView (props) {

        const {colors} = props;
        const asssistContext = useContext(AssistContext);
        
        const styles ={
            header:asssistContext.styles.header,
            label:asssistContext.styles.label
        }   
    
        return ( <div className='header' style={styles.header}>            
                        <label style={styles.label}>Shape</label>
                        <Textbox/> 
                        <button style={asssistContext.styles.custom} 
                        className="buildBtn mdc-icon-button material-icons">build</button>
                        <button style={asssistContext.styles.delete} 
                        className="deleteShapeBtn mdc-icon-button material-icons" >delete</button>
                        <button className="collapseBtn mdc-icon-button material-icons">menu</button>
                    </div>);
}

export default ShapeView;
