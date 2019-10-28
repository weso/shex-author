
import React,{useContext} from 'react';

import {ShapesContext} from '../../App';

import TripleComponent from './TripleComponent';
import ShapeTypeComp from './types/ShapeTypeComp';

let Triple = require('../../entities/shexEntities/triple.js');
let ShapeStore = require('../../entities/shapeStore.js');

function ShapeComponent (props) {

    const context = useContext(ShapesContext);
    const {shape} = props;

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
            <div className="triples-container col-xs">
                    {shape.triples.map(triple =>

                        <TripleComponent key={triple.id}
                                         shape={shape} 
                                         triple={triple}
                        /> 
                            
                    )}
            </div>
         </div>   
        
        
    );
                                   
    
}

export default ShapeComponent;

