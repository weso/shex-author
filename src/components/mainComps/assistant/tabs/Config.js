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

function Config (props) {

        const context = useContext(AppContext);
        const asssistContext = useContext(AssistContext);
  
        const colors={
            label:{color:SHAPE_COLORS.label},
            header:{background:SHAPE_COLORS.header},
        }

       
        const [color,setColor] = useState('#222');
        const handleChange = function(color,element){
            setColor(color);//I don't know why is needed
            SHAPE_COLORS[element] = color;
        }


        return ( <div className="shape">
                    <ShapeView colors={colors}/>
                    <ColorComp customClass='customShape' handleChange={handleChange}/>
                </div>);
}

export default Config;
