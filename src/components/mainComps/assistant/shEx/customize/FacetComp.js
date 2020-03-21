import React,{useState,useContext} from 'react';
import {AppContext} from '../../../../../App';
import { Collapse } from 'reactstrap';

function FacetComp (props) {
    
    const {triple} = props;
    const context = useContext(AppContext);

    return ( 
            <div className={context.gridClass + " gridBox shapeRef"}>
                    <label className="customLabel">Facet</label>
                    <select className="customSelector">
                            <option value="LENGTH">LENGTH</option>
                            <option value="MINLENGTH">MINLENGTH</option>
                            <option value="MAXLENGTH">MAXLENGTH</option>
                            <option value="TOTALDIGITS">TOTALDIGITS</option>
                            <option value="FRACTIONDIGITS">FRACTIONDIGITS</option>
                            <option value="MININCLUSIVE">MININCLUSIVE</option>
                            <option value="MINEXCLUSIVE">MINEXCLUSIVE</option>
                            <option value="MAXINCLUSIVE">MAXINCLUSIVE</option>
                            <option value="MAXEXCLUSIVE">MAXEXCLUSIVE</option>
                        </select>
                    <input  type="text" className="name"/> 
            </div>);                          
}



export default FacetComp;

