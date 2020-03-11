import React,{useState,useContext} from 'react';
import {AppContext} from '../../../../App';
import { Collapse } from 'reactstrap';
import NumericInput from 'react-numeric-input';


function Cardinality (props) {
    
        const {triple} = props;
        const context = useContext(AppContext);
        const [cardinality,setCardinality] = useState(triple.cardinality);
        const [isExactly,setExactly] = useState(false);
        const [isRange,setRange] = useState(false);
        const [min,setMin] = useState(1);
        const [max,setMax] = useState(10);

        const handleCardinalityChange = function(e){
                let newCardinality = e.target.value;
                triple.setCardinality(newCardinality);
                context.emit();
                setCardinality(newCardinality)


                setExactly(false);
                setRange(false);

                if(newCardinality == 'exactly' || newCardinality == 'minLimit' ){
                        setMin(1);
                        setExactly(true);
                }

                if(newCardinality == 'range'){
                        setMin(1);
                        setMax(10);
                        setRange(true);
                }


        }

        const handleMinChange = function(valueAsNumber,kind){
                triple.setCardinality(kind,valueAsNumber,max);
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
                        <label className='cardiLabel'>Cardinality</label>
                        <select className="customSelector" 
                                value={cardinality} 
                                onChange={handleCardinalityChange} 
                                title="Cardinality">
                                <option value="">Exactly one</option>
                                <option value="*">Zero or more</option>
                                <option value="+">One at least</option>
                                <option value="?">One or none</option>
                                <option value="exactly">Exactly value</option>
                                <option value="minLimit">Inferior Limit</option>
                                <option value="range">Range</option>
                        </select> 

                    
                        <Collapse isOpen={isExactly} className="rangeCardinality">
                                <label className={context.tripleLabel}>Value</label>
                                <NumericInput   className="form-control" 
                                                min={0} 
                                                value={min}
                                                onChange={(value)=>{handleMinChange(value,cardinality)}}/>
                        </Collapse> 

                        
                        <Collapse isOpen={isRange} className="rangeCardinality">
                                <label className={context.tripleLabel}>Min</label>
                                <NumericInput   className="form-control" 
                                                min={0} 
                                                value={min}
                                                onChange={(value)=>{handleMinChange(value,'range')}}/>

                                <label className={context.tripleLabel}>Max</label>
                                <NumericInput   className="form-control" 
                                                min={0} 
                                                value={max}
                                                onChange={handleMaxChange}/>

                        </Collapse> 

                </div>);                          
}



export default Cardinality;

