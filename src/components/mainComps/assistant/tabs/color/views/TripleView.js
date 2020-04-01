import React,{useContext,useState} from 'react';
import {AssistContext} from '../../../../Assistant';

import Styles from '../../../../../../conf/styles';

function TripleView (props) {

        const assistContext = useContext(AssistContext);
        const styles = Styles.getInstance().getTriplesStyle();

        return (  <div className="tripleHeader" style={styles.header}>            
            <input  type="text" 
                    className="name"
                    placeholder="eg: name"
                    title="Triple Constraint Name"/>

            <button className="tripleBtns buildTriple buildBtn buildTripleBtn mdc-icon-button material-icons"
                    style={styles.custom}
                    title="Customize Triple">
                    build
            </button>

            <button className="tripleBtns buildConstraint buildBtn buildTripleBtn mdc-icon-button material-icons"
                    style={styles.constraint}
                    title="Customize Constraint">
                    build
            </button>

             <button className="tripleBtns buildFacet buildBtn buildTripleBtn mdc-icon-button material-icons"
                    style={styles.facet}
                    title="Customize Facets">
                    build
            </button>

            <button className="tripleBtns buildInlineRef buildBtn buildTripleBtn mdc-icon-button material-icons"  
                    style={styles.shapeRef}
                    title="Customize Shape Reference">
                    build
            </button>

           
            <button className="tripleBtns buildCardinality buildBtn buildTripleBtn mdc-icon-button material-icons" 
                    style={styles.cardinality}
                    title="Customize Cardinality">
                    build
            </button>

            <button className="tripleBtns deleteTripleBtn mdc-icon-button material-icons"
                    style={styles.delete}
                    title="Delete Triple Constraint">
                    delete
            </button>

            <button className="collapseBtn mdc-icon-button material-icons" 
                    style={styles.collapse}
                    title="Customize all">
                    menu
            </button>
        </div>);
}

export default TripleView;
