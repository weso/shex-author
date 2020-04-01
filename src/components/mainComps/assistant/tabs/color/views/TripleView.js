import React,{useContext,useState} from 'react';
import {AssistContext} from '../../../../Assistant';

function TripleView (props) {

        const assistContext = useContext(AssistContext);
        return ( <div className="tripleHeader">            
                        <input  type="text" 
                                className="name"
                                placeholder="eg: name"
                                title="Triple Constraint Name"/>

                        <button className="tripleBtns buildTriple buildBtn buildTripleBtn mdc-icon-button material-icons"
                                title="Customize Triple">
                                build
                        </button>

                        <button className="tripleBtns buildConstraint buildBtn buildTripleBtn mdc-icon-button material-icons"
                                title="Customize Constraint">
                                build
                        </button>

                        <button className="tripleBtns buildFacet buildBtn buildTripleBtn mdc-icon-button material-icons"
                                title="Customize Facets">
                                build
                        </button>

                        <button className="tripleBtns buildInlineRef buildBtn buildTripleBtn mdc-icon-button material-icons"  
                                title="Customize Shape Reference">
                                build
                        </button>

                    
                        <button className="tripleBtns buildCardinality buildBtn buildTripleBtn mdc-icon-button material-icons" 
                                title="Customize Cardinality">
                                build
                        </button>

                        <button className="tripleBtns deleteTripleBtn mdc-icon-button material-icons"
                                title="Delete Triple Constraint">
                                delete
                        </button>

                        <button className="collapseBtn mdc-icon-button material-icons" 
                                title="Customize all">
                                menu
                        </button>
                </div>);
}

export default TripleView;
