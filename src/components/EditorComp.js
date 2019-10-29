import React, {useState,useContext,useEffect,useRef} from 'react';
import 'yashe/dist/yashe.min.css';
import {ShapesContext} from '../App';


let YASHE = require('yashe');

let Editor = require('../entities/editor.js');

let tokenUtils = require('../utils/tokenUtils.js');

const DEFAULT_SHAPE = 'PREFIX :       <http://example.org/>\n'+
'PREFIX schema: <http://schema.org/>\n'+
'PREFIX xsd:    <http://www.w3.org/2001/XMLSchema#>\n\n'+

':User IRI {\n'+ 
'  schema:name          xsd:string  ;\n'+
'  schema:birthDate     xsd:date?  ;\n'+
'  schema:birthPlace    xsd:string+  ;\n'+
'  schema:knows          @:User*  \n'+
'}';



function EditorComp() {

  const [yashe,setYashe] = useState(null);
  const textAreaRef = useRef(null);
  const context = useContext(ShapesContext);

  useEffect(() => {
    
        if (!yashe) {
            const options = {
                persistent:false,
                lineNumbers: true,
                viewportMargin: Infinity
            }
            
            const y = YASHE.fromTextArea(
                textAreaRef.current, 
                options)

             y.on('blur', function() {
                if(!y.hasErrors(y)){

                    let tokens = tokenUtils.getTokens();
                    let defShapes = tokenUtils.getDefinedShapes(tokens);
                    let newShapes = tokenUtils.getShapes(defShapes);
              
                    context.replaceShapes(newShapes);

                    let newPrefixes = [];
                    let prefix = {};
                    let yashe = Editor.getInstance().getYashe();
                    let keys = Object.keys(yashe.getDefinedPrefixes());
                    let values = Object.values(yashe.getDefinedPrefixes());

                    for(let i=0;i<keys.length;i++){
                        prefix = {};
                        prefix.key=keys[i];
                        prefix.val=values[i];
                        newPrefixes.push(prefix);
      }
                    context.updatePrefixes(newPrefixes);
                }
            });

            y.on('humanEvent', function(shapes) {
                Editor.getInstance().draw(shapes);
            });


            y.setValue(DEFAULT_SHAPE)
            y.refresh();
            setYashe(y);

            Editor.getInstance().setYashe(y);
        }
    }, [yashe]
    );

    return  (<div className='col-lg show'>
                <textarea ref={textAreaRef}/>
            </div>            
    );

    
}



export default EditorComp;

