import React,{useState,useContext} from 'react';
import { Collapse } from 'reactstrap';
import {ShapesContext} from '../../../App';
import KindConfig from './config/KindConfig';
import PrefixConfig from './config/PrefixConfig';
import QualifierConfig from './config/QualifierConfig';

import '../../../css/shexComponents/customize/CustomShape.css'

function CustomShape (props) {

    const context = useContext(ShapesContext);
    const {shape,isCustomOpen,rounder} = props;

    let initialPrefix = 'example';
    let initialOpenPrefix = false;
    if(shape.type.prefix!=undefined){
        initialPrefix = shape.type.prefix.prefixValue;
        initialOpenPrefix = true;
    }

    const [prefix,setPrefix] = useState(initialPrefix);
    const [isPrefixOpen,setPrefixOpen] = useState(initialOpenPrefix);
 
    const collapsePrefix = function(e){
        if(e.target.value=='prefixedIri'){
            setPrefixOpen(true);
        }else{
            setPrefixOpen(false);
        }    
    }
    

    return (
        <Collapse isOpen={isCustomOpen} 
                  onExited={rounder}
                  onEntering={rounder}>

            <div className="custom">
                <KindConfig 
                    entity={shape}
                    setPrefix={setPrefix}
                    collapsePrefix={collapsePrefix}
                    bnode="false"/>
               
                <PrefixConfig 
                    entity={shape}
                    isPrefixOpen={isPrefixOpen}
                    prefix={prefix}
                    setPrefix={setPrefix}/>
               
               <QualifierConfig 
                    shape={shape}/>
                
            </div>
        </Collapse>                 
    );
                                   
    
}


export default CustomShape;

