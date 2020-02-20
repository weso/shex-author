
import React, {useState} from 'react';
import { Collapse } from 'reactstrap';
import axios from 'axios';
import './App.css';

import EditorComp from './components/EditorComp';
import AssistantComp from './components/AssistantComp';
import VisualizeComp from  './components/VisualizeComp';

import LateralNav from './components/navComponents/LateralNav';
import Nav from './components/navComponents/Nav';

import shexUtils from './utils/shexUtils';

import Editor from './entities/editor';


import { Resizable } from "re-resizable";

export const ShapesContext = React.createContext();

function App() {

    const [shapes,setShapes] = useState([]);
    const [svg,setSvg] = useState('');
    const [prefixes,setPrefixes] = useState([{key:'',val:'http://example.org/'}]);
    const [isAssistantOpen, setAssistantOpen] = useState(true);
    const [isVisualizeOpen, setVisualizeOpen] = useState(false);
    const [isLateralNavOpen, setLateralNavOpen] = useState(true);
    const [width,setWidth] = useState(800);

    //Responsive
    const [shapeClass,setShapeClass] = useState('header');
    const [tripleClass,setTripleClass] = useState('tripleHeader');
    const [triplesContainer,setTriplesContainer] = useState('triples');
    const [tripleBtns,setTripleBtns] = useState('tripleBtns');
    const [constraintClass,setConstraintClass] = useState('constraintHeader');
    const [customClass,setCustomClass] = useState('gridBox');
    const [customTripleClass,setCustomTripleClass] = useState('gridBox');
    const [customConstraintClass,setCustomConstraintClass] = useState('constraintGridBox');

    const assistantToggle = () => setAssistantOpen(!isAssistantOpen); 
    const visualizeToggle = () => setVisualizeOpen(!isVisualizeOpen);
    const lateralNavToggle = () => setLateralNavOpen(!isLateralNavOpen);
    const colapseAll = () =>{
      setAssistantOpen(!isLateralNavOpen);
      setVisualizeOpen(!isLateralNavOpen);
      setLateralNavOpen(!isLateralNavOpen);
    }


    const darkStyle = {
        background: '#222',
        color:'white'
    }

    const lightStyle = {
        background: '#eaf3ff',
        color:'black'
    }

    const [style,setStyle] = useState(lightStyle);
    let theme = 'light';

    const changeThemeStyle = () =>{
      if(theme=='light'){//I don't know why this doesn't work with style state
        setStyle(darkStyle);
        theme='dark';
      }else{
        theme='light';
        setStyle(lightStyle);
      }
    }


    const addShape = () =>{
      setShapes([...shapes,shexUtils.addShape(shapes)]);
      visualize();
    }

    const deleteShape = (shapeId) =>{
      setShapes(shexUtils.deleteShape(shapes,shapeId,false));
      visualize();
    }

    const emit = ()=>{
      shexUtils.emit(shapes);
      visualize();
    }

    const replaceShapes = (newShapes) =>{
      //This allows to render all the shapes when a property is updated.
      //Best Glitch Ever
      setShapes([]); 
      setShapes(newShapes);
      visualize();
    }

    const updatePrefixes = (newPrefixes)=>{
      setPrefixes([])
      setPrefixes(newPrefixes);
    }
    

    const getSchema = function(){
      let yashe = Editor.getInstance().getYashe();
      if(yashe){
          return yashe.getValue();
      }
      return '';
    }


    const visualize = function(){

        let bodyFormData = new FormData();
        bodyFormData.set('schema', getSchema());
        bodyFormData.set('schemaFormat', 'ShExC');
        bodyFormData.set('schemaEngine', 'SHEX');


        axios({
            method: 'post',
            url: 'http://rdfshape.weso.es:8080/api/schema/visualize',
            data: bodyFormData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (response) {
            //handle success
            if(response.data.svg != undefined){
              if(response.data.svg.startsWith('<?xml')){
                setSvg(response.data.svg);
              }else{
                setSvg(null)
              }
            }
        })
        .catch(function (response) {
            //handle error
            console.log(response);
        });

        
    }


    return (
            
            <ShapesContext.Provider 
                value={
                  {
                    shapes,shapes,
                    addShape:addShape,
                    deleteShape:deleteShape,
                    replaceShapes:replaceShapes,
                    prefixes:prefixes,
                    updatePrefixes:updatePrefixes,
                    emit:emit,
                    currentStyle:style,
                    changeThemeStyle:changeThemeStyle,
                    visualize:visualize,
                    shapeClass:shapeClass,
                    tripleClass:tripleClass,
                    tripleBtns:tripleBtns,
                    constraintClass:constraintClass,
                    customClass:customClass,
                    triplesContainer:triplesContainer,
                    customTripleClass:customTripleClass,
                    customConstraintClass:customConstraintClass
                  }
                }>
                
                <Nav colapseAll={colapseAll}/>
              
                <div className="globalContainer">
                  <div className="row comps ">                     
                      <Collapse isOpen={isLateralNavOpen} className="col-xs-1 lateralNav">
                          <LateralNav  assistantToggle={assistantToggle} visualizeToggle={visualizeToggle}/>
                      </Collapse> 

                  

                  <Collapse isOpen={isAssistantOpen} className='row assistCollapse'>
           
                    <Resizable  className="col row resizable"
                                size={{ width: width }}
                    
                                onResize={(e, direction, ref, d) => {
                                /*
                                     if(width+d.width<600){
                                        setShapeClass('xs-header');
                                        setTripleClass('xs-tripleHeader');
                                        setTripleBtns('xs-tripleBtns');
                                        setTriplesContainer('xs-triples');
                                        setConstraintClass('xs-constraintHeader');
                                        setCustomClass('xs-gridBox');
                                        setCustomTripleClass('xs-tripleGridBox');
                                        setCustomConstraintClass('xs-constraintGridBox');
                                        return;
                                      }
                                     
                                     
                                     if(width+d.width<660){
                                        setShapeClass('sm-header');
                                        setTripleClass('sm-tripleHeader');
                                        setTripleBtns('tripleBtns');
                                        setTriplesContainer('sm-triples');
                                        setConstraintClass('sm-constraintHeader');
                                        setCustomClass('sm-gridBox');
                                        setCustomTripleClass('sm-tripleGridBox');
                                        setCustomConstraintClass('sm-constraintGridBox');
                                        return;
                                      }
                                      
                                      if(width+d.width<750){
                                        setShapeClass('ms-header');
                                        setTripleClass('ms-tripleHeader');
                                        setTripleBtns('tripleBtns');
                                        setTriplesContainer('ms-triples');
                                        setConstraintClass('ms-constraintHeader');
                                        setCustomClass('ms-gridBox');
                                        setCustomTripleClass('ms-tripleGridBox');
                                        setCustomConstraintClass('ms-constraintGridBox');
                                         return;
                                      }else{
                                        setShapeClass('header')
                                        setTripleClass('tripleHeader');
                                        setTripleBtns('tripleBtns');
                                        setTriplesContainer('triples');
                                        setConstraintClass('constraintHeader');
                                        setCustomClass('gridBox');
                                        setCustomTripleClass('gridBox');
                                        setCustomConstraintClass('constraintGridBox');
                                      }
                                  */
                                }} 

                                onResizeStop={(e, direction, ref, d) => {
                                  setWidth(width+d.width);

                                  if(width+d.width<600){
                                          setShapeClass('xs-header');
                                          setTripleClass('xs-tripleHeader');
                                          setTripleBtns('xs-tripleBtns');
                                          setTriplesContainer('xs-triples');
                                          /*setConstraintClass('xs-constraintHeader');
                                          setCustomClass('xs-gridBox');
                                          setCustomTripleClass('xs-tripleGridBox');
                                          setCustomConstraintClass('xs-constraintGridBox');
                                          
                                          */return;
                                        }
                                      
                                      else{
                                          setShapeClass('header')
                                          
                                          setTripleClass('tripleHeader');
                                          setTripleBtns('tripleBtns');
                                          setTriplesContainer('triples');
                                         /* setConstraintClass('constraintHeader');
                                          setCustomClass('gridBox');
                                          setCustomTripleClass('gridBox');
                                          setCustomConstraintClass('constraintGridBox');
                                      
                                      */ }
                                   
                                  
                                    
                                  
                                }} 
                                enable={{right:true}}
>
                      <div className='col containerAssist'>
                        <AssistantComp/>                            
                      </div>



                    </Resizable>     
                  </Collapse>                         
                         
                 
                     
                  <EditorComp  />
                      
                        
                  </div>
                </div>
                <Collapse isOpen={isVisualizeOpen} >
                  <VisualizeComp svg={svg}/>
                </Collapse>                         
                         
               
            </ShapesContext.Provider>
          );
                       
           
  
    
}

/*
 
                        
  
            
                      
*/


export default App;