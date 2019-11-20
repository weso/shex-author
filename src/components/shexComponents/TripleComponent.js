import React,{useContext,useState} from 'react';
import { Collapse } from 'reactstrap';
import {ShapesContext} from '../../App';

import TripleTypeComp from './types/TripleTypeComp';

import ValueComponent from './ValueComponent';

function TripleComponent (props) {
    
    const {shape,triple,deleteTriple} = props;
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return ( <div >

                <TripleTypeComp 
                    shape={shape} 
                    triple={triple} 
                    deleteTriple={deleteTriple}
                    handeCollapse={toggle}/>

                <Collapse isOpen={isOpen}>
                    <ValueComponent  
                        shape={shape} 
                        triple={triple}/>
                </Collapse>
                
            </div>
        );                          
}

export default TripleComponent;

