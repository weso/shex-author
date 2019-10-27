import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import { Provider } from 'react-redux';

import EditorComp from './components/EditorComp';
import AssistantComp from './components/AssistantComp';
import store from './redux/store';

let Shape = require('./entities/shexEntities/shape.js');
let Triple = require('./entities/shexEntities/triple.js');
let PrefixedIri = require('./entities/shexEntities/types/concreteTypes/prefixedIri.js');
let IriRef = require('./entities/shexEntities/types/concreteTypes/iriRef.js');
let Literal = require('./entities/shexEntities/types/concreteTypes/kinds/literal.js');
let InlineShape = require('./entities/shexEntities/shexUtils/inlineShape.js');
let ShapeStore = require('./entities/shapeStore.js');

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

        this.setState({ 
            shapes: [...this.state.shapes,newShape]
        });


     // Codemirror.signal(Editor.getInstance().getYashe(),'humanEvent',this.state.shapes);

  }


    deleteShape = (shapeId) =>{
        var response = window.confirm('Are you sure?');
        if (response == true) {
            const newShapes = this.state.shapes.filter(shape => shape.id != shapeId);
            this.setState({shapes:newShapes});
        }
        
       // Codemirror.signal(Editor.getInstance().getYashe(),'humanEvent',this.state.shapes);
       
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

    }

    replaceShapes = (newShapes) =>{
      this.setState({shapes:newShapes});
    }



  imprime(){

    //console.log(this.shapes);
  }
  
  render(){

      return <div className="row separator"> 
                  <AssistantComp shapes={this.state.shapes}
                                 addShape={this.addShape}
                                 addTriple={this.addTriple}
                                 deleteShape={this.deleteShape}
                                 deleteTriple={this.deleteTriple}
                               />
                  
                  <EditorComp shapes={this.state.shapes} 
                              replaceShapes={this.replaceShapes}/>
                  
              </div>
             
           
  }
    

}


export default App;
