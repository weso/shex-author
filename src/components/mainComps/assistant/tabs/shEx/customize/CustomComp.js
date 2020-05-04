import React,{useState,useContext} from 'react';
import { Collapse } from 'reactstrap';
import {AppContext} from '../../../../../../App';
import TypeConfig from './config/TypeConfig';
import PrefixConfig from './config/PrefixConfig';
import Properties from '../../../../../../conf/properties';
import '../../../../../../css/shexComponents/customize/Custom.css'

function CustomComp (props) {

    const context = useContext(AppContext);
    const {entity,isCustomOpen,bnode,customClass} = props;
    const shapeStyles = Properties.getInstance().getShapeStyle();
    const tripleStyles = Properties.getInstance().getTripleStyle();
    const styles = customClass == 'customShape' ? shapeStyles:tripleStyles;

    let initialPrefix = 'example';
    let initialOpenPrefix = false;
    if(entity.type.prefix!=undefined){
        initialPrefix = entity.type.prefix.prefixValue;
        initialOpenPrefix = true;
    }

    const [prefix,setPrefix] = useState(initialPrefix);
    const [isPrefixOpen,setPrefixOpen] = useState(initialOpenPrefix);
 

    return (
        <Collapse isOpen={isCustomOpen}
                  className='customColapse'>

            <div className={customClass} style={styles.body}>
                <TypeConfig 
                    entity={entity}
                    setPrefix={setPrefix}
                    setPrefixOpen={setPrefixOpen}
                    bnode={bnode}/>
            
            <Collapse isOpen={isPrefixOpen}>
                <PrefixConfig 
                    entity={entity}
                    isPrefixOpen={isPrefixOpen}
                    prefix={prefix}
                    setPrefix={setPrefix}/> 
            </Collapse> 
     
            </div>
        </Collapse>                 
    );
                                   
    
}




export default CustomComp;

