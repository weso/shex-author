import React,{useState,useContext} from 'react';
import {AppContext} from '../../../../../../App';
import ColorPicker from './ColorPicker';
import '../../../../../../css/shexComponents/customize/Custom.css'
import '../../../../../../css/color/colors.css'

function ColorComp (props) {

    const context = useContext(AppContext);
    const {namespace,pickers,labelType,bodyType} = props;

    return (
        <div className='customColapse' style={bodyType}>             
            <div style={bodyType}>
                 <div className='pickers'>
                    {pickers.map(p=>{
                        return(<div className='picker' key={p.element}>
                                    <label style={labelType}>{p.tag}</label>
                                    <ColorPicker namespace={namespace} element={p.element}/>
                                </div>)
                    })}
                </div>
            </div> 
        </div>               
    );
                                   
    
}


export default ColorComp;
