import React,{useState} from 'react';
import { Collapse } from 'reactstrap';
import TripleHeader from './headers/TripleHeader';
import CustomComp from './customize/CustomComp';
import ConstraintComp from './customize/ConstraintComp';
import ShapeRefComp from './customize/ShapeRefComp';
import FacetContainer from './customize/FacetContainer';
import CardinalityComp from './customize/CardinalityComp';

import Properties from '../../../../../conf/properties';

function CustomZone (props) {
    
    const {entity,isFirst,isCustomOpen,customClass} = props;
    const [isTripleCustomOpen,setTripleCustomOpen] = useState(false);
    const [isConstraintsOpen,setConstraintsOpen] = useState(false);
    const [isRefOpen,setRefOpen] = useState(true);
    const [isFacetOpen,setFacetOpen] = useState(false);
    const [isCardinalityOpen,setCardinalityOpen] = useState(false);
    const [allCollased,setAllCollapsed] = useState(false);
    const [colapseBtn,setColapseBtn] = useState('menu');


    const shapeStyles = Properties.getInstance().getShapeStyle();
    const tripleStyles = Properties.getInstance().getTripleStyle();
    const constStyles = Properties.getInstance().getConstraintStyle();
    const facetStyles = Properties.getInstance().getFacetStyle();
    const refStyles = Properties.getInstance().getShapeRefStyle();
    const cardStyles = Properties.getInstance().getCardinalityStyle();

    const customizeTriple = function(){
        collapseAll(false);
        setTripleCustomOpen(!isTripleCustomOpen);
        setAllCollapsed(false);

        if(allCollased){
            setTripleCustomOpen(true);
            changeCollapseBtn();
        }

    }

    const customizeContraints = function(){
        collapseAll(false);
        setConstraintsOpen(!isConstraintsOpen);
        setAllCollapsed(false);

        if(allCollased){
            setConstraintsOpen(true);
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




    const collapseAll = function(collapse){
        setTripleCustomOpen(collapse);
        setConstraintsOpen(collapse);
        setRefOpen(collapse);
        setFacetOpen(collapse);
        setCardinalityOpen(collapse);
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
    

    return ( 
            <Collapse  isOpen={isCustomOpen}> 

                <div className={getCardinalityStyleIfNeeded()} style={getEntityStyle().body}>
                    <button className='btnZone'style={refStyles.body}
                    onClick={customizeRef}>ShapeOrRef</button><button className='btnZone'style={constStyles.body}
                    onClick={customizeContraints}>Constraint</button>
                    <button className='btnZone'style={facetStyles.body}
                    onClick={customizeFacet}>Facet</button>
                   
                    {getCardinalityIfNeeded()}

                   
              <button className="btnZone  mdc-icon-button material-icons">
                     {getBtn()}
            </button>
                 
                </div> 

                <Collapse   isOpen={isConstraintsOpen}>
                    <ConstraintComp  entity={entity} />           
                </Collapse> 

                <Collapse   isOpen={isFacetOpen}>
                    <FacetContainer entity={entity}/> 
                </Collapse> 

                <Collapse  isOpen={isRefOpen}>
                    <ShapeRefComp entity={entity}/>      
                </Collapse> 
                
                {getCardinalityCompIfNeeded()}

            </Collapse>  );                          
}


export default CustomZone;
