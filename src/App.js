import React, {useState} from 'react';
import { Collapse } from 'reactstrap';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

import EditorComp from './components/EditorComp';
import AssistantComp from './components/AssistantComp';
import VisualizeComp from  './components/VisualizeComp';

import LateralNav from './components/navComponents/LateralNav';
import Nav from './components/navComponents/Nav';

import shexUtils from './utils/shexUtils';

import Editor from './entities/editor';


export const ShapesContext = React.createContext();

function App() {

    const [shapes,setShapes] = useState([]);
    const [svg,setSvg] = useState('');
    const [prefixes,setPrefixes] = useState([{key:'',val:'http://example.org/'}]);
    const [isAssistantOpen, setAssistantOpen] = useState(true);
    const [isVisualizeOpen, setVisualizeOpen] = useState(true);
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
      setPrefixes(newPrefixes);
    }
    
    const changeThemeStyle = () =>{
      if(theme=='light'){//I don't know why this doesn't work with style state
        setStyle(darkStyle);
        theme='dark';
      }else{
        theme='light';
        setStyle(lightStyle);
      }
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
            setSvg(response.data.svg);
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
              
                <div className="row comps" style={style}>                  
                    
                    <Collapse isOpen={isLateralNavOpen} className="lateralNav col-xs-1">
                        <LateralNav  assistantToggle={assistantToggle} visualizeToggle={visualizeToggle}/>
                     </Collapse> 
                    

                    <Collapse isOpen={isAssistantOpen} className="col" style={style}>
                        <AssistantComp/>
                     </Collapse> 
                    
                    <EditorComp />
                      
                </div>
              
                <Collapse isOpen={isVisualizeOpen} >
                  <VisualizeComp svg={svg}/>
                </Collapse>   
            </ShapesContext.Provider>
          );
                       
           
  
    
}


export default App;
