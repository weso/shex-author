import React,{useState} from 'react';
import { Collapse } from 'reactstrap';
import TripleHeader from './headers/TripleHeader';
import CustomComp from './customize/CustomComp';
import ConstraintComp from './customize/ConstraintComp';
import ShapeRefComp from './customize/ShapeRefComp';
import FacetContainer from './customize/FacetContainer';
import CardinalityComp from './customize/CardinalityComp';
import Properties from '../../../../../conf/properties';
import NodeComponent from './NodeComponent';

function TripleComponent (props) {
    
    const {shape,triple,deleteTriple} = props;
    const [isCustomOpen,setCustomeOpen] = useState(false);

    const customize  = function(){
        setCustomeOpen(!isCustomOpen);
    }

    return ( 
        <div>
            <TripleHeader triple={triple} 
                          deleteTriple={deleteTriple}
                          customize={customize}/>

            <NodeComponent entity={triple} isCustomOpen={isCustomOpen} /> 
           
        </div>);                          
}


export default TripleComponent;
