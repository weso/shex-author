import React,{useContext,useState} from 'react';
import {AppContext} from '../../../../App';
import Toggle from 'react-toggle';
import ShapeComponent from './shEx/ShapeComponent';
import Shape from '../../../../entities/shexEntities/shape';
import Triple from '../../../../entities/shexEntities/triple';
import "react-toggle/style.css";


// UN COMPONENTE PA ESTO?
// PA REPETIR EXACTAMENTE LO MISMO QUE EN SHAPES?

function Config (props) {

        const context = useContext(AppContext);
  
        return ( 
                <div>
                    {context.shapes.map(shape =>{return  <ShapeComponent shape={shape} key={shape.id}/> })}
                        <div className="addCont">
                            <button className="addShapeButton"
                                    onClick={context.addShape}
                                    title="Add Shape">
                                    + Shape
                            </button>
                        </div>
                </div>);
        );
}

export default Config;
