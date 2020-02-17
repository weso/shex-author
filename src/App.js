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

import ResizePanel from "react-resize-panel";

import { Resizable, ResizableBox } from 'react-resizable';

export const ShapesContext = React.createContext();

function App() {

    const [shapes,setShapes] = useState([]);
    const [svg,setSvg] = useState('');
    const [prefixes,setPrefixes] = useState([{key:'',val:'http://example.org/'}]);
    const [isAssistantOpen, setAssistantOpen] = useState(true);
    const [isVisualizeOpen, setVisualizeOpen] = useState(false);
    const [isLateralNavOpen, setLateralNavOpen] = useState(true);

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
                    visualize:visualize
                  }
                }>
                
                <Nav colapseAll={colapseAll}/>
              
       <div className="globalContainer">
                  <div className="row row-cols-3 comps ">                     
                      <Collapse isOpen={isLateralNavOpen} className="col-xs-1 lateralNav">
                          <LateralNav  assistantToggle={assistantToggle} visualizeToggle={visualizeToggle}/>
                      </Collapse> 

                  <Collapse isOpen={isAssistantOpen} className="row assistCollapse">
                   <ResizableBox className="col box" width={100}  axis="x">
                      <div className="col containerAssist">
                        <AssistantComp/>                                       
                      </div>
                 </ResizableBox>     
                     
                  </Collapse> 
                     
                      <EditorComp />
                      
                        
                  </div>
                </div>
                <Collapse isOpen={isVisualizeOpen} >
                  <VisualizeComp svg={svg}/>
                </Collapse>                         
                         
               
            </ShapesContext.Provider>
          );
                       
           
  
    
}

/*
 
                        
  

                <div className="div0">
                
                  <div className="div1">Qwerty
                  </div>

                  <ResizePanel direction="e"   handleClass="resize">
                    <div className="div2">Qwerty</div>
                  </ResizePanel>

                  <div className="div3">Qwerty
                  </div>
                </div>

                 .div0{
        display:grid;
        grid-template-areas: 
        'divi1 divi2 divi2 divi3 divi3';
     
        background: white;
        height: 500px;
    }

    .div1{
        grid-area: divi1;
        background: red;
    }


    .sss{
        background: yellow;
        width: 100%;
    }

    .div2{

        grid-area: divi2;
       
       
        overflow: auto;
        resize: horizontal;
        
        resize: horizontal;
    }

    .div3{
        grid-area: divi3;
        background: purple;
    }

                      
*/


export default App;
