import React,{useState,useContext} from 'react';
import {ShapesContext} from '../../../../App';

function ShapeKindConfig (props) {

    const context = useContext(ShapesContext);
    const {shape,setPrefix,collapsePrefix} = props;
    const [kind,setKind] = useState(shape.type.getTypeName());
  
    const handleKindChange = function(e){
        const type  = e.target.value;
        const value = shape.type.value;
        shape.setType(type);
        shape.type.value = value;
        context.emit();
        setKind(type);
        setPrefix('example');
        collapsePrefix(e)
    }

    return (
        <div className={context.customClass+" box1 gridBox"}>
            <label className="customLabel">Type </label>
            <select className="customSelector" value={kind} onChange={handleKindChange}>
                <option value="iriRef">IriRef</option>
                <option value="prefixedIri">PrefixedIri</option>
                <option value="bnodeType">Bnode</option>
            </select>
        </div>
    );
                                   
    
}

export default ShapeKindConfig;

