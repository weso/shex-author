import React,{useState,useContext} from 'react';
import { Collapse } from 'reactstrap';
import {AppContext} from '../../../../../../App';
import {AssistContext} from '../../../../Assistant';
import '../../../../../../css/shexComponents/customize/Custom.css'
import '../../../../../../css/color/colors.css'

import ColorPicker from './ColorPicker';

function ColorComp (props) {

    const context = useContext(AppContext);
    const assistContext = useContext(AssistContext);
    const {customClass,pickers} = props;

    return (
        <div className='customColapse' style={assistContext.styles.body}>             
            <div className={customClass} style={assistContext.styles.body}>
                 <div className='customZone'>
                    {pickers.map(p=>{
                        return(<div className='customElement' key={p.element}>
                                    <label style={assistContext.styles.label}>{p.tag}</label>
                                    <ColorPicker type={customClass} element={p.element}/>
                                </div>)
                    })}
                </div>
            </div> 
        </div>               
    );
                                   
    
}


export default ColorComp;
