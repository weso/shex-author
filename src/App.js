
import React, {useState} from 'react';
import axios from 'axios';
import './css/App.css';

import Nav from './components/Nav';
import MainContainer from './components/MainContainer';
import Visualizer from './components/Visualizer';

import shexUtils from './utils/shexUtils';

import Editor from './entities/editor';


export const ShapesContext = React.createContext();

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
    const [shapeClass,setShapeClass] = useState('header');
    const [tripleClass,setTripleClass] = useState('tripleHeader');
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


    const makeItResponsive = function(e, direction, ref, d){
    
          setWidth(width+d.width);

          if(width+d.width<700){
                  setShapeClass('xs-header');
                  setTripleClass('xs-tripleHeader');
                  setTripleBtns('xs-tripleBtns');
                  setTriplesContainer('xs-triples');
                  setShapeLabel('xs-label');
                  setTripleLabel('xs-label');
                  setAddBtns('xs-addBtns');
                  setGridClass('xs-gridBox');
                  return;
          }
                
          setShapeClass('header')                                          
          setTripleClass('tripleHeader');
          setTripleBtns('tripleBtns');
          setTriplesContainer('triples');
          setShapeLabel('shapeNameLabel');
          setTripleLabel('tripleNameLabel');
          setAddBtns('addBtns');
          setGridClass('gridBox');
        
    }


    return (
      
          <ShapesContext.Provider
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
                    shapeClass:shapeClass,
                    tripleClass:tripleClass,
                    tripleBtns:tripleBtns,
                    shapeLabel:shapeLabel,
                    tripleLabel:tripleLabel,                 
                    triplesContainer:triplesContainer,
                    addBtns:addBtns,
                    loading:loading,
                    setLoading:setLoading,
                    asist:asist,
                    setAsist:setAsist,
                    assistantToggle:assistantToggle,
                    visualizeToggle:visualizeToggle,
                    gridClass:gridClass
                  }
                }>

              <Nav colapseAll={colapseAll}/>
              <MainContainer/>
              <Visualizer svg={svg} isVisualizeOpen={isVisualizeOpen}/>
                                                  
            </ShapesContext.Provider>);

}  
           

export default App;