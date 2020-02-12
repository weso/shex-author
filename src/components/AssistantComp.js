import React,{useContext,useState} from 'react';
import { Collapse } from 'reactstrap';
import '../App.css';
import '../css/grid.css';
import ShapeComponent from './shexComponents/ShapeComponent';
import {ShapesContext} from '../App';

function AssistantComp (props) {

    const context = useContext(ShapesContext);
    const [isCustomOpen,setCustomOpen] = useState(false);
    const [isPrefix,setPrefix] = useState(true);

    /*
 

               

         <div className='col row assisTitleDiv'>
                        <span className="assisTitle" style={context.style}>Assistant</span>
                    </div>
                    {context.shapes.map(shape =>{
                                
                            return <ShapeComponent key={shape.id} shape={shape}/>
                        })
                    }

                    <button id='addShapeButton' 
                            className="btn-primary addShapeButton"
                            onClick={context.addShape}>
                            + Shape
                    </button>

    */
    const click = function(){


    setCustomOpen(!isCustomOpen);
    }

     const open = function(evt){
            if(evt.target.value=='1'){
                setPrefix(true);
            }else{
                setPrefix(false);
            }
            
    }

  const notify = function(evt){

      console.log(evt.target.checked)
    }

    return (<div id='assistant-container' className='assistantContainer'> 

        

        {context.shapes.map(shape =>{
                                
                            return  <div className="shape" key={shape.id}>

            <div className="header">
                <label className="">Shape </label>
                <input className="form-control shapeName"/>
                <button className="accordion" onClick={click}>Customize</button>

            </div>


            <Collapse isOpen={isCustomOpen} >
                    <div className="custom">
                        
                        <div className="box1 griBox">
                            <div/>
                            <label>Type </label>
                            <select className="customSelector" onChange={open}>
                                <option value="0">IriRef</option>
                                <option value="1" selected>PrefixedIri</option>
                                <option value="2">Bnode</option>
                            </select>
                        </div>

                        <Collapse isOpen={isPrefix} className="box2 griBox">
                            <div/>
                            <label>Prefix </label>
                            <select className="customSelector">
                                <option value="0">default</option>
                                <option value="1">xsd</option>
                                <option value="2">schema</option>
                            </select>
                        </Collapse>


                        <div className="box3 griBox">
                            <div/>
                            <label>Qualifier </label>
                            <select className="customSelector">
                                <option value="1">None</option>
                                <option value="2">Iri</option>
                                <option value="3">Literal</option>
                                <option value="4">NonLiteral</option>
                                <option value="5">Bnode</option>
                            </select>
                        </div>
                    </div>
            </Collapse> 
           
            

        </div>
                        })
                    }

         <button id='addShapeButton' 
                            className="btn-primary addShapeButton"
                            onClick={context.addShape}>
                            + Shape
                    </button>
               

                   
        </div>);

    
}

export default AssistantComp;