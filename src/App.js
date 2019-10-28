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


export const ShapesContext = React.createContext()


function App() {

    const [shapes,setShapes] = useState(initialShapes);


    const addShape = () =>{

      console.log(shapes)
      const id = shapes.length;
      const newShape = new Shape(id);

      setShapes([...shapes,newShape]);

      //let newShapes = shapes;
      //newShapes.push(newShape)
    }

    const deleteShape = (shapeId) =>{
      var response = window.confirm('Are you sure?');
      if (response == true) {
          const newShapes = shapes.filter(shape => shape.id != shapeId);
          setShapes(newShapes);
          //Codemirror.signal(Editor.getInstance().getYashe(),'humanEvent',newShapes);
      } 
    }

    const changeShapeType = (shapeId,event) =>{
       const newShapes = shapes.filter(shape => {
          if(shape.id == shapeId){
            let type = event.target.value;
            shape.setType(type);
          }
          return shape;
        });

      setShapes(newShapes);
    }

    return (<ShapesContext.Provider value={
                                    {
                                      shapes:shapes,
                                      addShape:addShape,
                                      deleteShape:deleteShape,
                                      changeShapeType:changeShapeType
                                    }
                                  }>
                <div className="row separator"> 
                    <AssistantComp />
                    
                </div>
            </ShapesContext.Provider>);
                       
           
  
    
}


export default App;
