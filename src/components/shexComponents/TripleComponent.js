
import React,{useContext} from 'react';
import SlideToggle from "react-slide-toggle";

import TripleTypeComp from './types/TripleTypeComp';

import ValueComponent from './ValueComponent';



function TripleComponent (props) {

    const {shape,triple,deleteTriple} = props;


    return ( <SlideToggle duration={180}
                          collapsed='true'
                          render={({ toggle, setCollapsibleElement, progress }) => (
                <div className="row tripleRow">

                    <TripleTypeComp 
                        shape={shape} 
                        triple={triple} 
                        deleteTriple={deleteTriple}
                        colapse={toggle}/>
               
                <ValueComponent  
                        shape={shape} 
                        triple={triple} 
                        colapse={setCollapsibleElement}/>
                       
                </div>
            )}/>);
                                   
}

export default TripleComponent;

