import React,{useState,useContext} from 'react';
import {AppContext} from '../../../../../App';
import { Collapse } from 'reactstrap';
import NumericInput from 'react-numeric-input';
import shexUtils from '../../../../../utils/shexUtils';

function FacetComp (props) {
    const {triple} = props;
    const context = useContext(AppContext);
    const [facets,setFacets]=useState(triple.facets);

    const deleteFacet= function(id){
        setFacets(shexUtils.deleteFacet(facets,id));
    }

    const addFacet = function(){
        setFacets([...facets,shexUtils.addFacet(facets)]);
        
    }

    const handleTypeChange = function(facet,type){
        facet.setType(type);
        updateFacets();
    }

    const handleValueChange = function(facet,value){
        facet.setValue(value);
        updateFacets();
    }

    const updateFacets = function(){
        triple.facets = facets;
        context.emit();
    }

    return ( <div className="facetGlobal">
                <div className={context.gridClass + " gridBox facetCont"}>
                        <label className="customLabel">Facet</label>
                         {facets.map(f =>{
                                 return (
                                        <div key={f.id} className="facetInputs">
                                                <select className="customSelector"
                                                        value={f.type}
                                                        onChange={(e)=>handleTypeChange(f,e.target.value)}>
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
                                                value={f.value}
                                                onChange={(e)=>handleValueChange(f,e)} 
                                                />
                                                 <button className={context.tripleBtns+" deleteFacetBtn mdc-icon-button material-icons"} 
                                                        onClick={()=>deleteFacet(f.id)} 
                                                        title="Delete Facet">
                                                        delete
                                                </button>
                                               
                                        </div>
                                        )
                         })}
                        <button className="addFacet" title="Add Facet" onClick={addFacet}>+ Facet</button>      
                        
                </div>   
                         
        </div>);                          
}



export default FacetComp;
