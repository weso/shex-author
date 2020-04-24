import React,{useState,useContext} from 'react';
import {AppContext} from '../../../../../../App';
import {ShapeContext} from '../ShapeComponent';
import yasheUtils from '../../../../../../utils/yasheUtils';
import Properties from '../../../../../../conf/properties';
import '../../../../../../css/shexComponents/headers/TripleHeader.css';

function TripleHeader (props) {

    const context = useContext(AppContext);
    const shapeContext = useContext(ShapeContext);
    const styles = Properties.getInstance().getTripleStyle();
    const disabled = shapeContext.disabled;

    const { triple,
            deleteTriple,
            customize,
            customizeTriple,
            customizeRef,
            customizeFacet,
            customizeContraints,
            customizeCardinality,
            collapseToggle,
            colapseBtn
            } = props;

    const [name,setName] = useState(triple.type.value);

    const handleNameChange = function(e){
        const name = e.target.value;
        triple.type.setValue(name);
        context.emit();
        setName(name);
    }


   
    return (
        <div className="xs-tripleHeader" style={styles.header}>            
            <input  type="text" 
                    className="name"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="eg: name"
                    disabled={disabled}
                    title="Triple Constraint Name"/>

            <button className="tripleBtns buildTriple buildBtn buildTripleBtn mdc-icon-button material-icons"
                    style={styles.custom}
                    onClick={customize}
                    disabled={disabled} 
                    title="Customize Triple Constraint">
                    build
            </button>

            

            <button className="tripleBtns deleteTripleBtn mdc-icon-button material-icons"
                    style={styles.delete}
                    onClick={()=>deleteTriple(triple.id)}
                    disabled={disabled} 
                    title="Delete Triple Constraint">
                    delete
            </button>
            

        </div>
    );
                                   
    
}


export default TripleHeader;
