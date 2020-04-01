import React,{useState,useContext} from 'react';
import { Collapse } from 'reactstrap';
import {AppContext} from '../../../../../../App';
import ColorPicker from './ColorPicker';
import Styles from '../../../../../../conf/styles';
import '../../../../../../css/shexComponents/customize/Custom.css'
import '../../../../../../css/color/colors.css'

function ColorComp (props) {

    const context = useContext(AppContext);
    const {customClass,pickers,bodyType} = props;
    const shapeStyles = Styles.getInstance().getShapesStyle();
    const styles ={
            label:shapeStyles.label,
            body: bodyType,
    }  

    return (
        <div className='customColapse' style={styles.body}>             
            <div style={styles.body}>
                 <div className='customZone'>
                    {pickers.map(p=>{
                        return(<div className='customElement' key={p.element}>
                                    <label style={styles.label}>{p.tag}</label>
                                    <ColorPicker type={customClass} element={p.element}/>
                                </div>)
                    })}
                </div>
            </div> 
        </div>               
    );
                                   
    
}


export default ColorComp;
