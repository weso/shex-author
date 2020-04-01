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
    const assistContext = useContext(AssistContext);
    const {customClass} = props;

    const pickers = [
        {
            tag:'Labels',
            element:'label'
        },
        {
            tag:'Header',
            element:'header'
        },
        {
            tag:'Custom Btn',
            element:'custom'
        },
        {
            tag:'Custom Btn Fill',
            element:'customFill'
        },
         {
            tag:'Delete Btn',
            element:'delete'
        },
        {
            tag:'Delete Btn Fill',
            element:'deleteFill'
        },
        {
            tag:'Collapse Btn',
            element:'collapse'
        },
       
        {
            tag:'Shape Body',
            element:'body'
        },
        {
            tag:'+Triple Btn',
            element:'addTriple'
        },
        {
            tag:'+Triple Btn Fill',
            element:'addTripleFill'
        }
        
        
        ];
    
    return (
        <div className='customColapse' style={assistContext.styles.body}>       
            <div className={customClass} style={assistContext.styles.body}>
                 <div className='customZone'>
                    {pickers.map(p=>{
                        return(<div className='customElement'>
                                    <label style={assistContext.styles.label}>{p.tag}</label>
                                    <ColorPicker  element={p.element}/>
                                </div>)
                    })}
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