import React,{useState,useContext,useEffect} from 'react';
import {AppContext} from '../../../../../../../App';
import { Collapse } from 'reactstrap';
import NumericInput from 'react-numeric-input';
import Properties from '../../../../../../../conf/properties';
import QNameValue from '../constraint/valueSetValues/QNameValue';
import InputValue from '../constraint/valueSetValues/InputValue';

function OtherComp (props) {
    
        const {extra,deleteExtra} = props;
        const context = useContext(AppContext);
        const styles = Properties.getInstance().getOtherStyle();

        const iriStr = '<...>';
        const [type,setType]=useState(extra.type.getTypeName());
        const [isIriRef,setIriRef]=useState(true);
        const [isQName,setQName]=useState(false);

        const handleTypeChange = function(e){
                let newType = e.target.value;
                setType(newType);
                extra.setType(newType);
                context.emit();
                checkCollapses();
        }

        const checkCollapses = function(){
                setIriRef(false);
                setQName(false);
              
                if(type=='iriRef'){
                   setIriRef(true);
                }

                if(type=='prefixedIri'){
                   setQName(true);
                }
        }


        useEffect(() => {
                checkCollapses();
        });

        return ( 
        <div className="extraComp">
                <select className="customSelector"
                        value={type}
                        onChange={handleTypeChange}>
                        <option value="iriRef">{iriStr}</option>
                        <option value="prefixedIri">QName</option>
                </select>
                <div className="extraZone">
                        <InputValue type={extra.type} isOpen={isIriRef}/>

                        <QNameValue type={extra.type} isOpen={isQName}/>

                        
                        <button className="tripleBtns deleteValueSetBtn mdc-icon-button material-icons" 
                                style={styles.delete}
                                title="Delete property"
                                onClick={()=>deleteExtra(extra.id)}>
                                delete
                        </button>
                </div>
        </div>);                          
}



export default OtherComp;