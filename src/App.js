import React, {useState, useEffect, useRef} from 'react';
import logo from './logo.svg';
import './App.css';

import Editor from './components/Editor';
import Assistant from './components/Assistant';

let Shape = require('./entities/shexEntities/shape.js');
let Triple = require('./entities/shexEntities/triple.js');
let PrefixedIri = require('./entities/shexEntities/types/concreteTypes/prefixedIri.js');
let ShapeStore = require('./entities/shapeStore.js')



let shape0 = new Shape(0);
shape0.addTriple(new Triple(0));
shape0.addTriple(new Triple(1,new PrefixedIri('tripleName')));
shape0.addTriple(new Triple(2));

ShapeStore.getInstance().addShape(shape0);

function App() {

    return (
      
      <div className="row separator"> 
        <Assistant shapes={ShapeStore.getInstance().getShapes()}/>
        <Editor/>
      </div>

    );



}


export default App;
