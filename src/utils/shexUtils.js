let Codemirror = require('codemirror');
let Editor = require('../entities/editor.js');
let Shape = require('../entities/shexEntities/shape.js');

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

function deleteShape(shapes,shapeId) {
    var response = window.confirm('Are you sure?');
    if (response == true) {
        const newShapes = shapes.filter(shape => shape.id != shapeId);
        emit(newShapes);
        return newShapes;
    }
    return shapes;
}

function getShapeById(shapes,shapeId) {
    return shapes.filter(function( obj ) {
        return obj.id == shapeId
    })[0];
}

function getShapeByName(shapes,name) {
    for(let s in shapes){
        if(shapes[s].getType().getValue() == name){
            return shapes[s];
        }
    }
}


function getTripleById(shape,tripleId) {
    return shape.getTriples().filter(function( obj ) {
        return obj.id == tripleId
    })[0];
}



function emit(newShapes) {
    const yashe = Editor.getInstance().getYashe();
    Codemirror.signal(yashe,'humanEvent',newShapes);
}



module.exports ={
    addShape:addShape,
    deleteShape:deleteShape,
    getShapeById:getShapeById,
    getShapeByName:getShapeByName,
    getTripleById:getTripleById,
    emit:emit
}