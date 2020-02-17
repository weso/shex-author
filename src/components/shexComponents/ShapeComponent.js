import React,{useContext,useState} from 'react';
import { Collapse } from 'reactstrap';

import {ShapesContext} from '../../App';

import ShapeHeader from  './headers/ShapeHeader';
import CustomShape from './customize/CustomShape';
import TripleComponent from './TripleComponent';

import Triple from '../../entities/shexEntities/triple';




function ShapeComponent (props) {

    const context = useContext(ShapesContext);
    const {shape} = props;

    const [triples,setTriples] = useState(shape.triples);
    const [isCustomOpen,setCustomOpen] = useState(false);
    const [isTriplesOpen,setTriplesOpen] = useState(true);
    const [isPrefix,setPrefix] = useState(true);
    const [colapseBtn,setColapseBtn] = useState('menu_open');


    const addTriple = ()=>{
        const id = shape.getTriplesCount();
        const triple = new Triple(id);
        
        setTriples([...triples,triple]);

        shape.addTriple(triple);
        context.emit();
        
    }

    const deleteTriple = (tripleId)=>{
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

     const collapsePrefix = function(evt){
        if(evt.target.value=='1'){
            setPrefix(true);
        }else{
            setPrefix(false);
        }    
    }

    return (
        <div className="shape" key={shape.id}>

            <ShapeHeader shape={shape} 
                         customizeShape={customizeShape} 
                         collapseTriples={collapseTriples} 
                         colapseBtn={colapseBtn}/>

            <CustomShape isCustomOpen={isCustomOpen} 
                         isPrefix={isPrefix} 
                         collapsePrefix={collapsePrefix}/>
                 
            <Collapse isOpen={isTriplesOpen} >
                <div className="triples">
                    {triples.map(triple =>
                        <TripleComponent key={triple.id}
                                         shape={shape} 
                                         triple={triple}
                                         deleteTriple={deleteTriple}
                        /> 
                    )}
                    <button className="addTripleButton" onClick={addTriple}>+ Triple</button>        
                </div>                    
            </Collapse> 
        </div>
    );
                                   
    
}


export default ShapeComponent;

