
import React,{useContext} from 'react';

import {ShapesContext} from '../../App';

import TripleComponent from './TripleComponent';
import ShapeTypeComp from './types/ShapeTypeComp';

let Triple = require('../../entities/shexEntities/triple.js');
let ShapeStore = require('../../entities/shapeStore.js');

function ShapeComponent (props) {

    const context = useContext(ShapesContext);

    return (
        <div className="shapes-container">
            <div className="row shapes-header">
                <label className="col-sm-2">Shape </label>
                    <ShapeTypeComp shape={props.shape}/>
                    <button className="col-xs-10 deleteShapeButton mdc-icon-button material-icons btn-danger" 
                            onClick={()=>context.deleteShape(props.shape.id)}>
                                delete
                    </button>
            </div>
         </div>   
        
        
    );
                                   
    
}

export default ShapeComponent;

