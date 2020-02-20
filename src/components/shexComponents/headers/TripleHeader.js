import React,{useState,useContext} from 'react';
import {ShapesContext} from '../../../App';

const primitives = ['String','Integer','Date','Boolean'];


function TripleHeader (props) {

    const context = useContext(ShapesContext); 
    const {triple,deleteTriple,customizeTriple,colapseBtn,collapseConstraints} = props;

    const [name,setName] = useState(triple.type.value);
    const [primitive,setPrimitive] = useState(triple.value.value);
    const [cardinality,setCardinality] = useState(triple.cardinality);
   
    const handleNameChange = function(e){
        const name = e.target.value;
        triple.type.setValue(name);
        context.emit();
        setName(name);
    }


    const handlePrimitiveChange = function(e){
        const primitive = e.target.value;
        triple.setValue('primitive');
        triple.value.setValue(primitive);
        context.emit();
        setPrimitive(primitive)
    }

    const handleCardinalityChange = function(e){
        let newCardinality = e.target.value;
        triple.setCardinality(newCardinality);
        context.emit();
        setCardinality(newCardinality)
       
    }
   
   
    return (
        <div className={"tripleHeader "+context.tripleClass}>            
            <label  className="tripleNameLabel">Triple</label>
            <input  type="text" 
                    className="form-control shapeName"
                    value={name}
                    onChange={handleNameChange}/>
             <select className="customSelector" 
                    value={primitive} 
                    onChange={handlePrimitiveChange}>
                {
                    primitives.map(prim =>{
                        return <option key={prim} value={prim.toLowerCase()}>{prim}</option>
                    })
                }
            </select>
             <select className="customSelector" value={cardinality} onChange={handleCardinalityChange}>
                    <option value="">Exactly one</option>
                    <option value="*">Zero or more</option>
                    <option value="+">One at least</option>
                    <option value="?">One or none</option>
                </select>
            <button className={context.tripleBtns+" buildTriple buildBtn buildTripleBtn mdc-icon-button material-icons"} onClick={customizeTriple}>build</button>
            <button className={context.tripleBtns+" buildConstraint buildBtn buildTripleBtn mdc-icon-button material-icons"}  onClick={collapseConstraints}>build</button>
            <button className={context.tripleBtns+" deleteTripleBtn mdc-icon-button material-icons"} onClick={()=>deleteTriple(triple.id)}>delete</button>

        </div>
    );
                                   
    
}


export default TripleHeader;

