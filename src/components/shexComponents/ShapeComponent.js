
import React,{useContext,useState} from 'react';

import {ShapesContext} from '../../App';

import TripleComponent from './TripleComponent';
import ShapeTypeComp from './types/ShapeTypeComp';

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

    return (
        <div className="shapes-container">
            <div className="row shapes-header">
                <label className="col-sm-2">Shape </label>
                    <ShapeTypeComp shape={shape}/>
                    <button className="col-xs-10 deleteShapeButton mdc-icon-button material-icons btn-danger" 
                            onClick={()=>context.deleteShape(shape.id)}>
                            delete
                    </button>
            </div>

            <button className="btn-primary addPropButton col-xs-3"
                    onClick={handleChange}>
                    + Triple</button>

            <div className="triples-container col-xs">
                    {triples.map(triple =>

                        <TripleComponent key={triple.id}
                                         shape={shape} 
                                         triple={triple}
                                         deleteTriple={deleteTriple}
                        /> 
                            
                    )}
            </div>
         </div>   
        
        
    );
                                   
    
}

export default ShapeComponent;

