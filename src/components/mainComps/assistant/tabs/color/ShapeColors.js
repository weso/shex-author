import React,{useContext,useState} from 'react';
import ShapeView from './views/ShapeView';
import TripleView from './views/TripleView';
import ColorComp from './utils/ColorComp';
import {SHAPE_PICKERS,
        TRIPLE_PICKERS,
        CONSTRAINT_PICKERS,
        FACET_PICKERS,
        SHAPEREF_PICKERS,
        CARDINALITY_PICKERS} from '../../../../../conf/pickers';

import Styles from '../../../../../conf/styles';

function ShapeColors (props) {

        const shapeStyles = Styles.getInstance().getShapesStyle();
        const tripleStyles = Styles.getInstance().getTriplesStyle();
        const constraintStyles = Styles.getInstance().getConstraintStyle();
        const facetStyles = Styles.getInstance().getFacetStyle();
        const shapeRefStyles = Styles.getInstance().getShapeRefStyle();
        const cardinalityStyles = Styles.getInstance().getCardinalityStyle();

        const styles ={
            header:shapeStyles.header,
            shapeBody:shapeStyles.body,
            tripleBody:tripleStyles.body,
            constraintBody:constraintStyles.body,
            facetBody:facetStyles.body,
            shapeRefBody:shapeRefStyles.body,
            cardinalityBody:cardinalityStyles.body,            
        }  
        
        return ( <div className="shape" style={styles.header}>
                    <ShapeView/>
                    <TripleView/>
                    <ColorComp customClass='customShape' pickers={SHAPE_PICKERS} bodyType={styles.shapeBody}/>                    
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
