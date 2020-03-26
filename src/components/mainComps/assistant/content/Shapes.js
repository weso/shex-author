import React,{useContext} from 'react';
import {AppContext} from '../../../../App';
import ShapeComponent from './shEx/ShapeComponent';

function Shapes (props) {

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
}


export default Shapes;

