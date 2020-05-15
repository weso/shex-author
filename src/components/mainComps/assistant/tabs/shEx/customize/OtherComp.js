import React,{useState,useContext} from 'react';
import {AppContext} from '../../../../../../App';
import { Collapse } from 'reactstrap';
import NumericInput from 'react-numeric-input';
import Properties from '../../../../../../conf/properties';

function OtherComp (props) {
    
        const {triple} = props;
        const context = useContext(AppContext);
        const styles = Properties.getInstance().getOtherStyle();

        return ( 
                <div className=" xs-gridBox" style={styles.body}>
                        <label className='gridLabel' style={styles.label}>Extra Property</label>
                        <div className="facetCont">
                                <input  type="text" 
                                    className="name"
                                    placeholder="eg: :ex1"
                                    title="Extra property"/>
                                <button className="addFacet" style={styles.add} title="Add Facet" >+ Facet</button>      
                            </div>      

                </div>);                          
}



export default OtherComp;

