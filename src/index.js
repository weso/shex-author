import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Nav from './components/Nav'
import * as serviceWorker from './serviceWorker';



let Shape = require('./entities/shexEntities/shape.js');
let Triple = require('./entities/shexEntities/triple.js');
let PrefixedIri = require('./entities/shexEntities/types/concreteTypes/prefixedIri.js');
let IriRef = require('./entities/shexEntities/types/concreteTypes/iriRef.js');
let Literal = require('./entities/shexEntities/types/concreteTypes/kinds/literal.js');
let InlineShape = require('./entities/shexEntities/shexUtils/inlineShape.js');
let ShapeStore = require('./entities/shapeStore.js');


let shapes = [];

let shape0 = new Shape(0,new IriRef('shapeName','User'));
shape0.addTriple(new Triple(0,new IriRef('shapeName','name'),new Literal(),new InlineShape(),'?',false));
shape0.addTriple(new Triple(1,new PrefixedIri('tripleName')));
shape0.addTriple(new Triple(2));


shapes.push(shape0);
/*
let shape1 = new Shape(1,new IriRef('shapeName','User'));
shape1.addTriple(new Triple(2));

let shape2 = new Shape(2,new IriRef('shapeName','User'));
shape2.addTriple(new Triple(0,new IriRef('shapeName','name'),new Literal(),new InlineShape(),'?',false));
shape2.addTriple(new Triple(1,new PrefixedIri('tripleName')));
shape2.addTriple(new Triple(2));


ShapeStore.getInstance().addShape(shape1);
ShapeStore.getInstance().addShape(shape2);

*/

ShapeStore.getInstance().addShape(shape0);


ReactDOM.render(<Nav />, document.getElementById('nav'));
ReactDOM.render(<App shapes={shapes}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

