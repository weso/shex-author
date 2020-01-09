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
import {getRequestOptions} from './utils/visualizeUtils'; 


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
    
    const visualize = function(){

        axios(getRequestOptions()).then(function (response) {
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
                    visualize:visualize
                  }
                }>
                
                  <Nav colapseAll={colapseAll}/>
                
                  <div className="globalContainer">
                    <div className="row comps">                     
                        <Collapse isOpen={isLateralNavOpen} className="lateralNav col-xs-1">
                            <LateralNav  assistantToggle={assistantToggle} visualizeToggle={visualizeToggle}/>
                        </Collapse> 
                        

                        <Collapse isOpen={isAssistantOpen} className="col">
                            <AssistantComp/>
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


export default App;
