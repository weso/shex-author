import React,{useState,useContext} from 'react';
import {AppContext} from '../../../../App';
import { Collapse } from 'reactstrap';
import NumericInput from 'react-numeric-input';


function Cardinality (props) {
    
        const {triple} = props;
        const context = useContext(AppContext);
        const [cardinality,setCardinality] = useState(triple.cardinality);
        const [isExactly,setExactly] = useState(false);
        const [isMinLimit,setMinLimit] = useState(true);
        const [isRange,setRange] = useState(false);
        const [min,setMin] = useState(1);
        const [max,setMax] = useState(10);

        const handleCardinalityChange = function(e){
                let newCardinality = e.target.value;
                triple.setCardinality(newCardinality);
                context.emit();
                setCardinality(newCardinality)
        }

        const handleExactlyChange = function(valueAsNumber){
                triple.setCardinality('exactly',valueAsNumber,max);
                context.emit();
                setMin(valueAsNumber);
        }

        const handleMinLimitChange = function(valueAsNumber){
                triple.setCardinality('minLimit',valueAsNumber,max);
                context.emit();
                setMin(valueAsNumber);
        }
        const handleMinChange = function(valueAsNumber){
                triple.setCardinality('range',valueAsNumber,max);
                context.emit();
                setMin(valueAsNumber);
        }

        const handleMaxChange = function(valueAsNumber){
                triple.setCardinality('range',min,valueAsNumber);
                context.emit();
                setMax(valueAsNumber);
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
                                <NumericInput   className="form-control" 
                                                min={0} 
                                                value={min}
                                                onChange={handleExactlyChange}/>
                        </Collapse> 

                        <Collapse isOpen={isMinLimit} className="rangeCardinality">
                                <label className={context.tripleLabel}>Value</label>
                                <NumericInput   className="form-control" 
                                                min={0} 
                                                value={min}
                                                onChange={handleMinLimitChange}/>
                        </Collapse> 
                        
                        <Collapse isOpen={isRange} className="rangeCardinality">
                                <label className={context.tripleLabel}>Min</label>
                                <NumericInput   className="form-control" 
                                                min={0} 
                                                value={min}
                                                onChange={handleMinChange}/>

                                <label className={context.tripleLabel}>Max</label>
                                <NumericInput   className="form-control" 
                                                min={0} 
                                                value={max}
                                                onChange={handleMaxChange}/>

                        </Collapse> 

                </div>);                          
}



export default Cardinality;

