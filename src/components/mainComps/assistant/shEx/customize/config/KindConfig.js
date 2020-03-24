import React,{useState,useContext} from 'react';
import {AppContext} from '../../../../../../App';

function KindConfig (props) {

    const context = useContext(AppContext);
    const {entity,setPrefix,collapsePrefix,bnode} = props;
    const [kind,setKind] = useState(entity.type.getTypeName());
    const iri ='<...>';

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
        <div className={context.gridClass + " gridBox"}>
            <label className="customLabel">Kind </label>
            <select className="customSelector" value={kind} onChange={handleKindChange}>
                <option value="iriRef">{iri}</option>
                <option value="prefixedIri">QName</option>
                <Bnode isBnode={bnode}/>
            </select>
        </div>
    );
                                   
    
}


function Bnode(props) {
  const isBnode = props.isBnode;
  if (isBnode) {
    return <option value="bnodeType">Bnode</option>;
  }
  return null;
}


export default KindConfig;

