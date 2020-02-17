import React,{useContext,useState} from 'react';
import { Collapse } from 'reactstrap';

import {ShapesContext} from '../../App';

import TripleComponent from './TripleComponent';
import ShapeTypeComp from './types/ShapeTypeComp';
import Qualifier from './utils/Qualifier';

import Triple from '../../entities/shexEntities/triple';

import CustomShape from './customize/CustomShape';

function ShapeComponent (props) {

    const context = useContext(ShapesContext);
    const {shape} = props;

    const [triples,setTriples] = useState(shape.triples);

 
     const [isQualiOpen, setQualiOpen] = useState(false);


    const addTriple = ()=>{
        const id = shape.getTriplesCount();
        const triple = new Triple(id);
        
        setTriples([...triples,triple]);

        shape.addTriple(triple);
        context.emit();
        
    }

    const handleTriplesColapse = ()=>{
            if(colapseBtn=='expand_more'){
                setColapseBtn('expand_less');
            }else{
                setColapseBtn('expand_more');
            }
           setTriplesOpen(!isTriplesOpen);
    }


    const handleQualiCollapse = ()=>{
        setQualiOpen(!isQualiOpen);
    }

    const deleteTriple = (tripleId)=>{
        const newTriples = shape.triples.filter( triple => triple.id != tripleId);
        setTriples(newTriples);
        shape.setTriples(newTriples);
        context.emit();
    }






    const [isCustomOpen,setCustomOpen] = useState(false);
    const [isTripleCustomOpen,setTripleCustomOpen] = useState(false);
    const [isTriplesOpen,setTriplesOpen] = useState(true);
    const [isPrefix,setPrefix] = useState(true);

    const [colapseBtn,setColapseBtn] = useState('menu_open');



    const customize = function(){
        setCustomOpen(!isCustomOpen);
        setTriplesOpen(false);
        setColapseBtn('menu');
    }

    const triplesMenu = function(){
        setCustomOpen(false);
        setTriplesOpen(!isTriplesOpen);

        if(colapseBtn=='menu'){
            setColapseBtn('menu_open');
        }else{
            setColapseBtn('menu');
        }
    }

     const open = function(evt){
            if(evt.target.value=='1'){
                setPrefix(true);
            }else{
                setPrefix(false);
            }
            
    }

    const del = function(id){
        context.deleteShape(id);
    }


     const customizeTriple = function(){
        setTripleCustomOpen(!isTripleCustomOpen);
        //setTriplesOpen(false);
        //setColapseBtn('menu');
    }


    return (
        <div className="shape" key={shape.id}>
            <div className="header">            
                <label className="shapeNameLabel">Shape </label>
                <input type="text" className="form-control shapeName"/>
                <button className="accordion mdc-icon-button material-icons" onClick={customize}>build</button>
                <button className="deleteShapeBtn mdc-icon-button material-icons" onClick={()=>del(shape.id)}>delete</button>
                <button className="triplesBtn mdc-icon-button material-icons" onClick={triplesMenu}>{colapseBtn}</button>
            </div>
            <CustomShape isCustomOpen={isCustomOpen} isPrefix={isPrefix} open={open}/>
                 
            <Collapse isOpen={isTriplesOpen} >
                <div className="triples">
                    {triples.map(triple =>

                        <TripleComponent key={triple.id}
                                         shape={shape} 
                                         triple={triple}
                                         deleteTriple={deleteTriple}
                                         customizeTriple={customizeTriple}
                                         isTripleCustomOpen={isTripleCustomOpen}
                        /> 
                    )}
                    <button 
                        className="addTripleButton"
                        onClick={addTriple}>
                        + Triple
                </button>        
                </div>
                    
            </Collapse> 
           
            

                    </div>
     
    );
                                   
    
}


export default ShapeComponent;

