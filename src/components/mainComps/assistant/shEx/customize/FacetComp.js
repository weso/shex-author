import React,{useState,useContext} from 'react';
import {AppContext} from '../../../../../App';
import { Collapse } from 'reactstrap';
import NumericInput from 'react-numeric-input';


function FacetComp (props) {
    
    const {triple} = props;
    const context = useContext(AppContext);

    const handle= function(){

    }

    return ( <div className="facetGlobal">
                <div className={context.gridClass + " gridBox facetCont"}>
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
                </div>   
                        <button className={context.addBtns+" addFacet"}  title="Add Facet">+ Facet</button>        
        </div>);                          
}



export default FacetComp;

