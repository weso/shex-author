
import React,{useState,useContext} from 'react';
import {ShapesContext} from '../../../../App';


function ShapeRefComp (props) {

    const context = useContext(ShapesContext);
    const {shape,triple} = props;

    const [value,setValue] = useState(triple.value);


    let inlineValue = '';
    if(triple.inlineShape.shape != null){
        inlineValue = triple.inlineShape.shape.id;
    }
    const [inlineShape,setInlineShape] = useState(inlineValue);


    const handleChange = (e) =>{
          const value = e.target.value;
          triple.setValue(value);
          context.emit();
          setValue(value);
    }


    return (<div className='row col'>
                <select className="col form-control valueInlineShape"
                        value={inlineShape}
                        >
                    <option value=''></option>
                    { 
                    context.shapes.map(shape =>{
                      return <option key={shape.id} value={shape.id}>{'@'+shape.type}</option>
                    })
                  }
                </select>

                <select className="col form-control valueInlineShape">
                    <option></option>
                    <option>Iri</option>
                    <option>Literal</option>
                    <option>NonLiteral</option>
                    <option>BNode</option>
                </select>
            </div>

    
    
    
    );
    
}

export default ShapeRefComp;

