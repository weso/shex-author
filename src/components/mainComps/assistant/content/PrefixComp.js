import React,{useContext,useState,useEffect} from 'react';
import {AppContext} from '../../../../App';

function PrefixComp (props) {

        const context = useContext(AppContext);
        const {prefix,deletePrefix,emit} = props;
        const [name,setName] = useState(prefix.prefixName);
        const [value,setValue] = useState(prefix.prefixValue);
        const open = '<';
        const close = '>';

        const handleAlias  = function(e,prefix){
                prefix.prefixName = e.target.value;
                setName(e.target.value);
                emit();
        }

        const handleIri  = function(e,prefix){
                prefix.prefixValue = e.target.value;
                setValue(e.target.value);
                emit();
        }
      
        return (
                <div className='prefixHeader'>            
                    <input  type="text" 
                            className="prefixName prefixInput"
                            placeholder="eg: schema"
                            value={name}
                            onChange={(e)=>handleAlias(e,prefix)}
                            title="Alias"/>
                    <label  className={context.shapeLabel+" prefixLabel"}>:</label>
                    <label  className={context.shapeLabel+" prefixLabel"}>{open}</label>
                    <input  type="text" 
                            className="prefixInput"
                            value={value}
                            placeholder="eg: http://schema.org/"
                            onChange={(e)=>handleIri(e,prefix)}
                            title="IRI"/>
                    <label  className={context.shapeLabel+" prefixLabel"}>{close}</label>
                    <button className="deletePrefix mdc-icon-button material-icons" 
                            onClick={()=>deletePrefix(prefix.id)}
                            title="Delete Prefix">
                            delete
                    </button>                              
                </div>)
     
}

export default PrefixComp;
