
import React,{useContext,useState} from 'react';
import SlideToggle from "react-slide-toggle";

import {ShapesContext} from '../../App';

import TripleComponent from './TripleComponent';
import ShapeTypeComp from './types/ShapeTypeComp';
import Qualifier from './qualifier/Qualifier';

let Triple = require('../../entities/shexEntities/triple.js');

function ShapeComponent (props) {

    const context = useContext(ShapesContext);
    const {shape} = props;

    const [triples,setTriples] = useState(shape.triples);

    const handleChange = ()=>{
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
    /*

    {
                            shape.facets.map(facet =>{
                                <div className="col row qualifier"  style={context.currentStyle}>
                                <label className="col-2 qualiLabel">Facet</label>
                                <div className="col-2">
                                Aqui van jsjs
                                </div>
                            })

                        }
    */

    return (
        <div className="shapes-container" style={context.currentStyle}>
            <SlideToggle duration={180}
                         
                         render={({ toggle, setCollapsibleElement, progress }) => (
                <div>              
                    <div className="row shapes-header" style={context.currentStyle}>
                        <label className="col-sm-2">Shape </label>
                        <ShapeTypeComp shape={shape} colapse={toggle}/>
                    
                    </div>
            
                    <div className="row qualifier" ref={setCollapsibleElement} style={context.currentStyle}>
                       
                            <label className="col-2 qualiLabel">Qualifier </label>
                            <div className="col-2">
                                <Qualifier shape={shape} scope='shape'/>
                            </div>

                            
                            <div className="row col-4">
                                <label className="col facetLabel">Facet</label>
                                <div className="col">
                                <Qualifier shape={shape} scope='shape'/>
                                </div>
                            </div>

                            
                

                    </div>

                </div>

            )}/>

            <div className="triples-container col-xs "style={context.currentStyle}>
                    {triples.map(triple =>

                        <TripleComponent key={triple.id}
                                         shape={shape} 
                                         triple={triple}
                                         deleteTriple={deleteTriple}
                        /> 
                            
                    )}
            </div>

            <button className="btn-primary addPropButton col-xs-3"
                    onClick={handleChange}>
                    + Triple</button>

         </div>   
        
        
    );
                                   
    
}

export default ShapeComponent;

