import React,{useState,useContext} from 'react';
import {AppContext} from '../../../../../App';
import { Collapse } from 'reactstrap';
import TripleHeader from './headers/TripleHeader';
import CustomComp from './customize/CustomComp';
import ConstraintComp from './customize/ConstraintComp';
import ShapeRefComp from './customize/ShapeRefComp';
import FacetContainer from './customize/FacetContainer';
import CardinalityComp from './customize/CardinalityComp';
import Properties from '../../../../../conf/properties';
import NodeComponent from './NodeComponent';
import Triple from '../../../../../entities/shexEntities/triple';

function TripleComponent (props) {
    
    const context = useContext(AppContext);
    const {triple,deleteTriple} = props;
    const [isCustomOpen,setCustomOpen] = useState(false);
    const [isTriplesOpen,setTriplesOpen] = useState(false);
    const [colapseBtn,setColapseBtn] = useState('menu_open');
    const [triples,setTriples] = useState(triple.triples);

    const styles = Properties.getInstance().getTripleStyle();

    const customize  = function(){
        setCustomOpen(!isCustomOpen);
    }

    const addTriple = function(){
        const id = triple.triplesCount;
        const subTriple = new Triple(id);

        setTriples([...triples,subTriple]);
        
        triple.addTriple(subTriple);
        context.emit();       
    }

     const subDeleteTriple = function(tripleId){
    /*     const newTriples = shape.triples.filter( triple => triple.id != tripleId);
        setTriples(newTriples)
        shape.triples = newTriples;
        context.emit(); */
        
    }

     const collapseTriples = function(){
        setCustomOpen(false);
        setTriplesOpen(!isTriplesOpen);
        
        if(colapseBtn=='menu'){
            setColapseBtn('menu_open');
        }else{
            setColapseBtn('menu');
        }
    }


    return ( 
        <div>
            <TripleHeader triple={triple} 
                          deleteTriple={deleteTriple}
                          customize={customize}
                          collapseTriples={collapseTriples} 
                          colapseBtn={colapseBtn}/>

            <NodeComponent entity={triple} isCustomOpen={isCustomOpen} /> 
           
            <Collapse  isOpen={isTriplesOpen}>
                     <div className="triples" style={styles.body}>
                        {triples.map(subTriple =>
                            <TripleComponent key={subTriple.id}
                                            triple={subTriple}
                                            deleteTriple={subDeleteTriple}/> 
                        )}
                    
                        <button className="xs-addTripleButton"
                                style={styles.addTriple} 
                                onClick={addTriple} 
                                title="Add Triple">
                                + Triple Constraint
                        </button>        
                    
                        </div>
                </Collapse> 


        </div>);                          
}


export default TripleComponent;
