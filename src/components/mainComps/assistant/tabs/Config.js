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


        return ( <div className="shape">
                    <ShapeView/>
                    <ColorComp customClass='customShape'/>
                </div>);
}

export default Config;
