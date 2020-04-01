import React,{useContext,useState} from 'react';
import {AssistContext} from '../../../Assistant';
import ShapeView from './views/ShapeView';
import TripleView from './views/TripleView';
import ColorComp from './utils/ColorComp';
import {SHAPE_PICKERS,TRIPLE_PICKERS} from '../../../../../conf/properties';

function ShapeColors (props) {

        const assistContext = useContext(AssistContext);
        
        return ( <div className="shape" style={assistContext.styles.header}>
                    <ShapeView/>
                    <TripleView/>
                    <ColorComp customClass='customShape' pickers={SHAPE_PICKERS}/>
                    
                    <ColorComp customClass='customTriple' pickers={TRIPLE_PICKERS}/>
                    <div className="triples" style={assistContext.styles.body}>
                        <button className="addTripleButton"
                                style={assistContext.styles.triple} 
                                title="Add Triple">
                                + Triple Constraint
                        </button>
                    </div>
                </div>);
}

export default ShapeColors;
