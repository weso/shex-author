import React,{useContext,useState} from 'react';
import { Textbox } from 'react-inputs-validation';

function ShapeView (props) {

        const {colors} = props;
    
        return ( <div className='header' style={colors.header}>            
                        <label style={colors.label}>Shape</label>
                        <Textbox/> 
                        <button className="buildBtn mdc-icon-button material-icons">build</button>
                        <button className="deleteShapeBtn mdc-icon-button material-icons" >delete</button>
                        <button className="collapseBtn mdc-icon-button material-icons">menu</button>
                    </div>);
}

export default ShapeView;
