let Codemirror = require('codemirror');

let Editor = require('../entities/editor.js');

let Shape = require('../entities/shexEntities/shape.js');
let Triple = require('../entities/shexEntities/triple.js');
let Prefix = require('../entities/shexEntities/shexUtils/prefix.js');

let shapesCount = 0;


function addShape (shapes){

    const id = shapes.length + shapesCount++;
    const newShape = new Shape(id);
    
    let newShapes = [];
    newShapes = Object.assign(newShapes, shapes);
    newShapes.push(newShape)
    emit(newShapes);
    return newShape;
}

function addTriple(shapes,shapeId){
    const newShapes = shapes.filter(shape => {
        if(shape.id == shapeId){
            const id = shape.getTriplesCount();
            const newTriple = new Triple(id);
            shape.addTriple(newTriple);
        }
        return shape;
    });
    emit(newShapes);
    return newShapes;
}

function deleteShape(shapes,shapeId) {
    var response = window.confirm('Are you sure?');
    if (response == true) {
        const newShapes = shapes.filter(shape => shape.id != shapeId);
        emit(newShapes);
        return newShapes;
    }
    return shapes;
}

function deleteTriple(shapes,shapeId,tripleId) {
    const newShapes = shapes.filter(shape => {
        if(shape.id == shapeId){
            const newTriples = shape.triples.filter( triple => triple.id != tripleId);
            shape.setTriples(newTriples);
        }
        return shape;
    });
    emit(newShapes);
    return newShapes;
}


function setShapeType(shapes,shapeId,event) {
    const newShapes = shapes.filter(shape => {
        if(shape.id == shapeId){
            let type = event.target.value;
            shape.setType(type);
        }
          return shape;
    });
    emit(newShapes);
    return newShapes;
}


function setTripleType(shapes,shapeId,tripleId,event) {
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
    emit(newShapes);
    return newShapes;
}

function setShapeTypeValue(shapes,shapeId,value) {
   const newShapes = shapes.filter(shape => {
        if(shape.id == shapeId){
            shape.type.setValue(value);
        }
        return shape;
    });
    emit(newShapes);
    return newShapes;
}


function setTripleTypeValue(shapes,shapeId,tripleId,type) {
    const newShapes = shapes.filter(shape => {
        if(shape.id == shapeId){
          shape.triples.filter(triple =>{
            if(triple.id==tripleId){
                triple.type.setValue(type);            
            }
            return triple             
          });
        }
        return shape;
    });
    emit(newShapes);
    return newShapes;
}

function setCardinality(shapes,shapeId,tripleId,cardinality) {
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
    emit(newShapes);
    return newShapes;
}

function setTripleValueType(shapes,shapeId,tripleId,value) {
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
    emit(newShapes);
    return newShapes;
}

function setTripleValue(shapes,shapeId,tripleId,value) {
    const newShapes = shapes.filter(shape => {
        if(shape.id == shapeId){
          shape.triples.filter(triple =>{
            if(triple.id==tripleId){
                triple.value.setValue(value);            
            }
            return triple             
          });
        }
        return shape;
    });
    emit(newShapes);
    return newShapes;
}

function setShapePrefix(shapes,shapeId,prefix) {
    let pre = getPrefix(prefix);
    const newShapes = shapes.filter(shape => {
        if(shape.id == shapeId){
            shape.type.setPrefix(pre);
        }
        return shape;
    });
    emit(newShapes);
    return newShapes;
}

function setTriplePrefix(shapes,shapeId,tripleId,prefix) {
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
    emit(newShapes);
    return newShapes;
}

function setValuePrefix(shapes,shapeId,tripleId,prefix) {
    let pre = getPrefix(prefix);
    const newShapes = shapes.filter(shape => {
        if(shape.id == shapeId){
        shape.triples.filter(triple =>{
            if(triple.id==tripleId){
                triple.value.setPrefix(pre);           
            }
            return triple             
        });
        }
        return shape;
    });
    emit(newShapes);
    return newShapes;
}

function getPrefix(prefix){
      let defined = Editor.getInstance().getYashe().getDefinedPrefixes();
      for(let def in defined){
          if(defined[def] == prefix){
            return new Prefix(def,defined[def]);
          }
      }
      return null;
}



function emit(newShapes) {
    const yashe = Editor.getInstance().getYashe();
    Codemirror.signal(yashe,'humanEvent',newShapes);
}

module.exports ={
    addShape:addShape,
    addTriple:addTriple,
    deleteShape:deleteShape,
    deleteTriple:deleteTriple,
    setShapeType:setShapeType,
    setTripleType:setTripleType,
    setShapeTypeValue:setShapeTypeValue,
    setTripleTypeValue:setTripleTypeValue,
    setCardinality:setCardinality,
    setTripleValueType:setTripleValueType,
    setTripleValue:setTripleValue,
    setShapePrefix:setShapePrefix,
    setTriplePrefix:setTriplePrefix,
    setValuePrefix:setValuePrefix
}