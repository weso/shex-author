import React,{useContext,useState} from 'react';
import { Collapse } from 'reactstrap';
import '../App.css';
import '../css/grid.css';
import ShapeComponent from './shexComponents/ShapeComponent';
import {ShapesContext} from '../App';



function AssistantComp (props) {

    const context = useContext(ShapesContext);
    const [isCustomOpen,setCustomOpen] = useState(false);
    const [isTripleCustomOpen,setTripleCustomOpen] = useState(false);
    const [isTriplesOpen,setTriplesOpen] = useState(true);
    const [isPrefix,setPrefix] = useState(true);

    const [colapseBtn,setColapseBtn] = useState('menu_open');

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


    const customize = function(){
        setCustomOpen(!isCustomOpen);
        setTriplesOpen(false);
        setColapseBtn('menu');
    }

    const triples = function(){
        setCustomOpen(false);
        setTriplesOpen(!isTriplesOpen);

        if(colapseBtn=='menu'){
            setColapseBtn('menu_open');
        }else{
            setColapseBtn('menu');
        }
    }

     const open = function(evt){
            if(evt.target.value=='1'){
                setPrefix(true);
            }else{
                setPrefix(false);
            }
            
    }

    const del = function(id){
        context.deleteShape(id);
    }


     const customizeTriple = function(){
        setTripleCustomOpen(!isTripleCustomOpen);
        //setTriplesOpen(false);
        //setColapseBtn('menu');
    }


    return (<div id='assistant-container' className='col assistantContainer'> 

        

        {context.shapes.map(shape =>{
                                
                            return  <div className="shape" key={shape.id}>

            <div className="header">
            
                <label className="shapeNameLabel">Shape </label>
                <input type="text" className="form-control shapeName"/>
                <button className="accordion mdc-icon-button material-icons" onClick={customize}>build</button>
                <button className="deleteShapeBtn mdc-icon-button material-icons" onClick={()=>del(shape.id)}>delete</button>
                <div/>
                <div/>
                <button className="triplesBtn mdc-icon-button material-icons" onClick={triples}>{colapseBtn}</button>
             
            </div>

            
            <Collapse isOpen={isCustomOpen} >
                    <div className="custom">
                        
                        <div className="box1 gridBox">
                            <div/>
                            <label>Type </label>
                            <select className="customSelector" onChange={open}>
                                <option value="0">IriRef</option>
                                <option value="1" selected>PrefixedIri</option>
                                <option value="2">Bnode</option>
                            </select>
                        </div>

                        <Collapse isOpen={isPrefix} className="box2 gridBox">
                            <div/>
                            <label>Prefix </label>
                            <select className="customSelector">
                                <option value="0">default</option>
                                <option value="1">xsd</option>
                                <option value="2">schema</option>
                            </select>
                        </Collapse>


                        <div className="box3 gridBox">
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


             <div/>
            <Collapse isOpen={isTriplesOpen} >
                    <div className="triples">
                        
                        
                        <div className="tripleHeader">
                           
                           
                            <label>Triple </label>
                            <input type="text" className="form-control shapeName"/>
                            <select className="customSelector">
                                    <option value="0">String</option>
                                    <option value="1">Integer</option>
                                    <option value="2">Boolean</option>
                                    <option value="2">Date</option>
                            </select>
                                                 
                            <select className="customSelector">
                                <option value="">Exactly one</option>
                                <option value="*">Zero or more</option>
                                <option value="+">One at least</option>
                                <option value="?">One or none</option>
                            </select>
                               
                            <button className="accordion mdc-icon-button material-icons" onClick={customizeTriple}>build</button>
                            <button className="deleteShapeBtn mdc-icon-button material-icons" onClick={()=>del(shape.id)}>delete</button>
                        </div>

                        
                        <Collapse isOpen={isTripleCustomOpen} className='customColapse' >
                            <div className="customTriple">
                                <div className="gridTriplesBox">
                                    <div/>
                                    <label>Type </label>
                                    <select className="customSelector" onChange={open}>
                                        <option value="0">IriRef</option>
                                        <option value="1" selected>PrefixedIri</option>
                                        <option value="2">Bnode</option>
                                    </select>
                                </div>

                                <Collapse isOpen={isPrefix} className="gridTriplesBox">
                                    <div/>
                                    <label>Prefix </label>
                                    <select className="customSelector">
                                        <option value="0">default</option>
                                        <option value="1">xsd</option>
                                        <option value="2">schema</option>
                                    </select>
                                </Collapse>


                                <div className="gridTriplesBox">
                                    <div/>
                                    <label>Value </label>
                                    <select className="customSelector" >
                                        <option value="0">IriRef</option>
                                        <option value="1" selected>PrefixedIri</option>
                                        <option value="2">Shape</option>
                                        <option value="3">Literal</option>
                                        <option value="4">NonLiteral</option>
                                        <option value="5">IRI</option>
                                        <option value="6">BNode</option>
                                    </select>
                                </div>
                       
                            </div>
                        </Collapse> 
                        
             
                        <button 
                            className="addTripleButton"
                            onClick={context.addShape}>
                            + Triple
                    </button>        
                    </div>
                     
            </Collapse> 
           
            

        </div>
                        })
                    }

         <button id='addShapeButton' 
                            className="addShapeButton"
                            onClick={context.addShape}>
                            + Shape
                    </button>
               

                   
        </div>);

    
}

export default AssistantComp;