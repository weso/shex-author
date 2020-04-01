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

import {SHAPE_COLORS,
        TRIPLE_COLORS,
        CONSTRAINT_COLORS,
        FACET_COLORS,
        SHAPEREF_COLORS,
        CARDINALITY_COLORS} from '../../../../../conf/colors';


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

                    <ColorComp  namespace={SHAPE_COLORS} 
                                pickers={SHAPE_PICKERS} 
                                bodyType={styles.shapeBody}/>   

                    <ColorComp  namespace={TRIPLE_COLORS} 
                                pickers={TRIPLE_PICKERS} 
                                bodyType={styles.tripleBody}/>
                                
                    <ColorComp  namespace={CONSTRAINT_COLORS} 
                                pickers={CONSTRAINT_PICKERS} 
                                bodyType={styles.constraintBody}/>

                    <ColorComp  namespace={FACET_COLORS} 
                                pickers={FACET_PICKERS} 
                                bodyType={styles.facetBody}/>

                    <ColorComp  namespace={SHAPEREF_COLORS} 
                                pickers={SHAPEREF_PICKERS} 
                                bodyType={styles.shapeRefBody}/>
                                
                    <ColorComp  namespace={CARDINALITY_COLORS} 
                                pickers={CARDINALITY_PICKERS} 
                                bodyType={styles.cardinalityBody}/>

                    <div className="triples" style={styles.shapeBody}>
                        <button className="addTripleButton"
                                title="Add Triple">
                                + Triple Constraint
                        </button>
                    </div>
                    
                </div>);
}

export default ShapeColors;
