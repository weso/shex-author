import React,{useState,useContext} from 'react';
import {AppContext} from '../../../../../../../App';
import Properties from '../../../../../../../conf/properties';

function TypeConfig (props) {

    const context = useContext(AppContext);
    const {entity,setPrefix,bnode,setPrefixOpen} = props;
    const shapeStyles = Properties.getInstance().getShapeStyle();
    const tripleStyles = Properties.getInstance().getTripleStyle();
    const styles = entity.triples ? shapeStyles : tripleStyles; //is a Shape or a Triple?
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

        if(type=='prefixedIri'){
            setPrefixOpen(true);
        }else{
           
            setPrefixOpen(false);
        }
    }

    

    return (
        <div className="xs-gridBox">
            <label className="customLabel" style={styles.label}>Type </label>
            <select className="customSelector" value={type} onChange={handleTypeChange}>
                <option value="iriRef">{iri}</option>
                <option value="prefixedIri">Prefixed</option>
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

