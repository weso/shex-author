import React,{useContext,useState} from 'react';
import { Collapse } from 'reactstrap';
import {ShapesContext} from '../../App';

import TripleHeader from './headers/TripleHeader';
import CustomTriple from './customize/CustomTriple';

function TripleComponent (props) {
    
    const {shape,triple,deleteTriple} = props;
    const [isTripleCustomOpen,setTripleCustomOpen] = useState(false);
    
    const customizeTriple = function(){
        setTripleCustomOpen(!isTripleCustomOpen);
    }

    return ( 
        <div>
            <TripleHeader triple={triple} 
                          deleteTriple={deleteTriple} 
                          customizeTriple={customizeTriple}/>

            <CustomTriple triple={triple} isTripleCustomOpen={isTripleCustomOpen}/>
            
        </div>);                          
}

export default TripleComponent;

