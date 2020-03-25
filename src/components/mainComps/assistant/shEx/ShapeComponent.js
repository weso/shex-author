import React,{useContext,useState} from 'react';
import { Collapse } from 'reactstrap';
import {AppContext} from '../../../../App';
import ShapeHeader from  './headers/ShapeHeader';
import CustomComp from './customize/CustomComp';
import TripleComponent from './TripleComponent';

import Triple from '../../../../entities/shexEntities/triple';


function ShapeComponent (props) {

    const context = useContext(AppContext);
    const {shape} = props;

    const [triples,setTriples] = useState(shape.triples);
    const [isCustomOpen,setCustomOpen] = useState(false);
    const [isTriplesOpen,setTriplesOpen] = useState(true);
    const [colapseBtn,setColapseBtn] = useState('menu_open');

    let initialHidding = 'triples';
    if(shape.type.value ==''){
        initialHidding = 'hideTriples';
    }
    const [hidding,setHidding] = useState(initialHidding);
   
    const addTriple = function(){
        const id = shape.getTriplesCount();
        const triple = new Triple(id);

        setTriples([...triples,triple]);
        
        shape.addTriple(triple);
        context.emit();        
    }

    const deleteTriple = function(tripleId){
        const newTriples = shape.triples.filter( triple => triple.id != tripleId);
        setTriples(newTriples)
        shape.setTriples(newTriples);
        context.emit();
        
    }

    const customizeShape = function(){
        //Completly collapsed shape open just customShape
        if(!isCustomOpen && !isTriplesOpen ){
            setCustomOpen(true);
            setTriplesOpen(false);
        }else{
            //CustomShape opened  opens triples on collapse
            setCustomOpen(!isCustomOpen);
            setTriplesOpen(!isTriplesOpen);
        }

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

    return (
        <div className="shape">
            <ShapeHeader shape={shape} 
                         customizeShape={customizeShape} 
                         collapseTriples={collapseTriples} 
                         colapseBtn={colapseBtn}
                         setHidding={setHidding}/>

            <CustomComp  entity={shape}
                         isCustomOpen={isCustomOpen}
                         qualifier={true}
                         bnode={true}
                         customClass="customShape"/>
                 
            <Collapse   isOpen={isTriplesOpen}>

                     
                <div className={"sTriples"+shape.id+" triples"}>
                    {triples.map(triple =>
                        <TripleComponent key={triple.id}
                                         shape={shape} 
                                         triple={triple}
                                         deleteTriple={deleteTriple}
                        /> 
                    )}
                
                    <button className="addTripleButton" onClick={addTriple} title="Add Triple">+ Triple Constraint</button>        
                   
              
                </div>

                <div className={"msgTriples"+shape.id+" hiddenMsg"}>
                    <p>First, write a name for your shape</p>
                </div>
            </Collapse> 
        </div>
    );
                                   
    
}


export default ShapeComponent;
