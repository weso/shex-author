import React,{useState,useContext} from 'react';
import {ShapesContext} from '../../../../App';

function KindConfig (props) {

    const context = useContext(ShapesContext);
    const {entity,setPrefix,collapsePrefix,bnode} = props;
    const [kind,setKind] = useState(entity.type.getTypeName());
  
    const handleKindChange = function(e){
        const type  = e.target.value;
        const value = entity.type.value;
        entity.setType(type);
        entity.type.value = value;
        context.emit();
        setKind(type);
        setPrefix('example');
        collapsePrefix(e)
    }

    return (
        <div className="gridBox">
            <label className="customLabel">Kind </label>
            <select className="customSelector" value={kind} onChange={handleKindChange}>
                <option value="iriRef">IriRef</option>
                <option value="prefixedIri">PrefixedIri</option>

                { ()=>{if(bnode){
                        return(<option value="bnodeType">Bnode</option>);
                     }
                }}
                
            </select>
        </div>
    );
                                   
    
}

export default KindConfig;

