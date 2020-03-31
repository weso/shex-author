import React,{useContext,useState} from 'react';
import {AppContext} from '../../../../App';
import {AssistContext} from '../../Assistant';
import Toggle from 'react-toggle';
import "react-toggle/style.css";

import { Textbox } from 'react-inputs-validation';
import ColorComp from './color/ColorComp';


import {SHAPE_COLORS} from '../../../../conf/properties';
import { ChromePicker } from 'react-color';
import reactCSS from 'reactcss';

import ShapeView from './color/ShapeView';
import ColorPicker from './color/ColorPicker';
function Config (props) {

        const context = useContext(AppContext);
        const asssistContext = useContext(AssistContext);
  
        const [color,setColor] = useState('#222');
        const [isDisplay,setDisplay] = useState(false);

        //const [color,setColor] = useState(asssistContext.colors[element].color);

        const colors={
            label:{color:SHAPE_COLORS.label},
            header:{background:SHAPE_COLORS.header},
        }

       

        const handleChange = function(color,element){
            setColor(color)

            SHAPE_COLORS[element] = color;
            
        }


        return ( <div className="shape">
                    <ShapeView colors={colors}/>
                    <ColorPicker customClass='customShape' 
                    element='label' handleChange={handleChange}/>
                    <ChromePicker color={color} onChange={(e)=>handleChange(e.hex,'label')} />
                    
                </div>);
}

export default Config;
