import React,{useState,useContext} from 'react';
import { Collapse } from 'reactstrap';
import {AppContext} from '../../../../../App';
import {AssistContext} from '../../../Assistant';

import '../../../../../css/shexComponents/customize/Custom.css'
import '../../../../../css/color/colors.css'


import { SketchPicker } from 'react-color';
import reactCSS from 'reactcss';
import ColorPicker from './ColorPicker';

function ColorComp (props) {

    const context = useContext(AppContext);
    const asssistContext = useContext(AssistContext);
    const {customClass} = props;
    
    return (
        <div className='customColapse'>
            <div className={customClass}>
                 <div className='customZone'>
                    <div className='customElement'>
                        <label>Label</label>
                        <ColorPicker  element='label'/>
                    </div>
                    <div className='customElement'>
                        <label>Header</label>
                        <ColorPicker  element='header'/>
                    </div>
                    <div className='customElement'>
                        <label>Custom Btn</label>
                        <ColorPicker element='custom'/>
                    </div>
                    <div className='customElement'>
                        <label>CustomFill Btn</label>
                        <ColorPicker element='customFill'/>
                    </div>
                    
                    
                </div>
            </div> 
        </div>               
    );
                                   
    
}


export default ColorComp;

/*
<div className='customElement'>
                        <label>Header</label>
                        <ColorPicker/>
                    </div>
                    <div className='customElement'>
                        <label>Custom Btn</label>
                        <ColorPicker/>
                    </div>
                    <div className='customElement'>
                        <label>Delete Btn</label>
                        <ColorPicker/>
                    </div>
                    <div className='customElement'>
                        <label>Body</label>
                        <ColorPicker/>
                    </div>
                    <div className='customElement'>
                        <label>Collapse Btn</label>
                        <ColorPicker/>
                    </div>*/