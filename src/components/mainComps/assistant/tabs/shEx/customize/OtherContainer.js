import React,{useState,useContext} from 'react';
import {AppContext} from '../../../../../../App';
import { Collapse } from 'reactstrap';
import NumericInput from 'react-numeric-input';
import Properties from '../../../../../../conf/properties';
import OtherComp from './other/OtherComp';
import shexUtils from '../../../../../../utils/shexUtils';

function OtherContainer (props) {
    
        const {entity,extras,setExtras} = props;
        const context = useContext(AppContext);
        const styles = Properties.getInstance().getOtherStyle();

        const iriStr = '<...>';
        const [isIriRef,setIriRef]=useState(true);
        const [isQName,setQName]=useState(false);

        const deleteExtra= function(id){
                const newExtras = extras.filter(e => e.id != id);
                setExtras(newExtras);
               // entity.extraProperties.setValues(newExtras);
               // context.emit(); 
        }

        const addExtra = function(){
                const newExtras = shexUtils.addExtraProperty(extras);
                setExtras([...extras,newExtras]);
                //entity.extraProperties.addValue(newExtras);
                //context.emit(); 
        }


        return ( 
                <div className="xs-gridBox" style={styles.body}>
                        <label className='extraLabel' style={styles.label}>Extra Properties</label>
                        <div className="extrasCont">
                                {extras.map(e=>{
                                        return <OtherComp key={e.id} extra={e} deleteExtra={deleteExtra}/>
                                })}
                                <button className="addExtra" style={styles.add}  title="Add Property" onClick={addExtra}>+ Property</button>      
                        </div>

                        <label className='extraLabel' style={styles.label}>Closed</label>
                        <input type="checkbox" className="closedCheck" name="closed" value="closed"/>
                      
                </div>);                          
}



export default OtherContainer;