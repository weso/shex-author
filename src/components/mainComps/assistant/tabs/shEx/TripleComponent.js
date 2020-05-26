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
import CustomZone from './CustomZone';
import Triple from '../../../../../entities/shexEntities/triple';
import Triples from './Triples';

function TripleComponent (props) {
    
    const context = useContext(AppContext);
    const {triple,deleteTriple,styles} = props;
    const [isCustomOpen,setCustomOpen] = useState(false);
    const [isTriplesOpen,setTriplesOpen] = useState(false);
    const [colapseBtn,setColapseBtn] = useState('menu_open');
    const [triples,setTriples] = useState(triple.triples);


    const [isSlotOpen,setSlotOpen] = useState(false);
    const [isOtherOpen,setOtherOpen] = useState(false);

    const subTripleStyles = Properties.getInstance().getSubTripleStyle();

    const customize  = function(){
       

 setSlotOpen(!isSlotOpen);
    }


    const customize2 = function(){
        
        setOtherOpen(!isOtherOpen);

    }

    const addTriple = function(){
        const id = triple.triplesCount;
        const subTriple = new Triple(id);

         // If there is a inline shape it can't be a shapeRef
        triple.shapeRef.shape = null;

        setTriples([...triples,subTriple]);
        triple.addTriple(subTriple);

      
        context.emit();       
    }

     const subDeleteTriple = function(tripleId){
        const newTriples = triple.triples.filter( subTriple => subTriple.id != tripleId);
        setTriples(newTriples)
        triple.triples = newTriples;
        context.emit(); 
        
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
                          colapseBtn={colapseBtn}
                          styles={styles}/>

           
              <CustomZone isFirst={true} entity={triple} isCustomOpen={isSlotOpen}
              customClass="customTriple"/>
               <CustomZone entity={triple} isCustomOpen={isSlotOpen}
              customClass="customTriple"/>



        </div>);                          
}


export default TripleComponent;
