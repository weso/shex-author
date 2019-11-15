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
    const [colapseBtn,setColapseBtn] = useState(context.colapseBtn);
    const [isQualiOpen, setQualiOpen] = useState(false);
    const [isTriplesOpen, setTriplesOpen] = useState(true);


    const handleChange = ()=>{
        const id = shape.getTriplesCount();
        const triple = new Triple(id);
        
        setTriples([...triples,triple]);

        shape.addTriple(triple);
        context.emit();
        
    }

    const handleTriplesColapse = ()=>{
        if(context.colapseBtn=='expand_more'){
            context.setColapseBtn('expand_less');
        }else{
            context.setColapseBtn('expand_more');
        }
        //context.triplesToggle();
        setTriplesOpen(!isTriplesOpen);
        console.log('jasjkd')
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


    return (
        <div className="shapes-container" style={context.currentStyle}>
                     
                <div className="row shapes-header" style={context.currentStyle}>
                    <label className="col-sm-2">Shape </label>
                    <ShapeTypeComp shape={shape} collapse={handleQualiCollapse}/>
                
                </div>
        
                <Collapse isOpen={isQualiOpen}  timeout={110}>
                    <div className="row qualifier" style={context.currentStyle}>
                            <label className="col-2 qualiLabel">Qualifier </label>
                            <div className="col-2">
                                <Qualifier shape={shape} scope='shape'/>
                            </div>
                    </div>
                </Collapse>
           

         
                <button className="col-xs-1  colapseTriplesBtn mdc-icon-button material-icons btn-primary"
                        onClick={()=>handleTriplesColapse()}>
                        {context.colapseBtn}
                </button>
                

                
                     <Collapse isOpen={isTriplesOpen}  style={context.currentStyle}>
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
                                + Triple
                        </button>
                     </Collapse>
             
                
            </div>
     
    );
                                   
    
}


export default ShapeComponent;

