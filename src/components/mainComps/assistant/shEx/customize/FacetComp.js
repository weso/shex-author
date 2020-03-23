import React,{useState,useContext} from 'react';
import {AppContext} from '../../../../../App';
import { Collapse } from 'reactstrap';
import NumericInput from 'react-numeric-input';


function FacetComp (props) {
    
    const {triple} = props;
    const context = useContext(AppContext);
    const [facets,setFacets]=useState([]);


    const handle= function(){

    }

    return ( <div className="facetGlobal">
                <div className={context.gridClass + " gridBox facetCont"}>
                        <label className="customLabel">Facet</label>
                         {facets.map(f =>{
                                 return (<div>
                                        <div className="facetInputs">
                                                <select className="customSelector">
                                                        <option value="length">length</option>
                                                        <option value="minlength">minlength</option>
                                                        <option value="maxlength">maxlength</option>
                                                        <option value="totaldigits">totaldigits</option>
                                                        <option value="fractiondigits">fractiondigits</option>
                                                        <option value="mininclusive">mininclusive</option>
                                                        <option value="minexclusive">minexclusive</option>
                                                        <option value="maxinclusive">maxinclusive</option>
                                                        <option value="maxinclusive">maxinclusive</option>
                                                </select>
                                                <NumericInput   
                                                className="form-control" 
                                                min={0} 
                                                />
                                        </div>
                                        <div/><div/></div>)
                         })}
                        
                        <button className="addFacet" title="Add Facet">+ Facet</button>      
                </div>   
                         
        </div>);                          
}



export default FacetComp;






/*
<div className="facetInputs">
                                <select className="customSelector">
                                        <option value="length">length</option>
                                        <option value="minlength">minlength</option>
                                        <option value="maxlength">maxlength</option>
                                        <option value="totaldigits">totaldigits</option>
                                        <option value="fractiondigits">fractiondigits</option>
                                        <option value="mininclusive">mininclusive</option>
                                        <option value="minexclusive">minexclusive</option>
                                        <option value="maxinclusive">maxinclusive</option>
                                        <option value="maxinclusive">maxinclusive</option>
                                        </select>
                                <NumericInput   className="form-control" 
                                                min={0} 
                                                />
                        </div>
                        <div/><div/>
                        */