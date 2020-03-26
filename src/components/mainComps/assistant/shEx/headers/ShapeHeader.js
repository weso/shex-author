import React,{useState,useContext} from 'react';
import { Textbox } from 'react-inputs-validation';
import {AppContext} from '../../../../../App';
import {ShapeContext} from '../ShapeComponent';
import '../../../../../css/shexComponents/headers/ShapeHeader.css';


function ShapeHeader (props) {

    const context = useContext(AppContext);
    const shapeContext = useContext(ShapeContext);
    const disabled = shapeContext.disabled;
    
    const {shape,customizeShape,collapseTriples,colapseBtn} = props;
    const [name,setName] = useState(shape.type.value);

    const handleChange = function(name){
        shape.type.setValue(name);
        context.emit();
        setName(name);
    }

    const handleKeyUp = function(e){
        if(e.target.value==''){
            shapeContext.setDisabled(true);
        }else{
            shapeContext.setDisabled(false);
        }
    }



    return (
        <div className='header'>            
            <label  className="shapeNameLabel">Shape</label>
            <Textbox
                    attributesInput={{ 
                        id: 'Name',
                        name: 'Name',
                        type: 'text',
                        placeholder: 'eg: User',
                    }}
                    value={name} 
                    onChange={(e)=>handleChange(e)}
                    onKeyUp={(e)=>handleKeyUp(e)}
                    validationOption={{
                        reg: /^[a-zA-Z0-9_.-]*$/, 
                        regMsg: 'Invalid name'
                    }}
                    title="Shape Name"
                    /> 

            
            <button className="buildBtn mdc-icon-button material-icons" 
                    onClick={customizeShape}
                    disabled={disabled} 
                    title="Customize Shape">
                    build
            </button>

            <button className="deleteShapeBtn mdc-icon-button material-icons" 
                    onClick={()=>context.deleteShape(shape.id)}
                    disabled={disabled} 
                    title="Delete Shape">
                    delete
            </button>

            <button className="collapseBtn mdc-icon-button material-icons" 
                    onClick={collapseTriples} 
                    disabled={disabled} 
                    title="Triple Constraints">
                    {colapseBtn}
            </button>
        </div>
    );
                                   
    
}


export default ShapeHeader;

/*

<input  type="text" 
                    className={"sName"+shape.id+" name"}
                    value={name}
                    onChange={handleChange}
                    placeholder="eg: User"
                    title="Shape Name"/>
*/