import React,{useContext,useState} from 'react';
import {AssistContext} from '../../../Assistant';
import ShapeView from './views/ShapeView';
import TripleView from './views/TripleView';
import ColorComp from './utils/ColorComp';
import {SHAPE_PICKERS,TRIPLE_PICKERS} from '../../../../../conf/properties';

function ShapeColors (props) {

        const assistContext = useContext(AssistContext);

        const styles ={
            header:assistContext.shapeStyles.header,
            body:assistContext.shapeStyles.body,
        }  
        
        return ( <div className="shape" style={styles.header}>
                    <ShapeView/>
                    <TripleView/>
                    <ColorComp customClass='customShape' pickers={SHAPE_PICKERS}/>
                    
                    <ColorComp customClass='customTriple' pickers={TRIPLE_PICKERS}/>
                    <div className="triples" style={styles.body}>
                        <button className="addTripleButton"
                                title="Add Triple">
                                + Triple Constraint
                        </button>
                    </div>
                </div>);
}

export default ShapeColors;
