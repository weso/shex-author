import React,{useState,useContext} from 'react';
import {ShapesContext} from '../../../App';

import yasheUtils from '../../../utils/yasheUtils';


const primitives = ['String','Integer','Date','Boolean','Custom'];


function TripleHeader (props) {

    const context = useContext(ShapesContext); 
    const {triple,deleteTriple,customizeTriple,forceCollapse,collapseConstraints,rounded} = props;

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
        <div className={rounded+" tripleHeader "+context.tripleClass}>            
            <label  className={context.tripleLabel+" shapeTripleLabel"}>Triple</label>
            <input  type="text" 
                    className="shapeName"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="eg: name"
                    title="Triple Name"/>

             <select className="customSelector" 
                    value={primitive} 
                    onChange={handlePrimitiveChange}
                    title="Constraint">
                {
                    primitives.map(prim =>{
                        return <option key={prim} value={prim.toLowerCase()}>{prim}</option>
                    })
                }
            </select>

            <select className="customSelector" 
                    value={cardinality} 
                    onChange={handleCardinalityChange} 
                    title="Cardinality">
                    <option value="">Exactly one</option>
                    <option value="*">Zero or more</option>
                    <option value="+">One at least</option>
                    <option value="?">One or none</option>
            </select>

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

            <button className={context.tripleBtns+" deleteTripleBtn mdc-icon-button material-icons"} 
                    onClick={()=>deleteTriple(triple.id)} 
                    title="Delete Triple">
                    delete
            </button>

        </div>
    );
                                   
    
}


export default TripleHeader;

