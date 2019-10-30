import React, {useState} from 'react';
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
                <Nav />
                <div className="row separator"> 
                    <AssistantComp initialShapes={shapes}/>
                    <EditorComp />
                    
                </div>
            </ShapesContext.Provider>
          );
                       
           
  
    
}


export default App;
