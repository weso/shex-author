import React,{useState} from 'react';
import { Collapse } from 'reactstrap';
import TripleHeader from './headers/TripleHeader';
import CustomComp from './customize/CustomComp';
import ConstraintComponent from './ConstraintComponent';
import InlineOrRef from './customize/InlineOrRef';
import Cardinality from './customize/Cardinality';


function TripleComponent (props) {
    
    const {shape,triple,deleteTriple} = props;
    const [isTripleCustomOpen,setTripleCustomOpen] = useState(true);
    const [isConstraintsOpen,setConstraintsOpen] = useState(true);
    const [isCardinalityOpen,setCardinalityOpen] = useState(true);
    const [isInlineOpen,setInlineOpen] = useState(true);
    const [rounded,setRounded] = useState('roundme');

    const customizeTriple = function(){
       // setConstraintsOpen(false);
       // setCardinalityOpen(false);
        setTripleCustomOpen(!isTripleCustomOpen);
    }

    const collapseConstraints = function(){
       // setTripleCustomOpen(false);
      //  setCardinalityOpen(false);
        setConstraintsOpen(!isConstraintsOpen);
    }

    const customizeInline = function(){
      //  setConstraintsOpen(false);
       // setTripleCustomOpen(false);
        setInlineOpen(!isInlineOpen);
        
    }

    const customizeCardinality = function(){
      //  setConstraintsOpen(false);
       // setTripleCustomOpen(false);
        setCardinalityOpen(!isCardinalityOpen);
        
    }

    const forceCollapse = function(collapse){
        setTripleCustomOpen(false);
        setCardinalityOpen(false);
        setConstraintsOpen(collapse);
    }

    const rounder =()=>{
         if(rounded=='roundme'){
            setRounded('un-roundme');
        }else{
            setRounded('roundme');
        }

    }

    return ( 
        <div>
            <TripleHeader triple={triple} 
                          deleteTriple={deleteTriple} 
                          customizeTriple={customizeTriple}
                          collapseConstraints={collapseConstraints}
                          customizeInline={customizeInline}
                          customizeCardinality={customizeCardinality}
                          forceCollapse={forceCollapse}
                          rounded={rounded}/>

            <CustomComp   entity={triple} 
                          isCustomOpen={isTripleCustomOpen}
                          rounder={rounder}
                          qualifier={false}
                          bnode={false}
                          customClass="customTriple"/>

            <Collapse   isOpen={isConstraintsOpen}
                        onExited={rounder}
                        onEntering={rounder} >

                <ConstraintComponent triple={triple}/>
                            
            </Collapse> 

             <Collapse  isOpen={isInlineOpen}
                        onExited={rounder}
                        onEntering={rounder} >

                <InlineOrRef triple={triple}/>
                            
            </Collapse> 

            <Collapse   isOpen={isCardinalityOpen}
                        onExited={rounder}
                        onEntering={rounder} >

                <Cardinality triple={triple}/>
                            
            </Collapse> 

           
           
        </div>);                          
}

/*
<Collapse isOpen={isConstraintsOpen} >
                <div className="constraints">
                    <ConstraintComponent triple={triple}/>
                    <button className="addTripleButton">+ Constraint</button>        
                </div>                    
            </Collapse> 
*/

export default TripleComponent;

