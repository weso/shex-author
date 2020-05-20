import React,{useContext,useState} from 'react';
import {AppContext} from '../../../../../App';
import { Collapse } from 'reactstrap';
import ShapeHeader from  './headers/ShapeHeader';
import CustomComp from './customize/CustomComp';
import TripleComponent from './TripleComponent';
import Triple from '../../../../../entities/shexEntities/triple';
import Properties from '../../../../../conf/properties';


import OtherContainer from './customize/OtherContainer';

export const ShapeContext = React.createContext();

function Triples (props) {

    const context = useContext(AppContext);
    const {entity,isTriplesOpen,disabled,body,addClass,header,container,styles} = props;
    const otherStyles = Properties.getInstance().getOtherStyle();

    const [triples,setTriples] = useState(entity.triples);

    const [isSlotOpen,setSlotOpen] = useState(true);
    const [isOtherOpen,setOtherOpen] = useState(false);
    const [extras,setExtras] = useState(entity.extraProperties?.values);
    

    const addTriple = function(){
        const id = entity.triplesCount;
        const triple = new Triple(id);

        setTriples([...triples,triple]);
        
        entity.addTriple(triple);
        //A ShapeRef cannot coexist with a inlineShape
        //entity.shapeRef.entity = null;
        context.emit();       
    }

    const deleteTriple = function(tripleId){
        const newTriples = entity.triples.filter( triple => triple.id != tripleId);
        setTriples(newTriples)
        entity.triples = newTriples;
        context.emit();
        
    }

    const customize = function(){
        setSlotOpen(!isSlotOpen);
        setOtherOpen(!isOtherOpen);

    }



    return (<Collapse  isOpen={isTriplesOpen}>
                <div className={container} style={styles.body}>
                    <div className={header}>
                        <label>ShapeOrRef</label>
                        <button className="slotBtn tripleBtns buildTriple buildBtn buildTripleBtn mdc-icon-button material-icons"
                                onClick={customize}
                                style={styles.custom}
                                title="Customize Triple Constraint">
                                settings
                        </button>

                    </div>

                   

                    <Collapse  isOpen={isSlotOpen}>
                        <div className={body}>
                            {triples[0]?.triples.map(triple =>
                            
                                <TripleComponent key={triple.id}
                                                triple={triple}
                                                deleteTriple={deleteTriple}
                                                styles={styles}/> 
                            )}
                        
                            <button className={addClass}
                                    style={styles.addTriple} 
                                    onClick={addTriple} 
                                    disabled={disabled}
                                    title="Add Triple">
                                    + Triple Constraint
                            </button>        
                        </div>
                    </Collapse> 
                </div>
                        
        </Collapse> 
    );
                                   
    
}


export default Triples;
