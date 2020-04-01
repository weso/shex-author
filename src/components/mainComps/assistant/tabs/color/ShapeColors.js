import React,{useContext,useState} from 'react';
import {AssistContext} from '../../../Assistant';
import ShapeView from './views/ShapeView';
import TripleView from './views/TripleView';
import ColorComp from './utils/ColorComp';
import {SHAPE_PICKERS,
        TRIPLE_PICKERS,
        CONSTRAINT_PICKERS,
        FACET_PICKERS,
        SHAPEREF_PICKERS,
        CARDINALITY_PICKERS} from '../../../../../conf/pickers';

function ShapeColors (props) {

        const assistContext = useContext(AssistContext);

        const styles ={
            header:assistContext.shapeStyles.header,
            shapeBody:assistContext.shapeStyles.body,
            tripleBody:assistContext.tripleStyles.body,
            constraintBody:assistContext.tripleStyles.constraintBody,
            facetBody:assistContext.tripleStyles.facetBody,
            shapeRefBody:assistContext.tripleStyles.shapeRefBody,
            cardinalityBody:assistContext.tripleStyles.cardinalityBody,            
        }  
        
        return ( <div className="shape" style={styles.header}>
                    <ShapeView/>
                    <TripleView/>
                    <ColorComp customClass='customShape' pickers={SHAPE_PICKERS} bodyType={styles.body}/>                    
                    <ColorComp customClass='customTriple' pickers={TRIPLE_PICKERS} bodyType={styles.tripleBody}/>
                    <ColorComp customClass='constraintBody' pickers={CONSTRAINT_PICKERS} bodyType={styles.constraintBody}/>
                    <ColorComp customClass='facetBody' pickers={FACET_PICKERS} bodyType={styles.facetBody}/>
                    <ColorComp customClass='shapeRefBody' pickers={SHAPEREF_PICKERS} bodyType={styles.shapeRefBody}/>
                    <ColorComp customClass='cardinalityBody' pickers={CARDINALITY_PICKERS} bodyType={styles.cardinalityBody}/>
                    <div className="triples" style={styles.body}>
                        <button className="addTripleButton"
                                title="Add Triple">
                                + Triple Constraint
                        </button>
                    </div>
                    
                </div>);
}

export default ShapeColors;
