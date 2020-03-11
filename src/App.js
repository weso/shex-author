
import React, {useState,useEffect} from 'react';
import axios from 'axios';
import './css/App.css';

import Nav from './components/Nav';
import MainContainer from './components/MainContainer';
import Visualizer from './components/Visualizer';

import shexUtils from './utils/shexUtils';
import yasheUtils from './utils/yasheUtils';


import Editor from './entities/editor';


export const AppContext = React.createContext();

function App() {

    const [shapes,setShapes] = useState([]);
    const [svg,setSvg] = useState('');
    const [prefixes,setPrefixes] = useState([{key:'',val:'http://example.org/'}]);
    const [isAssistantOpen, setAssistantOpen] = useState(true);
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

    const emit = ()=>{
      shexUtils.emit(shapes);
      visualize();
    }

    const replaceShapes = (newShapes) =>{
      //This allows to render all the shapes when a property is updated.
      //Best Glitch Ever
      //In fact... I would like to render only the property component...
      setShapes([]); 
      setShapes(newShapes);
      visualize();
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

    const handleResize = function(e, direction, ref, d){
        makeItResponsive(d.width);
    }

    const makeItResponsive = function(newWidht){
          setWidth(width+newWidht);
          if(width+newWidht<710){
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

    useEffect(() => {
      makeItResponsive(0);
    });
    
    return (
      
          <AppContext.Provider
                value={
                  {
                  shapes:shapes,
                  addShape:addShape,
                  deleteShape:deleteShape,
                  replaceShapes:replaceShapes,
                  prefixes:prefixes,
                  updatePrefixes:updatePrefixes,
                  emit:emit,
                  visualize:visualize,
                  isToolBarOpen:isToolBarOpen,
                  isAssistantOpen:isAssistantOpen,
                  isVisualizeOpen:isVisualizeOpen,
                  assistantToggle:assistantToggle,
                  visualizeToggle:visualizeToggle,

                  //responsive
                  width:width,
                  handleResize:handleResize,
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