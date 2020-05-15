import React,{useState,useContext} from 'react';
import {AppContext} from '../../../../../../App';
import { Collapse } from 'reactstrap';
import NumericInput from 'react-numeric-input';
import Properties from '../../../../../../conf/properties';

function OtherComp (props) {
    
        const {triple} = props;
        const context = useContext(AppContext);
        const styles = Properties.getInstance().getOtherStyle();

        const iriStr = '<...>';

        return ( 
                <div className="xs-gridBox" style={styles.body}>
                        <label className='extraLabel' style={styles.label}>Extra Properties</label>
                        <div className="extrasCont">
                                <div className="extras">
                                        <select className="customSelector"
                                        >
                                        <option value="iriRef">{iriStr}</option>
                                        <option value="prefixedIri">QName</option>
                                        <option value="stringLiteral">String</option>
                                        <option value="numberLiteral">Number</option>
                                        <option value="booleanLiteral">Boolean</option>
                                        </select>
                                </div>
                                <div className="extraZone">
                                        <select className="customSelector"
                                        >
                                        <option value="iriRef">{iriStr}</option>
                                        <option value="prefixedIri">QName</option>
                                        <option value="stringLiteral">String</option>
                                        <option value="numberLiteral">Number</option>
                                        <option value="booleanLiteral">Boolean</option>
                                        </select>
                                          <input type="text" 
                                                className="name"
                                               
                                                title="Property name"/>

                                         <button className="tripleBtns deleteValueSetBtn mdc-icon-button material-icons" 
                                        style={styles.delete}
                                        title="Delete property">
                                        delete
                                        </button>
                                </div>
                                <button className="addExtra" style={styles.add}  title="Add Property" >+ Property</button>      
                        </div>
                        

                </div>);                          
}



export default OtherComp;

