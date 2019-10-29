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


export const ShapesContext = React.createContext();


function App() {

    const [shapes,setShapes] = useState(initialShapes);
    const [prefixes,setPrefixes] = useState([{key:'',val:'http://example.org/'}]);


    const addShape = () =>{

      const id = shapes.length;
      const newShape = new Shape(id);

      setShapes([...shapes,newShape]);

      let newShapes = shapes;
      newShapes.push(newShape)
      //Codemirror.signal(Editor.getInstance().getYashe(),'humanEvent',newShapes);
    }

    const addTriple = (shapeId) =>{

      const newShapes = shapes.filter(shape => {
          if(shape.id == shapeId){
            const id = shape.getTriplesCount();
            const newTriple = new Triple(id);
            shape.addTriple(newTriple);
          }
          return shape;
      });

      setShapes(newShapes);
      //Codemirror.signal(Editor.getInstance().getYashe(),'humanEvent',newShapes);
    }

    const deleteShape = (shapeId) =>{
      var response = window.confirm('Are you sure?');
      if (response == true) {
          const newShapes = shapes.filter(shape => shape.id != shapeId);
          setShapes(newShapes);
          //Codemirror.signal(Editor.getInstance().getYashe(),'humanEvent',newShapes);
      } 
    }

    const deleteTriple = (shapeId,tripleId) =>{

      const newShapes = shapes.filter(shape => {
          if(shape.id == shapeId){
            const newTriples = shape.triples.filter( triple => triple.id != tripleId);
            shape.setTriples(newTriples);
          }
          return shape;
      });
      setShapes(newShapes);
      //Codemirror.signal(Editor.getInstance().getYashe(),'humanEvent',newShapes);
  }

    const setShapeType = (shapeId,event) =>{
       const newShapes = shapes.filter(shape => {
          if(shape.id == shapeId){
            let type = event.target.value;
            shape.setType(type);
          }
          return shape;
        });

      setShapes(newShapes);
    }

    const setTripleType = (shapeId,tripleId,event) =>{
      const newShapes = shapes.filter(shape => {
        if(shape.id == shapeId){
          shape.triples.filter(triple =>{
              if(triple.id==tripleId){
                 let type = event.target.value;
                  triple.setType(type);                  
              }
              return triple             
          });
        }
        return shape;
      });

    setShapes(newShapes);
    //Codemirror.signal(Editor.getInstance().getYashe(),'humanEvent',newShapes);
  }

    const setShapeTypeValue = (shapeId,value)=>{
      const newShapes = shapes.filter(shape => {
              if(shape.id == shapeId){
                shape.type.setValue(value);
              }
              return shape;
          });

          setShapes(newShapes);
    }

    const setTripleTypeValue = (shapeId,tripleId,value) =>{
      const newShapes = shapes.filter(shape => {
        if(shape.id == shapeId){
          shape.triples.filter(triple =>{
            if(triple.id==tripleId){
                triple.type.setValue(value);            
            }
            return triple             
          });
        }
        return shape;
    });

    setShapes(newShapes);
    //Codemirror.signal(Editor.getInstance().getYashe(),'humanEvent',newShapes);
    }

    const setCardinality = (shapeId,tripleId,cardinality) =>{
      const newShapes = shapes.filter(shape => {
        if(shape.id == shapeId){
          shape.triples.filter(triple =>{
            if(triple.id==tripleId){
                triple.setCardinality(cardinality);            
            }
            return triple             
          });
        }
        return shape;
    });

    setShapes(newShapes);
    //Codemirror.signal(Editor.getInstance().getYashe(),'humanEvent',newShapes);
    }

    const setTripleValue = (shapeId,tripleId,value) =>{
      const newShapes = shapes.filter(shape => {
        if(shape.id == shapeId){
          shape.triples.filter(triple =>{
            if(triple.id==tripleId){
                triple.setValue(value);            
            }
            return triple             
          });
        }
        return shape;
    });

    setShapes(newShapes);
    //Codemirror.signal(Editor.getInstance().getYashe(),'humanEvent',newShapes);
    }

    const setShapePrefix = (shapeId,prefix)=>{
      let pre = getPrefix(prefix);
      const newShapes = shapes.filter(shape => {
              if(shape.id == shapeId){
                shape.type.setPrefix(pre);
              }
              return shape;
          });

          setShapes(newShapes);
    }

     const setTriplePrefix = (shapeId,tripleId,prefix)=>{
        let pre = getPrefix(prefix);
        const newShapes = shapes.filter(shape => {
          if(shape.id == shapeId){
            shape.triples.filter(triple =>{
              if(triple.id==tripleId){
                  triple.type.setPrefix(pre);           
               }
             return triple             
            });
          }
          return shape;
        });

        setShapes(newShapes);
    }

    const getPrefix = (prefix)=>{
      let defined = Editor.getInstance().getYashe().getDefinedPrefixes();
      for(let def in defined){
          if(defined[def] == prefix){
            return new Prefix(def,defined[def]);
          }
      }
      return null;
    }

    const replaceShapes = (newShapes) =>{
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
                                      setCardinality:setCardinality,
                                      setTripleValue:setTripleValue,
                                      replaceShapes:replaceShapes,
                                      prefixes:prefixes,
                                      updatePrefixes:updatePrefixes,
                                      setShapePrefix:setShapePrefix,
                                      setTriplePrefix:setTriplePrefix
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
