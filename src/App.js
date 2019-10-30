import React, {useState} from 'react';
import SlideToggle from "react-slide-toggle";
import logo from './logo.svg';
import './App.css';

import EditorComp from './components/EditorComp';
import AssistantComp from './components/AssistantComp';
import Nav from './components/navComponents/Nav';

let shexUtils = require('./utils/shexUtils.js');

export const ShapesContext = React.createContext();

function App() {

    const [shapes,setShapes] = useState([]);
    const [prefixes,setPrefixes] = useState([{key:'',val:'http://example.org/'}]);

    const addShape = () =>{
      setShapes([...shapes,shexUtils.addShape(shapes)]);
    }

    const deleteShape = (shapeId) =>{
      setShapes(shexUtils.deleteShape(shapes,shapeId));
    }

    const emit = ()=>{
      shexUtils.emit(shapes);
    }

    const replaceShapes = (newShapes) =>{
      //This allows to render all the shapes when a property is updated.
      //Best Glitch Ever
      setShapes([]); 
      setShapes(newShapes);
    }

    const updatePrefixes = (newPrefixes)=>{
      setPrefixes(newPrefixes);
    }

    return (
            
            <ShapesContext.Provider value={
                                    {
                                      shapes,shapes,
                                      addShape:addShape,
                                      deleteShape:deleteShape,
                                      replaceShapes:replaceShapes,
                                      prefixes:prefixes,
                                      updatePrefixes:updatePrefixes,
                                      emit:emit
                                    }
                                  }>
                
                <SlideToggle duration={500}
                          
                          render={({ toggle, setCollapsibleElement, progress }) => (
                          <div> 
                              <Nav toggle={toggle}/>
                              <div className="row separator"> 
                                  <AssistantComp colapse={setCollapsibleElement} initialShapes={shapes}/>
                                  <EditorComp />
                                  
                              </div>
                          </div>                              
                  )}/>


            </ShapesContext.Provider>
          );
                       
           
  
    
}


export default App;
