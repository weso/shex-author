
import React, {useState} from 'react';
import { Collapse } from 'reactstrap';
import axios from 'axios';
import './App.css';

import EditorComp from './components/EditorComp';
import AssistantComp from './components/AssistantComp';
import VisualizeComp from  './components/VisualizeComp';

import Toolbar from './components/navComponents/Toolbar';
import Nav from './components/navComponents/Nav';

import shexUtils from './utils/shexUtils';

import Editor from './entities/editor';


import { Resizable } from "re-resizable";

import IdleTimer from 'react-idle-timer'

export const ShapesContext = React.createContext();

function App() {

    const [shapes,setShapes] = useState([]);
    const [svg,setSvg] = useState('');
    const [prefixes,setPrefixes] = useState([{key:'',val:'http://example.org/'}]);
    const [isAssistantOpen, setAssistantOpen] = useState(true);
    const [isVisualizeOpen, setVisualizeOpen] = useState(true);
    const [isLateralNavOpen, setLateralNavOpen] = useState(true);
    const [width,setWidth] = useState(800);
    const [valid,setValid] = useState('valid');
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


    const assistantToggle = () => setAssistantOpen(!isAssistantOpen); 
    const visualizeToggle = () => setVisualizeOpen(!isVisualizeOpen);
    const lateralNavToggle = () => setLateralNavOpen(!isLateralNavOpen);
    const colapseAll = () =>{
      setAssistantOpen(!isLateralNavOpen);
      setVisualizeOpen(!isLateralNavOpen);
      setLateralNavOpen(!isLateralNavOpen);
    }

    const [shake,setShake] = useState('un-shake');


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

    const replaceShapes = (newShapes,valid) =>{
      //This allows to render all the shapes when a property is updated.
      //Best Glitch Ever
      /*
      if(!valid){
        setValid('danger');
      }
      */
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

    const _onActive = function(e) {
      setShake('un-shake');
    }

    const _onIdle = function(e) {
      setShake('shake');
    }

    let idleTimer;


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
                  return;
          }
                
          setShapeClass('header')                                          
          setTripleClass('tripleHeader');
          setTripleBtns('tripleBtns');
          setTriplesContainer('triples');
          setShapeLabel('shapeNameLabel');
          setTripleLabel('tripleNameLabel');
          setAddBtns('addBtns');
        
    }


    return (
      <div>
        <IdleTimer
          ref={ref => { idleTimer = ref }}
          element={document}
          onActive={_onActive}
          onIdle={_onIdle}
          debounce={250}
          timeout={100 * 60 * 15} />
        {
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
                    visualize:visualize,
                    shapeClass:shapeClass,
                    tripleClass:tripleClass,
                    tripleBtns:tripleBtns,
                    shapeLabel:shapeLabel,
                    tripleLabel:tripleLabel,                 
                    triplesContainer:triplesContainer,
                    addBtns:addBtns,
                    valid:valid,
                    loading:loading,
                    setLoading:setLoading,
                    asist:asist,
                    setAsist:setAsist
                  }
                }>
                
                <Nav colapseAll={colapseAll}/>
              
                <div className="globalContainer">       
  
                  <div className={shake+" row comps"}>                     
                      <Collapse isOpen={isLateralNavOpen} className="col-xs-1 lateralNav">
                          <Toolbar  assistantToggle={assistantToggle} visualizeToggle={visualizeToggle}/>
                      </Collapse> 

                      <Collapse isOpen={isAssistantOpen} className='row assistCollapse'>
                        <Resizable  className="col row resizable"
                                    size={{ width: width }}                    
                                    onResizeStop={makeItResponsive}              
                                    enable={{right:true}}
                                    >
                    
                                  <div className='col containerAssist'>                                    
                                      
                        <input type="file" accept=".shex" name="file-1[]" id="file-1" class="inputfileBtn" data-multiple-caption="{count}'
    +'files selected" multiple /><label id="uploadBntLabel" for="file-1"><svg className="svgBtn" xmlns="http://www.w3.org/2000/svg" width="25" height="30" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/></svg></label> 
                     <AssistantComp assistantToggle={assistantToggle}/> 
                                  </div>
                        </Resizable>     
                      </Collapse>                         
                                                
                      <EditorComp/>                       
                  </div>
                </div>
                <Collapse isOpen={isVisualizeOpen} >
                  <VisualizeComp svg={svg}/>
                </Collapse>                                                
            </ShapesContext.Provider>
}

             </div>
          );
                       
           
  
    
}

/*
 
                                              
  
            
                      
*/


export default App;