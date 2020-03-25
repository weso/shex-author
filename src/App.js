
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
    const [isPrefixesOpen, setPrefixesOpen] = useState(false);
    const [isVisualizeOpen, setVisualizeOpen] = useState(true);
    const [isToolBarOpen, setToolBarOpen] = useState(true);

    const [width,setWidth] = useState(700);

    const assistantToggle = () => setAssistantOpen(!isAssistantOpen);
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
      
      const handleResize = function(e, direction, ref, d){

            setWidth(width+d.width);

            let tabs = document.getElementsByClassName("tabs")[0];
            let shapeHeaders = document.getElementsByClassName("header");
            let tripleHeaders = document.getElementsByClassName("tripleHeader");
            let addTripleBtns = document.getElementsByClassName("addTripleButton");
            let addShapeBtns = document.getElementsByClassName("addShapeButton");
            let grids = document.getElementsByClassName("gridBox");
            let prefixes = document.getElementsByClassName("prefixHeader");

            
            let tabClass = 'tabs';
            let shClass = 'header';
            let thClass = 'tripleHeader';
            let adTClass = 'addTripleButton';
            let adSClass = 'addShapeButton';
            let grClass = 'gridBox';
            let prClass = 'prefixHeader';
            if(width+d.width<700){
                tabClass += ' xs-tabs';
                shClass += ' xs-header';
                thClass += ' xs-tripleHeader';
                adTClass += ' xs-addTripleButton';
                adSClass += ' xs-addShapeButton';
                grClass += ' xs-gridBox';
                prClass += ' xs-prefixHeader';
            }else{
              //Why this is needed?
              tabClass = 'tabs';
              shClass = 'header';
              thClass = 'tripleHeader';
              adTClass = 'addTripleButton';
              adSClass = 'addShapeButton';
              grClass = 'gridBox';
              prClass = 'prefixHeader';
            }

           
            tabs.className = tabClass;

            for(let i=0;i<shapeHeaders.length;i++){
              shapeHeaders[i].className = shClass;
            }

            for(let i=0;i<tripleHeaders.length;i++){
              tripleHeaders[i].className = thClass;
            }

            for(let i=0;i<addTripleBtns.length;i++){
              addTripleBtns[i].className = adTClass;
            }

            for(let i=0;i<addShapeBtns.length;i++){
              addShapeBtns[i].className = adSClass;
            }

            for(let i=0;i<grids.length;i++){
              grids[i].className = grids[i].className.replace('gridBox',grClass);
            }

            for(let i=0;i<prefixes.length;i++){
              prefixes[i].className = prClass;
            }

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
                  emit:emit,
                  emitPref:emitPref,
                  visualize:visualize,
                  isToolBarOpen:isToolBarOpen,
                  isAssistantOpen:isAssistantOpen,
                  isPrefixesOpen:isPrefixesOpen,
                  isVisualizeOpen:isVisualizeOpen,
                  assistantToggle:assistantToggle,
                  setPrefixesOpen:setPrefixesOpen,
                  visualizeToggle:visualizeToggle,
                  width:width,
                  handleResize:handleResize,
                  }
                }>

              <Nav colapseAll={colapseAll}/>
              <MainContainer/>
              <Visualizer svg={svg} isVisualizeOpen={isVisualizeOpen}/>
                                                  
            </AppContext.Provider>);

}  
           

export default App;