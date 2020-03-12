import React,{useState,useContext} from 'react';
import {AppContext} from '../../../../App';
import yasheUtils from '../../../../utils/yasheUtils';

import '../../../../css/shexComponents/headers/TripleHeader.css';


const primitives = ['String','Integer','Date','Boolean','Custom'];


function TripleHeader (props) {

    const context = useContext(AppContext);
    const { triple,
            deleteTriple,
            customizeTriple,
            forceCollapse,
            customizeInline,
            collapseConstraints,
            customizeCardinality,
            collapseToggle,
            colapseBtn,
            rounded} = props;

    const [name,setName] = useState(triple.type.value);
    const [cardinality,setCardinality] = useState(triple.cardinality);

    const handleNameChange = function(e){
        const name = e.target.value;
        triple.type.setValue(name);
        context.emit();
        setName(name);
    }

    let initialPrimitive = 'custom'
    if(triple.value.value != ''){
        initialPrimitive = triple.value.value;
    }
    const [primitive,setPrimitive] = useState(initialPrimitive);


    const handlePrimitiveChange = function(e){
        const primitive = e.target.value;

        if(primitive == 'custom'){
            setPrimitive('custom')
            forceCollapse(true);
            return;
        }

        triple.setValue('primitive');
        triple.value.setValue(primitive);
        triple.inlineShape.shape = null;
        context.emit();
        setPrimitive(primitive);
        forceCollapse(false);
    }

    const handleCardinalityChange = function(e){
        let newCardinality = e.target.value;
        triple.setCardinality(newCardinality);
        context.emit();
        setCardinality(newCardinality)
       
    }

    const handleCollapse = function(){
        setPrimitive('custom')
        collapseConstraints();
    }
   
   
    return (
        <div className={rounded+" tripleHeader "+context.tripleHeader}>            
            <label  className={context.tripleLabel}>Triple</label>
            <input  type="text" 
                    className="name"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="eg: name"
                    title="Triple Name"/>

            <button className={context.tripleBtns+" buildTriple buildBtn buildTripleBtn mdc-icon-button material-icons"} 
                    onClick={customizeTriple} 
                    title="Customize Triple">
                    build
            </button>

            <button className={context.tripleBtns+" buildConstraint buildBtn buildTripleBtn mdc-icon-button material-icons"}  
                    onClick={handleCollapse} 
                    title="Customize Constraint">
                    build
            </button>

            <button className={context.tripleBtns+" buildInlineRef buildBtn buildTripleBtn mdc-icon-button material-icons"}  
                    onClick={customizeInline} 
                    title="Customize InlineOrRef">
                    build
            </button>

            <button className={context.tripleBtns+" buildCardinality buildBtn buildTripleBtn mdc-icon-button material-icons"}  
                    onClick={customizeCardinality} 
                    title="Customize Cardinality">
                    build
            </button>

            <button className={context.tripleBtns+" deleteTripleBtn mdc-icon-button material-icons"} 
                    onClick={()=>deleteTriple(triple.id)} 
                    title="Delete Triple">
                    delete
            </button>

            <button className="collapseBtn mdc-icon-button material-icons" 
                    onClick={collapseToggle} 
                    title="Show Triples">
                    {colapseBtn}
            </button>
        </div>
    );
                                   
    
}


export default TripleHeader;

