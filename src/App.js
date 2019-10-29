import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

import EditorComp from './components/EditorComp';
import AssistantComp from './components/AssistantComp';

let Shape = require('./entities/shexEntities/shape.js');
let Triple = require('./entities/shexEntities/triple.js');
let PrefixedIri = require('./entities/shexEntities/types/concreteTypes/prefixedIri.js');
let IriRef = require('./entities/shexEntities/types/concreteTypes/iriRef.js');
let Literal = require('./entities/shexEntities/types/concreteTypes/kinds/literal.js');
let InlineShape = require('./entities/shexEntities/shexUtils/inlineShape.js');

let Prefix = require('./entities/shexEntities/shexUtils/prefix.js')

let Editor = require('./entities/editor.js');

let Codemirror = require('codemirror');

let initialShapes = [];

let shape0 = new Shape(0,new IriRef('shapeName','User'));
shape0.addTriple(new Triple(0,new IriRef('shapeName','name'),new Literal(),new InlineShape(),'?',false));
shape0.addTriple(new Triple(1,new PrefixedIri('tripleName')));
shape0.addTriple(new Triple(2));

let shape1 = new Shape(1,new IriRef('shapeName','Car'));

initialShapes.push(shape0);
initialShapes.push(shape1);

let shexUtils = require('./utils/shexUtils.js');

export const ShapesContext = React.createContext();


function App() {

    const [shapes,setShapes] = useState(initialShapes);
    const [prefixes,setPrefixes] = useState([{key:'',val:'http://example.org/'}]);


    const addShape = () =>{
      setShapes([...shapes,shexUtils.addShape(shapes)]);
    }

    const addTriple = (shapeId) =>{
      setShapes(shexUtils.addTriple(shapes,shapeId));
    }

    const deleteShape = (shapeId) =>{
      setShapes(shexUtils.deleteShape(shapes,shapeId));
    }

    const deleteTriple = (shapeId,tripleId) =>{
      setShapes(shexUtils.deleteTriple(shapes,shapeId,tripleId));
    }

    const setShapeType = (shapeId,event) =>{
      setShapes(shexUtils.setShapeType(shapes,shapeId,event));
    }

    const setTripleType = (shapeId,tripleId,event) =>{
      setShapes(shexUtils.setTripleType(shapes,shapeId,tripleId,event));
    }

    const setShapeTypeValue = (shapeId,value)=>{
      setShapes(shexUtils.setShapeTypeValue(shapes,shapeId,value));
    }

    const setTripleTypeValue = (shapeId,tripleId,type) =>{
      setShapes(shexUtils.setTripleTypeValue(shapes,shapeId,tripleId,type));
    }

    const setCardinality = (shapeId,tripleId,cardinality) =>{
      setShapes(shexUtils.setCardinality(shapes,shapeId,tripleId,cardinality));
    }

    const setTripleValueType = (shapeId,tripleId,value) =>{
      setShapes(shexUtils.setTripleValueType(shapes,shapeId,tripleId,value));
    }

    const setTripleValue = (shapeId,tripleId,value) =>{
      setShapes(shexUtils.setTripleValue(shapes,shapeId,tripleId,value));
    }

    const setShapePrefix = (shapeId,prefix)=>{
      setShapes(shexUtils.setShapePrefix(shapes,shapeId,prefix));
    }

    const setTriplePrefix = (shapeId,tripleId,prefix)=>{
      setShapes(shexUtils.setTriplePrefix(shapes,shapeId,tripleId,prefix));
    }

    const setValuePrefix = (shapeId,tripleId,prefix)=>{
      setShapes(shexUtils.setValuePrefix(shapes,shapeId,tripleId,prefix));
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
                                      shapes:shapes, 

                                      addShape:addShape,
                                      addTriple:addTriple,

                                      deleteShape:deleteShape,
                                      deleteTriple:deleteTriple,

                                      setShapeType:setShapeType,
                                      setTripleType:setTripleType,

                                      setShapeTypeValue:setShapeTypeValue,
                                      setTripleTypeValue:setTripleTypeValue,


                                      setTripleValueType:setTripleValueType,
                                      setTripleValue:setTripleValue,

                                      setCardinality:setCardinality,
                                      replaceShapes:replaceShapes,
                                      prefixes:prefixes,
                                      updatePrefixes:updatePrefixes,

                                      setShapePrefix:setShapePrefix,
                                      setTriplePrefix:setTriplePrefix,
                                      setValuePrefix:setValuePrefix
                                    }
                                  }>

                <div className="row separator"> 
                    <AssistantComp />
                    <EditorComp />
                    
                </div>
            </ShapesContext.Provider>
          );
                       
           
  
    
}


export default App;
