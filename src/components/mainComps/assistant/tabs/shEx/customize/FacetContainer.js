import React,{useState,useContext} from 'react';
import {AppContext} from '../../../../../../App';
import NumericInput from 'react-numeric-input';
import shexUtils from '../../../../../../utils/shexUtils';
import FacetComp from './facets/FacetComp';
import Properties from '../../../../../../conf/properties';

function FacetContainer (props) {
    const {triple} = props;
    const context = useContext(AppContext);
    const [facets,setFacets]=useState(triple.facets);
    const styles = Properties.getInstance().getFacetStyle();

    const deleteFacet= function(id){
        const newFacets = facets.filter(f => f.id != id);
        setFacets(newFacets);
        triple.setFacets(newFacets);
        context.emit();
    }

    const addFacet = function(){
        const facet = shexUtils.addFacet(facets);
        setFacets([...facets,facet]);
        triple.addFacet(facet);
        context.emit();
    }

    return (<div className="xs-gridBox" style={styles.body}>
                <label className='gridLabel' style={styles.label}>Facet</label>
                <div className="facetCont">
                    {facets.map(f =>{
                            return (<FacetComp 
                                    key={f.id} 
                                    facet={f}
                                    deleteFacet={deleteFacet} />)
                    })}
                    <button className="addFacet" style={styles.add} title="Add Facet" onClick={addFacet}>+ Facet</button>      
                </div>        
            </div>);                          
}



export default FacetContainer;
