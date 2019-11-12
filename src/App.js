import React, {useState} from 'react';
import axios from 'axios';
import SlideToggle from "react-slide-toggle";
import logo from './logo.svg';
import './App.css';

import EditorComp from './components/EditorComp';
import AssistantComp from './components/AssistantComp';
import VisualizeComp from  './components/VisualizeComp';

import Nav from './components/navComponents/Nav';

import shexUtils from './utils/shexUtils';

import Editor from './entities/editor';


export const ShapesContext = React.createContext();

function App() {

    const [shapes,setShapes] = useState([]);
    const [svg,setSvg] = useState('');
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
      visualize();
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
                                      changeThemeStyle:changeThemeStyle,
                                      visualize:visualize
                                    }
                                  }>
                
                <SlideToggle duration={500}
                             render={({ toggle, setCollapsibleElement, progress }) => (
                              <div> 
                                  <Nav toggle={toggle}/>
                                  <div className="row separator" style={style}> 
                                      <AssistantComp colapse={setCollapsibleElement} initialShapes={shapes} />
                                      <EditorComp />
                                       
                                  </div>

                                  <VisualizeComp colapse={setCollapsibleElement} svg={svg}/>
                           </div>
                                                            
                  )}/>


            </ShapesContext.Provider>
          );
                       
           
  
    
}


export default App;
