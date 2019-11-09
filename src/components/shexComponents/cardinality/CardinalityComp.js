import React,{useState,useContext} from 'react';
import {ShapesContext} from '../../../App';

function CardinalityComp (props) {

    const {shape,triple} = props;
    
    const context = useContext(ShapesContext);
    const [cardinality,setCardinality] = useState(triple.cardinality.toString());
    

    const handleChange = (event) => {
   
        let cardinality = event.target.value;
        triple.setCardinality(cardinality);
        context.emit();
        setCardinality(cardinality)
       
    }


    return(<div className='row col-4'>    
                <select className="col  form-control tripleCardinality"
                    value={cardinality}
                    onChange={handleChange}>

                            <option value="">Exactly one</option>
                            <option value="*">Zero or more</option>
                            <option value="+">One at least</option>
                            <option value="?">One or none</option>
                </select>
                
            </div>);

  

}

export default CardinalityComp;

