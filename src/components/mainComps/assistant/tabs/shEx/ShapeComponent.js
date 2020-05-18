import React,{useContext,useState} from 'react';
import {AppContext} from '../../../../../App';
import { Collapse } from 'reactstrap';
import ShapeHeader from  './headers/ShapeHeader';
import CustomComp from './customize/CustomComp';
import TripleComponent from './TripleComponent';
import Triple from '../../../../../entities/shexEntities/triple';
import Properties from '../../../../../conf/properties';

import CustomZone from './CustomZone';

export const ShapeContext = React.createContext();

function ShapeComponent (props) {

    const context = useContext(AppContext);
    const {shape} = props;
    const styles = Properties.getInstance().getShapeStyle();
    const tripleStyles = Properties.getInstance().getTripleStyle();
    
    const [triples,setTriples] = useState(shape.triples);
    const [isCustomOpen,setCustomOpen] = useState(false);
    const [isTriplesOpen,setTriplesOpen] = useState(true);
    const [colapseBtn,setColapseBtn] = useState('menu_open');

    let initialDisabled = false;
    if(shape.type.value == '')initialDisabled = true;
    const [disabled,setDisabled] = useState(initialDisabled);


    const addTriple = function(){
        const id = shape.triplesCount;
        const triple = new Triple(id);

        setTriples([...triples,triple]);
        
        shape.addTriple(triple);
        //A ShapeRef cannot coexist with a inlineShape
        shape.shapeRef.shape = null;
        context.emit();       
    }

    const deleteTriple = function(tripleId){
        const newTriples = shape.triples.filter( triple => triple.id != tripleId);
        setTriples(newTriples)
        shape.triples = newTriples;
        context.emit();
        
    }


    const customizeShape = function(){
        //Completly collapsed shape open just customShape
        if(!isCustomOpen && !isTriplesOpen ){
            setCustomOpen(true);
            setTriplesOpen(false);
        }else{
            //CustomShape opened  opens triples on collapse
            setCustomOpen(!isCustomOpen);
            setTriplesOpen(!isTriplesOpen);
        }

        setColapseBtn('menu');
    }

    const collapseTriples = function(){
        setCustomOpen(false);
        setTriplesOpen(!isTriplesOpen);
        
        if(colapseBtn=='menu'){
            setColapseBtn('menu_open');
        }else{
            setColapseBtn('menu');
        }
    }

    return (

        <ShapeContext.Provider value={{disabled:disabled,setDisabled:setDisabled}}>
            <div className="shape" style={styles.header}>
                <ShapeHeader shape={shape} 
                            customizeShape={customizeShape} 
                            collapseTriples={collapseTriples} 
                            colapseBtn={colapseBtn}/>


                <CustomZone entity={shape} 
                            isCustomOpen={isCustomOpen} 
                            customClass={'customShape'}/> 

                <Collapse  isOpen={isTriplesOpen}>
                     <div className="triples" style={styles.body}>
                        {triples.map(triple =>
                            <TripleComponent key={triple.id}
                                            triple={triple}
                                            deleteTriple={deleteTriple}
                                            styles={tripleStyles}/> 
                        )}
                    
                        <button className="xs-addTripleButton"
                                style={styles.addTriple} 
                                onClick={addTriple} 
                                disabled={disabled}
                                title="Add Triple">
                                + Triple Constraint
                        </button>        
                    
                        </div>
                </Collapse> 


            </div>
        </ShapeContext.Provider>
    );
                                   
    
}


export default ShapeComponent;
