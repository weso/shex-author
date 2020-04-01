import React,{useState,useContext} from 'react';
import {AppContext} from '../../../../../../../App';
import {AssistContext} from '../../../../../Assistant';

function QualifierConfig (props) {

    const context = useContext(AppContext);
    const assistContext = useContext(AssistContext);
    const {shape} = props;
    const [qualifier,setQualifier] = useState(shape.qualifier.getTypeName())

    const handleQualifierChange = function(e){
        let newType = e.target.value;
        shape.setQualifier(newType);
        context.emit();
        setQualifier(newType);
    }


    return (
         <div className="gridBox">
            <label className="customLabel" style={assistContext.shapeStyles.label}>Qualifier </label>
            <select className="customSelector" value={qualifier} onChange={handleQualifierChange}>
                <option value="">None</option>
                <option value="iri">Iri</option>
                <option value="literal">Literal</option>
                <option value="nonliteral">NonLiteral</option>
                <option value="bnode">Bnode</option>
            </select>
        </div>
    );
                                   
    
}

export default QualifierConfig;

