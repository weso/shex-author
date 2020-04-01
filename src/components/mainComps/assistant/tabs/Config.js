import React,{useContext,useState} from 'react';
import {AssistContext} from '../../Assistant';
import ShapeView from './color/ShapeView';
import ColorComp from './color/ColorComp';

function Config (props) {

        const assistContext = useContext(AssistContext);
        return ( <div className="shape" style={assistContext.styles.header}>
                    <ShapeView/>
                    <ColorComp customClass='customShape'/>
                     <div className="triples" style={assistContext.styles.body}>
                        <button className="addTripleButton"
                                style={assistContext.styles.triple} 
                                title="Add Triple">
                                + Triple Constraint
                        </button>
                    </div>
                    <ShapeView/>
                    <ColorComp customClass='customTriple'/>
                </div>);
}

export default Config;

/*

import Toggle from 'react-toggle';
import "react-toggle/style.css";

*/