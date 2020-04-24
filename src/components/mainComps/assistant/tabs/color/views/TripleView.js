import React,{useContext,useState} from 'react';
import Properties from '../../../../../../conf/properties';

function TripleView (props) {

        const styles = Properties.getInstance().getTripleStyle();

        return (  <div className="xs-tripleHeader" style={styles.header}>            
            <input  type="text" 
                    className="name"
                    placeholder="eg: name"
                    title="Triple Constraint Name"/>

            <button className="tripleBtns buildTriple buildBtn buildTripleBtn mdc-icon-button material-icons"
                    style={styles.custom}
                    title="Customize Triple">
                    build
            </button>

            <button className="tripleBtns deleteTripleBtn mdc-icon-button material-icons"
                    style={styles.delete}
                    title="Delete Triple Constraint">
                    delete
            </button>
        </div>);
}

export default TripleView;
