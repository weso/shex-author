import React,{useState,useContext} from 'react';
import { Textbox } from 'react-inputs-validation';
import {AppContext} from '../../../../../../App';
import {AssistContext} from '../../../../Assistant';
import {ShapeContext} from '../ShapeComponent';
import {PN_LOCAL,IRI_REF} from '../../../../../../utils/regExpUtils';
import '../../../../../../css/shexComponents/headers/ShapeHeader.css';


function ShapeHeader (props) {

    const context = useContext(AppContext);
    const shapeContext = useContext(ShapeContext);
    const asssistContext = useContext(AssistContext);
    const disabled = shapeContext ? shapeContext.disabled : false;
    
    
    const {shape,customizeShape,collapseTriples,colapseBtn} = props;
    const [name,setName] = useState(shape.type.value);

    let initialRegExp = new RegExp("^" +PN_LOCAL);
    if(shape.type.getTypeName()=='iriRef') initialRegExp = new RegExp("^" +IRI_REF);;
    const [regExp,setRegExp] = useState(initialRegExp);

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


        <div className='header' >            
            <label style={asssistContext.colors.label}>Shape</label>
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
                        reg: regExp, 
                        regMsg: 'Invalid name'
                    }}
                    title="Shape Name"
                    disabled={asssistContext.isConfigOpen}
                    /> 

            <button className="buildBtn mdc-icon-button material-icons" 
                    onClick={customizeShape}
                    disabled={disabled || asssistContext.isConfigOpen}
                    title="Customize Shape">
                    build
            </button>
           
            <button className="deleteShapeBtn mdc-icon-button material-icons" 
                    onClick={()=>context.deleteShape(shape.id)}
                    disabled={asssistContext.isConfigOpen}
                    title="Delete Shape">
                    delete
            </button>

            <button className="collapseBtn mdc-icon-button material-icons" 
                    onClick={collapseTriples} 
                    disabled={disabled || asssistContext.isConfigOpen}
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