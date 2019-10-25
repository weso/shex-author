import React, {useState, useEffect, useRef} from 'react';
import 'yashe/dist/yashe.min.css'

let YASHE = require('yashe');

function Editor() {

    const [yashe,setYashe] = useState(null)
    const textAreaRef=useRef(null)

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
         

            y.on('humanEvent', function() {
                /*
                drawEditor();
                updatePrefixes();
                updateInlineShapes();
                */
                console.log('humanEvent');
            });



            y.on('blur', function() {
                /*
                if(!yashe.hasErrors(yashe)){
                    updateAssistant();
                }
                */
                console.log('blur');
            });


            //y.setValue(props.value)
            y.refresh();
            setYashe(y);
        }
    }, [yashe]
    );

    return (
        <div className="col-lg show" > 
            <textarea ref={textAreaRef}/>
        </div>
    );

}

export default Editor;
