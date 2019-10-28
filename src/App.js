import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import EditorComp from './components/EditorComp';
import AssistantComp from './components/AssistantComp';

let Shape = require('./entities/shexEntities/shape.js');
let Triple = require('./entities/shexEntities/triple.js');

let Editor = require('./entities/editor.js');

let Codemirror = require('codemirror');


class App extends Component {


  constructor(props){
    super(props)
 
    this.state = {
      shapes:this.props.shapes
    }
  }

  addShape = () =>{

      const id = this.state.shapes.length;
      const newShape = new Shape(id);
      let newShapes = this.state.shapes;
      newShapes.push(newShape);
      
      this.setState({ 
          shapes: newShapes
      });

      Codemirror.signal(Editor.getInstance().getYashe(),'humanEvent',newShapes);

  }

  changeShapeType = (shapeId,event) =>{

      const newShapes = this.state.shapes.filter(shape => {

        if(shape.id == shapeId){
          let type = event.target.value;
          shape.setType(type);
        }
        return shape;
    });

    this.setState({shapes:newShapes});
    Codemirror.signal(Editor.getInstance().getYashe(),'humanEvent',newShapes);
  }


  deleteShape = (shapeId) =>{
    var response = window.confirm('Are you sure?');
    if (response == true) {
        const newShapes = this.state.shapes.filter(shape => shape.id != shapeId);
        this.setState({shapes:newShapes});
        Codemirror.signal(Editor.getInstance().getYashe(),'humanEvent',newShapes);
    }
        
  }
 
    
  addTriple = (shapeId) =>{

    const newShapes = this.state.shapes.filter(shape => {

        if(shape.id == shapeId){
          const id = shape.getTriplesCount();
          const newTriple = new Triple(id);
          shape.addTriple(newTriple);
        }
        return shape;
    });

    this.setState({shapes:newShapes});
    Codemirror.signal(Editor.getInstance().getYashe(),'humanEvent',newShapes);

  }


  changeTripleType = (shapeId,tripleId,event) =>{

     const newShapes = this.state.shapes.filter(shape => {
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

    this.setState({shapes:newShapes});
    Codemirror.signal(Editor.getInstance().getYashe(),'humanEvent',newShapes);

  }


  deleteTriple = (shapeId,tripleId) =>{
  
      const newShapes = this.state.shapes.filter(shape => {

          if(shape.id == shapeId){
            const newTriples = shape.triples.filter( triple => triple.id != tripleId);
            shape.setTriples(newTriples);
          }
          return shape;
      });

      this.setState({shapes:newShapes})
      Codemirror.signal(Editor.getInstance().getYashe(),'humanEvent',newShapes);

  }

  replaceShapes = (newShapes) =>{
    this.setState({shapes:newShapes});
  }


  changeShapeValue = (shapeId,value) =>{


    const newShapes = this.state.shapes.filter(shape => {

        if(shape.id == shapeId){
          shape.type.setValue(value);
        }
        return shape;
    });

    this.setState({shapes:newShapes})
    Codemirror.signal(Editor.getInstance().getYashe(),'humanEvent',newShapes);

  }

   changeTripleValue = (shapeId,tripleId,value) =>{

    const newShapes = this.state.shapes.filter(shape => {

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

    this.setState({shapes:newShapes})
    Codemirror.signal(Editor.getInstance().getYashe(),'humanEvent',newShapes);

  }



  render(){

      return <div className="row separator"> 
                  <AssistantComp shapes={this.state.shapes}
                          addShape={this.addShape}
                          addTriple={this.addTriple}
                          deleteShape={this.deleteShape}
                          deleteTriple={this.deleteTriple}
                          changeShapeType={this.changeShapeType}
                          changeShapeValue={this.changeShapeValue}
                          changeTripleType={this.changeTripleType}
                          changeTripleValue={this.changeTripleValue}
                    />
            
                    <EditorComp shapes={this.state.shapes} 
                                replaceShapes={this.replaceShapes}/>
          
            </div>
                       
           
  }
    
}


export default App;
