import React,{useState,useContext} from 'react';
import {AppContext} from '../../../../../../App';
import NumericInput from 'react-numeric-input';
import shexUtils from '../../../../../../utils/shexUtils';
import FacetComp from './facets/FacetComp';
import Styles from '../../../../../../conf/styles';

function FacetContainer (props) {
    const {triple} = props;
    const context = useContext(AppContext);
    const [facets,setFacets]=useState(triple.facets);
    const styles = Styles.getInstance().getFacetStyle();

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

    return (<div className="gridBox" style={styles.body}>
                    <label className="gridLabel">Facet</label>
                    <div className="facetCont">
                        {facets.map(f =>{
                                return (<FacetComp 
                                        key={f.id} 
                                        facet={f}
                                        deleteFacet={deleteFacet} />)
                        })}
                        <button className="addFacet" title="Add Facet" onClick={addFacet}>+ Facet</button>      
                    </div>        
            </div>);                          
}



export default FacetContainer;