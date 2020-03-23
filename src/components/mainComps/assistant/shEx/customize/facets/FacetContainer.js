import React,{useState,useContext} from 'react';
import {AppContext} from '../../../../../../App';
import NumericInput from 'react-numeric-input';
import shexUtils from '../../../../../../utils/shexUtils';
import FacetComp from './FacetComp';

function FacetContainer (props) {
    const {triple} = props;
    const context = useContext(AppContext);
    const [facets,setFacets]=useState(triple.facets);

    const deleteFacet= function(id){
        setFacets(shexUtils.deleteFacet(facets,id));
    }

    const addFacet = function(){
        setFacets([...facets,shexUtils.addFacet(facets)]);
        
    }

    const updateFacets = function(){
        triple.facets = facets;
        context.emit();
    }

    return ( <div className="facetGlobal">
                <div className={context.gridClass + " gridBox facetCont"}>
                        <label className="customLabel">Facet</label>
                         {facets.map(f =>{
                                 return (<FacetComp 
                                            key={f.id} 
                                            facet={f}
                                            addFacet={addFacet}
                                            deleteFacet={deleteFacet}
                                            updateFacets={updateFacets} />)
                         })}
                        <button className="addFacet" title="Add Facet" onClick={addFacet}>+ Facet</button>      
                        
                </div>   
                         
        </div>);                          
}



export default FacetContainer;
