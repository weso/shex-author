import React,{useContext,useState} from 'react';
import { Collapse } from 'reactstrap';
import {AppContext} from '../../../../../App';
import {AssistContext} from '../../../Assistant';
import ShapeHeader from  './headers/ShapeHeader';
import CustomComp from './customize/CustomComp';
import TripleComponent from './TripleComponent';
import Triple from '../../../../../entities/shexEntities/triple';

export const ShapeContext = React.createContext();

function ShapeComponent (props) {

    const context = useContext(AppContext);
    const asssistContext = useContext(AssistContext);
    const {shape} = props;

    const [triples,setTriples] = useState(shape.triples);
    const [isCustomOpen,setCustomOpen] = useState(false);
    const [isTriplesOpen,setTriplesOpen] = useState(true);
    const [colapseBtn,setColapseBtn] = useState('menu_open');

    let initialDisabled = false;
    if(shape.type.value == '')initialDisabled = true;
    const [disabled,setDisabled] = useState(initialDisabled);


    const addTriple = function(){
        const id = shape.getTriplesCount();
        const triple = new Triple(id);

        setTriples([...triples,triple]);
        
        shape.addTriple(triple);
        context.emit();       
    }

    const deleteTriple = function(tripleId){
        const newTriples = shape.triples.filter( triple => triple.id != tripleId);
        setTriples(newTriples)
        shape.setTriples(newTriples);
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

    const styles ={
        body:asssistContext.styles.body,
    }


    return (

        <ShapeContext.Provider value={{disabled:disabled,setDisabled:setDisabled}}>
            <div className="shape">
                <ShapeHeader shape={shape} 
                            customizeShape={customizeShape} 
                            collapseTriples={collapseTriples} 
                            colapseBtn={colapseBtn}/>

                <CustomComp  entity={shape}
                            isCustomOpen={isCustomOpen}
                            qualifier={true}
                            bnode={true}
                            customClass="customShape"/>

                    
                <Collapse  isOpen={isTriplesOpen}>
                     <div className="triples" style={styles.body}>
                        {triples.map(triple =>
                            <TripleComponent key={triple.id}
                                            shape={shape} 
                                            triple={triple}
                                            deleteTriple={deleteTriple}/> 
                        )}
                    
                        <button className="addTripleButton" 
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

/*


                     <div className="triples">
                        <div className="tripleSlot">
                        <label>TripleSlot</label>
                        {triples.map(triple =>
                            <TripleComponent key={triple.id}
                                            shape={shape} 
                                            triple={triple}
                                            deleteTriple={deleteTriple}/> 
                        )}
                    
                        <button className="addTripleButton" 
                                onClick={addTriple} 
                                disabled={disabled}
                                title="Add Triple">
                                + Triple Constraint
                        </button>        
                    
                        </div>
                    </div> <div className="triples">
                        <div className="tripleSlot">
                        <label>TripleSlot</label>
                        {triples.map(triple =>
                            <TripleComponent key={triple.id}
                                            shape={shape} 
                                            triple={triple}
                                            deleteTriple={deleteTriple}/> 
                        )}
                    
                        <button className="addTripleButton" 
                                onClick={addTriple} 
                                disabled={disabled}
                                title="Add Triple">
                                + Triple Constraint
                        </button>        
                    
                        </div>
                    </div>

                    */