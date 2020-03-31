import React,{useState,useContext} from 'react';
import { Textbox } from 'react-inputs-validation';
import {AppContext} from '../../../../../../App';
import {AssistContext} from '../../../../Assistant';
import {ShapeContext} from '../ShapeComponent';
import {PN_LOCAL,IRI_REF} from '../../../../../../utils/regExpUtils';
import '../../../../../../css/shexComponents/headers/ShapeHeader.css';
import {SHAPE_COLORS} from '../../../../../../conf/properties';


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

    const styles ={
        header:asssistContext.styles.header,
        label:asssistContext.styles.label,
        delete:asssistContext.styles.delete,
        collapse:asssistContext.styles.collapse
    }

    return (


        <div className='header' style={styles.header}>            
            <label style={styles.label}>Shape</label>
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
                    /> 

            <button className="buildBtn mdc-icon-button material-icons" 
                    style={asssistContext.styles.custom} 
                    onClick={customizeShape}
                    disabled={disabled}
                    title="Customize Shape">
                    build
            </button>
           
            <button className="deleteShapeBtn mdc-icon-button material-icons" 
                    style={styles.delete}
                    onClick={()=>context.deleteShape(shape.id)}
                    title="Delete Shape">
                    delete
            </button>
            

            <button className="collapseBtn mdc-icon-button material-icons" 
                    style={styles.collapse}
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