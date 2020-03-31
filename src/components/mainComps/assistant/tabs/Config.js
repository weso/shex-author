import React,{useContext,useState} from 'react';
import {AppContext} from '../../../../App';
import {AssistContext} from '../../Assistant';
import Toggle from 'react-toggle';
import "react-toggle/style.css";

import { Textbox } from 'react-inputs-validation';
import ColorComp from './color/ColorComp';


import {SHAPE_COLORS} from '../../../../conf/properties';

function Config (props) {

        const context = useContext(AppContext);
        const asssistContext = useContext(AssistContext);
  
        const handle = function(e){
            console.log(SHAPE_COLORS)
            SHAPE_COLORS.label = 'red';
            //asssistContext.setColor(e.hex)
        }

        //const [color,setColor] = useState(asssistContext.colors[element].color);

        return ( <div className="shape">
                    <div className='header' >            
                        <label>Shape</label>
                        <Textbox/> 
                        <button className="buildBtn mdc-icon-button material-icons">build</button>
                        <button className="deleteShapeBtn mdc-icon-button material-icons" >delete</button>
                        <button className="collapseBtn mdc-icon-button material-icons">menu</button>
                    </div>
                    <ColorComp customClass="customShape"/>
                    <button onClick={handle}>STFU MIREK</button>
                </div>);
}

export default Config;
