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

        const shapeStyles = Styles.getInstance().getShapeStyle();
        const tripleStyles = Styles.getInstance().getTripleStyle();
        const constraintStyles = Styles.getInstance().getConstraintStyle();
        const facetStyles = Styles.getInstance().getFacetStyle();
        const shapeRefStyles = Styles.getInstance().getShapeRefStyle();
        const cardinalityStyles = Styles.getInstance().getCardinalityStyle();

        return ( <div className="shape" style={shapeStyles.header}>
        
                    <ShapeView/>
                    <TripleView/>

                    <ColorComp  namespace={SHAPE_COLORS} 
                                pickers={SHAPE_PICKERS} 
                                labelType={shapeStyles.label}
                                bodyType={shapeStyles.body}/>   

                    <ColorComp  namespace={TRIPLE_COLORS} 
                                pickers={TRIPLE_PICKERS}
                                labelType={tripleStyles.label} 
                                bodyType={tripleStyles.body}/>
                                
                    <ColorComp  namespace={CONSTRAINT_COLORS} 
                                pickers={CONSTRAINT_PICKERS}
                                labelType={constraintStyles.label} 
                                bodyType={constraintStyles.body}/>

                    <ColorComp  namespace={FACET_COLORS} 
                                pickers={FACET_PICKERS}
                                labelType={facetStyles.label} 
                                bodyType={facetStyles.body}/>

                    <ColorComp  namespace={SHAPEREF_COLORS} 
                                pickers={SHAPEREF_PICKERS} 
                                labelType={shapeRefStyles.label}
                                bodyType={shapeRefStyles.body}/>
                                
                    <ColorComp  namespace={CARDINALITY_COLORS} 
                                pickers={CARDINALITY_PICKERS}
                                labelType={cardinalityStyles.label} 
                                bodyType={cardinalityStyles.body}/>

                    <div className="triples" style={shapeStyles.body}>
                        <button className="addTripleButton"
                                title="Add Triple">
                                + Triple Constraint
                        </button>
                    </div>
                    
                </div>);
}

export default ShapeColors;
