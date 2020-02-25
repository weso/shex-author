import React,{useContext,useState} from 'react';
import { Collapse } from 'reactstrap';

import {ShapesContext} from '../../App';

import ShapeHeader from  './headers/ShapeHeader';
import CustomComp from './customize/CustomComp';
import TripleComponent from './TripleComponent';

import Triple from '../../entities/shexEntities/triple';

import '../../css/shexComponents/ShapeComponent.css';

function ShapeComponent (props) {

    const context = useContext(ShapesContext);
    const {shape} = props;

    const [triples,setTriples] = useState(shape.triples);
    const [isCustomOpen,setCustomOpen] = useState(false);
    const [isTriplesOpen,setTriplesOpen] = useState(true);
    const [colapseBtn,setColapseBtn] = useState('menu_open');
    const [rounded,setRounded] = useState('un-roundme');

    const addTriple = function(){
        const id = shape.getTriplesCount();
        const triple = new Triple(id);
        
        setTriples([...triples,triple]);

        shape.addTriple(triple);
        context.emit();
        
    }

    const deleteTriple = function(tripleId){
        const newTriples = shape.triples.filter( triple => triple.id != tripleId);
        setTriples(newTriples);
        shape.setTriples(newTriples);
        context.emit();
    }


    const customizeShape = function(){
        setCustomOpen(!isCustomOpen);
        setTriplesOpen(false);
        setColapseBtn('menu');
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


    const rounder =()=>{
         if(rounded=='roundme'){
            setRounded('un-roundme');
        }else{
            setRounded('roundme');
        }

    }
  

    return (
        <div className="shape">
            <ShapeHeader shape={shape} 
                         customizeShape={customizeShape} 
                         collapseTriples={collapseTriples} 
                         colapseBtn={colapseBtn}
                         rounded={rounded}/>

            <CustomComp  entity={shape}
                         isCustomOpen={isCustomOpen}
                         rounder={rounder}
                         qualifier={true}
                         bnode={true}
                         customClass="customShape"/>
                 
            <Collapse   isOpen={isTriplesOpen} 
                        onExited={rounder}
                        onEntering={rounder} >

                <div className={context.triplesContainer+" triples"}>
                    {triples.map(triple =>
                        <TripleComponent key={triple.id}
                                         shape={shape} 
                                         triple={triple}
                                         deleteTriple={deleteTriple}
                        /> 
                    )}
                
                    <button className={context.addBtns+" addTripleButton"} onClick={addTriple} title="Add Triple">+ Triple</button>        
              
                </div>                    
            </Collapse> 
        </div>
    );
                                   
    
}


export default ShapeComponent;

