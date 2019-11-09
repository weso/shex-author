import React, {useState} from 'react';
import SlideToggle from "react-slide-toggle";
import logo from './logo.svg';
import './App.css';

import EditorComp from './components/EditorComp';
import AssistantComp from './components/AssistantComp';
import Nav from './components/navComponents/Nav';

import shexUtils from './utils/shexUtils';


export const ShapesContext = React.createContext();

function App() {

    const [shapes,setShapes] = useState([]);
    const [prefixes,setPrefixes] = useState([{key:'',val:'http://example.org/'}]);

     const darkStyle = {
        background: '#2B2B2B',
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
    }

    const deleteShape = (shapeId) =>{
      setShapes(shexUtils.deleteShape(shapes,shapeId,false));
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
    
    const changeThemeStyle = () =>{
      if(theme=='light'){//I don't know why this doesn't work with style state
        setStyle(darkStyle);
        theme='dark';
      }else{
        theme='light';
        setStyle(lightStyle);
      }
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
                                      emit:emit,
                                      currentStyle:style,
                                      changeThemeStyle:changeThemeStyle
                                    }
                                  }>
                
                <SlideToggle duration={500}
                             collapsed
                             render={({ toggle, setCollapsibleElement, progress }) => (
                              <div> 
                                  <Nav toggle={toggle}/>
                                  <div className="row separator" style={style}> 
                                      <AssistantComp colapse={setCollapsibleElement} initialShapes={shapes} />
                                      <EditorComp />
                                      
                                  </div>
                              </div>                              
                  )}/>


            </ShapesContext.Provider>
          );
                       
           
  
    
}


export default App;
