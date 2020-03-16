
import React, {useState} from 'react';
import axios from 'axios';
import './css/App.css';

import Nav from './components/Nav';
import MainContainer from './components/MainContainer';
import Visualizer from './components/Visualizer';

import shexUtils from './utils/shexUtils';
import {emitPrefixes} from './utils/prefixUtils';
import yasheUtils from './utils/yasheUtils';


import Editor from './entities/editor';

import {addPrefixComp,deletePrefixComp} from './utils/prefixUtils';


export const AppContext = React.createContext();

function App() {

    const [shapes,setShapes] = useState([]);
        const [prefixes,setPrefixes] = useState([]);
    const [svg,setSvg] = useState('');
    const [isAssistantOpen, setAssistantOpen] = useState(true);
    const [isShapesOpen, setShapesOpen] = useState(true);
    const [isVisualizeOpen, setVisualizeOpen] = useState(true);
    const [isToolBarOpen, setToolBarOpen] = useState(true);

    const [width,setWidth] = useState(700);

    const [loading,setLoading] = useState('hideLoader');
    const [asist,setAsist] = useState('showAsist');

    //Responsive
    const [shapeHeader,setShapeHeader] = useState('header');
    const [tripleHeader,setTripleHeader] = useState('tripleHeader');
    const [triplesContainer,setTriplesContainer] = useState('triples');
    const [shapeLabel,setShapeLabel] = useState('shapeNameLabel');
    const [tripleLabel,setTripleLabel] = useState('tripleNameLabel');
    const [tripleBtns,setTripleBtns] = useState('tripleBtns');
    const [addBtns,setAddBtns] = useState('addBtns');
    const [gridClass,setGridClass] = useState('gridBox');
    
  

    const assistantToggle = () => setAssistantOpen(!isAssistantOpen);
    const shapesToggle = () => {
      //In case the assistant is closed...
      if(!isAssistantOpen){
        setAssistantOpen(true);
        setShapesOpen(false);
      }else{
         setShapesOpen(!isShapesOpen);
      }
    }
    const visualizeToggle = () => setVisualizeOpen(!isVisualizeOpen);
    const toolbarToggle = () => setToolBarOpen(!isToolBarOpen);
    const colapseAll = () =>{
      setAssistantOpen(!isToolBarOpen);
      setVisualizeOpen(!isToolBarOpen);
      setToolBarOpen(!isToolBarOpen);
    }

    const addShape = () =>{
      setShapes([...shapes,shexUtils.addShape(shapes)]);
      visualize();
    }

    const deleteShape = (shapeId) =>{
      setShapes(shexUtils.deleteShape(shapes,shapeId,false));
      visualize();
    }

    const addPrefix = function(){
      setPrefixes([...prefixes,addPrefixComp(prefixes)]);
    }
      
    const deletePrefix = function(prefixId){
      setPrefixes(deletePrefixComp(prefixes,prefixId));
    }


    const emit = ()=>{
      shexUtils.emit(shapes);
      visualize();
    }

    const emitPref = ()=>{
      emitPrefixes(prefixes);
      visualize();
    }

    const replaceShapes = (newShapes) =>{
      //This allows to render all the shapes when a property is updated.
      //Best Glitch Ever
      //In fact... I would like to render just the property component...
      setShapes([]); 
      
      setShapes(newShapes);
      visualize();
    }

    const replacePrefixes = (newPrefixes) =>{
      
      setPrefixes([]); 
      setPrefixes(newPrefixes);
  
    }
    
    const updatePrefixes = (newPrefixes)=>{
      setPrefixes([])
      setPrefixes(newPrefixes);
    }
    

    const visualize = function(){

        let bodyFormData = new FormData();
        bodyFormData.set('schema', yasheUtils.getSchema());
        bodyFormData.set('schemaFormat', 'ShExC');
        bodyFormData.set('schemaEngine', 'SHEX');

        axios({
            method: 'post',
            url: 'http://rdfshape.weso.es:8080/api/schema/visualize',
            data: bodyFormData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function(response){
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


      const makeItResponsive = function(e, direction, ref, d){
            setWidth(width+d.width);
          
            if(width+d.width<700){
                    setShapeHeader('xs-header');
                    setTripleHeader('xs-tripleHeader');
                    setTripleBtns('xs-tripleBtns');
                    setTriplesContainer('xs-triples');
                    setShapeLabel('xs-label');
                    setTripleLabel('xs-label');
                    setAddBtns('xs-addBtns');
                    setGridClass('xs-gridBox');
                    return;
            }
                    
            setShapeHeader('header')                                          
            setTripleHeader('tripleHeader');
            setTripleBtns('tripleBtns');
            setTriplesContainer('triples');
            setShapeLabel('shapeNameLabel');
            setTripleLabel('tripleNameLabel');
            setAddBtns('addBtns');
            setGridClass('gridBox');
        }


    return (
      
          <AppContext.Provider
                value={
                  {
                  shapes:shapes,
                  addShape:addShape,
                  deleteShape:deleteShape,
                  addPrefix:addPrefix,
                  deletePrefix:deletePrefix,
                  replaceShapes:replaceShapes,
                  replacePrefixes:replacePrefixes,
                  prefixes:prefixes,
                  updatePrefixes:updatePrefixes,
                  emit:emit,
                  emitPref:emitPref,
                  visualize:visualize,
                  isToolBarOpen:isToolBarOpen,
                  isAssistantOpen:isAssistantOpen,
                  isShapesOpen:isShapesOpen,
                  isVisualizeOpen:isVisualizeOpen,
                  assistantToggle:assistantToggle,
                  shapesToggle:shapesToggle,
                  visualizeToggle:visualizeToggle,

                  //responsive
                  width:width,
                  makeItResponsive:makeItResponsive,
                  shapeHeader:shapeHeader,
                  tripleHeader:tripleHeader,
                  triplesContainer:triplesContainer,
                  shapeLabel:shapeLabel,
                  tripleLabel:tripleLabel,
                  tripleBtns:tripleBtns,
                  addBtns:addBtns,
                  gridClass:gridClass,
                  loading:loading,
                  setLoading:setLoading,
                  asist:asist,
                  setAsist:setAsist,

                    
                  }
                }>

              <Nav colapseAll={colapseAll}/>
              <MainContainer/>
              <Visualizer svg={svg} isVisualizeOpen={isVisualizeOpen}/>
                                                  
            </AppContext.Provider>);

}  
           

export default App;