import React,{useState,useContext} from 'react';
import {AppContext} from '../../../../../App';
import { Collapse } from 'reactstrap';
import NumericInput from 'react-numeric-input';
import Facet from '../../../../../entities/shexEntities/shexUtils/facet';


function FacetComp (props) {
    const {triple} = props;
    const context = useContext(AppContext);
    const [facets,setFacets]=useState([]);


    const handle= function(){

    }

    const addFacet = function(){
        setFacets([...facets,new Facet()]);
    }

    return ( <div className="facetGlobal">
                <div className={context.gridClass + " gridBox facetCont"}>
                        <label className="customLabel">Facet</label>
                         {facets.map(f =>{
                                 return (
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
                                        )
                         })}
                        <button className="addFacet" title="Add Facet" onClick={addFacet}>+ Facet</button>      
                        
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