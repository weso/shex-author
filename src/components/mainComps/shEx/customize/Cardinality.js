import React,{useState,useContext} from 'react';
import {AppContext} from '../../../../App';
import { Collapse } from 'reactstrap';
import NumericInput from 'react-numeric-input';


function Cardinality (props) {
    
        const {triple} = props;
        const context = useContext(AppContext);
        const [cardinality,setCardinality] = useState(triple.cardinality);
        const [isRange,setRange] = useState(false);
        const [isExactly,setExactly] = useState(true);

        const handleCardinalityChange = function(e){
                let newCardinality = e.target.value;
                triple.setCardinality(newCardinality);
                context.emit();
                setCardinality(newCardinality)
        }

        return ( 
                <div className="cardinality">
                        <label className={context.tripleLabel}>Cardinality</label>
                        <select className="customSelector" 
                                value={cardinality} 
                                onChange={handleCardinalityChange} 
                                title="Cardinality">
                                <option value="">Exactly one</option>
                                <option value="*">Zero or more</option>
                                <option value="+">One at least</option>
                                <option value="?">One or none</option>
                                <option value="exactly">Exactly value</option>
                                <option value="range">Range</option>
                        </select> 

                        <Collapse isOpen={isExactly} className="rangeCardinality">
                                <label className={context.tripleLabel}>Value</label>
                                <NumericInput className="form-control" min={0} value={1}/>
                        </Collapse> 
                        
                        <Collapse isOpen={isRange} className="rangeCardinality">
                                <label className={context.tripleLabel}>Min</label>
                                <NumericInput className="form-control" min={0} value={1}/>
                                <label className={context.tripleLabel}>Max</label>
                                <NumericInput className="form-control" min={0} value={10}/>

                          
                        </Collapse> 

                </div>);                          
}



export default Cardinality;

