import React,{useState,useContext} from 'react';
import {ShapesContext} from '../../../../App';

function TripleKindConfig (props) {

    const context = useContext(ShapesContext);
    const {triple,setPrefix,collapsePrefix} = props;
    const [kind,setKind] = useState(triple.type.getTypeName());
  
    const handleKindChange = function(e){
        const type  = e.target.value;
        const value = triple.type.value;
        triple.setType(type);
        triple.type.value = value;
        context.emit();
        setKind(type);
        setPrefix('example');
        collapsePrefix(e)
    }

    return (
        <div className="gridBox">
            <label className="customLabel">Kind</label>
            <select className="customSelector" 
                    value={kind}
                    onChange={handleKindChange}>
                <option value="iriRef">IriRef</option>
                <option value="prefixedIri">PrefixedIri</option>
            </select>
        </div>
    );
                                   
    
}

export default TripleKindConfig;

