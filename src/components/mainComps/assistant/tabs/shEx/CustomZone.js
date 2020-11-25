import React,{useState} from 'react';
import { Collapse } from 'reactstrap';
import TripleHeader from './headers/TripleHeader';
import CustomComp from './customize/CustomComp';
import ConstraintComp from './customize/ConstraintComp';
import ShapeRefComp from './customize/ShapeRefComp';
import FacetContainer from './customize/FacetContainer';
import CardinalityComp from './customize/CardinalityComp';
import OtherContainer from './customize/OtherContainer';
import Triples from './Triples';

import Properties from '../../../../../conf/properties';

function CustomZone (props) {
    
    const {entity,isFirst,isCustomOpen,customClass} = props;
    const [isTriplesOpen,setTriplesOpen] = useState(true);
    const [isTripleCustomOpen,setTripleCustomOpen] = useState(false);
    const [isConstraintsOpen,setConstraintsOpen] = useState(false);
    const [isRefOpen,setRefOpen] = useState(false);
    const [isFacetOpen,setFacetOpen] = useState(false);
    const [isCardinalityOpen,setCardinalityOpen] = useState(false);
    const [isOtherOpen,setrOtherOpen] = useState(false);
    const [allCollased,setAllCollapsed] = useState(false);
    const [colapseBtn,setColapseBtn] = useState('menu');
    const [extras,setExtras] = useState(entity.extraProperties.values);

    const shapeStyles = Properties.getInstance().getShapeStyle();
    const tripleStyles = Properties.getInstance().getTripleStyle();
    const constStyles = Properties.getInstance().getConstraintStyle();
    const facetStyles = Properties.getInstance().getFacetStyle();
    const refStyles = Properties.getInstance().getShapeRefStyle();
    const cardStyles = Properties.getInstance().getCardinalityStyle();
    const otherStyles = Properties.getInstance().getOtherStyle();

    const customizeTriple = function(){
        collapseAll(false);
        setTripleCustomOpen(!isTripleCustomOpen);
        setAllCollapsed(false);

        if(allCollased){
            setTripleCustomOpen(true);
            changeCollapseBtn();
        }

    }

    const customizeTriples = function(){
        collapseAll(false);
        setTriplesOpen(!isTriplesOpen);
        setAllCollapsed(false);

        if(allCollased){
            setTriplesOpen(true);
            changeCollapseBtn();
        }

    }

    const customizeContraints = function(){
        collapseAll(false);
        setConstraintsOpen(!isConstraintsOpen);
        setFacetOpen(!isFacetOpen);
        setAllCollapsed(false);

        if(allCollased){
            setConstraintsOpen(true);
            setFacetOpen(true);
            changeCollapseBtn();
        }
    }

    const customizeRef = function(){
        collapseAll(false);
        setRefOpen(!isRefOpen);
        setAllCollapsed(false);

        if(allCollased){
            setRefOpen(true);
            changeCollapseBtn();
        }  
    }

      const customizeFacet = function(){
        collapseAll(false);
        setFacetOpen(!isFacetOpen);
        setAllCollapsed(false);

        if(allCollased){
            setFacetOpen(true);
            changeCollapseBtn();
        }  
    }

    const customizeCardinality = function(){
        collapseAll(false);
        setCardinalityOpen(!isCardinalityOpen);
        setAllCollapsed(false);

        if(allCollased){
            setCardinalityOpen(true);
            changeCollapseBtn();
        } 
        
    }

  const customizeOther = function(){
        collapseAll(false);
        setrOtherOpen(!isOtherOpen);
        setAllCollapsed(false);

        if(allCollased){
            setrOtherOpen(true);
            changeCollapseBtn();
        } 
        
    }




    const collapseAll = function(collapse){
        setTriplesOpen(collapse);
        setTripleCustomOpen(collapse);
        setConstraintsOpen(collapse);
        setRefOpen(collapse);
        setFacetOpen(collapse);
        setCardinalityOpen(collapse);
        setrOtherOpen(collapse);
    }

    const collapseToggle = function(){
        collapseAll(!allCollased);
        

        setAllCollapsed(!allCollased);
        changeCollapseBtn();
    }

    const changeCollapseBtn = function(){
        if(colapseBtn=='menu'){
            setColapseBtn('menu_open');
        }else{
            setColapseBtn('menu');
        }
    }

    const getCardinalityStyleIfNeeded = function(){
        if(entity.cardinality)return 'zone-card';
        return 'zone';
    }

    const getCardinalityIfNeeded = function(){
        if(entity.cardinality){
            return(
                <button className='btnZone'style={cardStyles.body}
                onClick={customizeCardinality}>Cardinality</button>
            )
        }
    }

    const getCardinalityCompIfNeeded = function(){
        if(entity.cardinality){
            return(
                <Collapse  isOpen={isCardinalityOpen}>
                    <CardinalityComp triple={entity}/>      
                </Collapse> 
            )
        }
    }
    

    const getEntityStyle = function(){
        if(entity.cardinality){//Is a triple? (Not really elegant I know...)
            return tripleStyles;
        }
        return shapeStyles;
    }

    const getBtn = function(){
        if(!isFirst)return 'delete';
        return 'add';
    }

    const getRef = function(){
        if(customClass=='customTriple')return "tRef";
        return 'sRef';
    }


    const getLastStyle = function(){
        if(customClass=='customTriple')return "last";
    }

     const getBody = function(){
        if(customClass=='customTriple')return "subTripleSlot";
        return "tripleSlot";
    }
    

    return ( 
            <Collapse  isOpen={isCustomOpen} className="customCont"> 

                <div className={getCardinalityStyleIfNeeded()} style={getEntityStyle().body}>
                    <button className={'btnZone '+getRef()} 
                    onClick={customizeTriples}>Triples</button>
                    <button className='btnZone'style={constStyles.body}
                    onClick={customizeContraints}>Constraint</button>
                    <button className='btnZone'style={refStyles.body}
                    onClick={customizeRef}>ShapeRef</button>
                   

                    {getCardinalityIfNeeded()}

                    <button className='btnZone'style={otherStyles.body}
                    onClick={customizeOther}>Other</button>
                    

                   
                    <button className={getLastStyle()+" btnZone  mdc-icon-button material-icons"}>
                            {getBtn()}
                    </button>
                        
                </div> 


                 <Collapse   isOpen={isTriplesOpen}>
                    <Triples
                                    is={true}
                                    entity={entity} 
                                    isSlotOpen={true}
                                    styles={tripleStyles}
                                    container="triples"
                                    header="slotHeader"
                                    body={getBody()}
                                    addClass="xs-addTripleButton"></Triples>
                </Collapse> 
                <Collapse   isOpen={isConstraintsOpen}>
                    <ConstraintComp  entity={entity} />           
                </Collapse> 

                <Collapse   isOpen={isFacetOpen}>
                    <FacetContainer entity={entity}/> 
                </Collapse> 

                <Collapse  isOpen={isRefOpen}>
                    <ShapeRefComp entity={entity} customClass={customClass}/>      
                </Collapse> 

                <Collapse  isOpen={isOtherOpen}>
                    <OtherContainer  entity={entity} extras={extras} setExtras={setExtras} />           
                </Collapse> 
                
                {getCardinalityCompIfNeeded()}

            </Collapse>  );                          
}


export default CustomZone;
