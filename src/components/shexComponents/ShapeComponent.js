import React,{useContext,useState} from 'react';
import { Collapse } from 'reactstrap';

import {ShapesContext} from '../../App';

import TripleComponent from './TripleComponent';
import ShapeTypeComp from './types/ShapeTypeComp';
import Qualifier from './utils/Qualifier';

import Triple from '../../entities/shexEntities/triple';

function ShapeComponent (props) {

    const context = useContext(ShapesContext);
    const {shape} = props;

    const [triples,setTriples] = useState(shape.triples);

 
     const [isQualiOpen, setQualiOpen] = useState(false);


    const handleChange = ()=>{
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
                                    <div/>
                                    <div/>
                                    <button className="triplesBtn mdc-icon-button material-icons" onClick={triplesMenu}>{colapseBtn}</button>
                                
                                </div>

            
                                <Collapse isOpen={isCustomOpen} >
                                        <div className="custom">
                                            
                                            <div className="box1 gridBox">
                                                <div/>
                                                <label>Type </label>
                                                <select className="customSelector" onChange={open}>
                                                    <option value="0">IriRef</option>
                                                    <option value="1" selected>PrefixedIri</option>
                                                    <option value="2">Bnode</option>
                                                </select>
                                            </div>

                                            <Collapse isOpen={isPrefix} className="box2 gridBox">
                                                <div/>
                                                <label>Prefix </label>
                                                <select className="customSelector">
                                                    <option value="0">default</option>
                                                    <option value="1">xsd</option>
                                                    <option value="2">schema</option>
                                                </select>
                                            </Collapse>


                                            <div className="box3 gridBox">
                                                <div/>
                                                <label>Qualifier </label>
                                                <select className="customSelector">
                                                    <option value="1">None</option>
                                                    <option value="2">Iri</option>
                                                    <option value="3">Literal</option>
                                                    <option value="4">NonLiteral</option>
                                                    <option value="5">Bnode</option>
                                                </select>
                                            </div>
                                        </div>
                                    </Collapse> 
                        <div/>
                        <Collapse isOpen={isTriplesOpen} >
                                <div className="triples">
                                    
                                    
                                    <div className="tripleHeader">
                                    
                                    
                                        <label>Triple </label>
                                        <input type="text" className="form-control shapeName"/>
                                        <select className="customSelector">
                                                <option value="0">String</option>
                                                <option value="1">Integer</option>
                                                <option value="2">Boolean</option>
                                                <option value="2">Date</option>
                                        </select>
                                                            
                                        <select className="customSelector">
                                            <option value="">Exactly one</option>
                                            <option value="*">Zero or more</option>
                                            <option value="+">One at least</option>
                                            <option value="?">One or none</option>
                                        </select>
                                        
                                        <button className="accordion mdc-icon-button material-icons" onClick={customizeTriple}>build</button>
                                        <button className="deleteShapeBtn mdc-icon-button material-icons" onClick={()=>del(shape.id)}>delete</button>
                                    </div>

                                    
                                    <Collapse isOpen={isTripleCustomOpen} className='customColapse' >
                                        <div className="customTriple">
                                            <div className="gridTriplesBox">
                                                <div/>
                                                <label>Type </label>
                                                <select className="customSelector" onChange={open}>
                                                    <option value="0">IriRef</option>
                                                    <option value="1" selected>PrefixedIri</option>
                                                    <option value="2">Bnode</option>
                                                </select>
                                            </div>

                                            <Collapse isOpen={isPrefix} className="gridTriplesBox">
                                                <div/>
                                                <label>Prefix </label>
                                                <select className="customSelector">
                                                    <option value="0">default</option>
                                                    <option value="1">xsd</option>
                                                    <option value="2">schema</option>
                                                </select>
                                            </Collapse>


                                            <div className="gridTriplesBox">
                                                <div/>
                                                <label>Value </label>
                                                <select className="customSelector" >
                                                    <option value="0">IriRef</option>
                                                    <option value="1" selected>PrefixedIri</option>
                                                    <option value="2">Shape</option>
                                                    <option value="3">Literal</option>
                                                    <option value="4">NonLiteral</option>
                                                    <option value="5">IRI</option>
                                                    <option value="6">BNode</option>
                                                </select>
                                            </div>
                                
                                        </div>
                                    </Collapse> 
                                    
                        
                                    <button 
                                        className="addTripleButton"
                                        onClick={context.addShape}>
                                        + Triple
                                </button>        
                                </div>
                                
                        </Collapse> 
           
            

                    </div>
     
    );
                                   
    
}


export default ShapeComponent;

