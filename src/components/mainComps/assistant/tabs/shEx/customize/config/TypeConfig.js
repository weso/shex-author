import React,{useState,useContext} from 'react';
import {AppContext} from '../../../../../../../App';
import Styles from '../../../../../../../conf/styles';

function TypeConfig (props) {

    const context = useContext(AppContext);
    const styles = Styles.getInstance().getShapesStyle();
    const {entity,setPrefix,collapsePrefix,bnode} = props;
    const [type,setType] = useState(entity.type.getTypeName());
    const iri ='<...>';

    const handleTypeChange = function(e){
        const type  = e.target.value;
        const value = entity.type.value;
        entity.setType(type);
        entity.type.value = value;
        context.emit();
        setType(type);
        setPrefix('example');
        collapsePrefix(e)
    }

    

    return (
        <div className="gridBox">
            <label className="customLabel" style={styles.label}>Type </label>
            <select className="customSelector" value={type} onChange={handleTypeChange}>
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


export default TypeConfig;

