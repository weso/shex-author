import Codemirror from 'codemirror';
import Editor from '../entities/editor';
import Shape from '../entities/shexEntities/shape';
import {addPrefix} from './prefixUtils';

let shapesCount = 0;

function addShape (shapes){

    const id = shapes.length + shapesCount++;
    const newShape = new Shape(id);
    
    let newShapes = [];
    newShapes = Object.assign(newShapes, shapes);
    newShapes.push(newShape);
    checkPrefixes();
    emit(newShapes);
    return newShape;    
}

function deleteShape(shapes,shapeId,confirm) {
    if(!confirm){
        confirm = window.confirm('Are you sure?');
    }
    if (confirm == true) {
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
    if(yashe!=undefined){
        Codemirror.signal(yashe,'humanEvent',newShapes);
    }
}

function checkPrefixes(){
    const yashe = Editor.getInstance().getYashe();
    let isExampleDef = false;
    let isSchemaDef = false;
    let isXsdDef = false;
    Object.keys(yashe.getDefinedPrefixes()).map(p=>{
        if(p==''){
            isExampleDef=true;
        }
        if(p=='schema'){
            isSchemaDef = true;
        } 
        if(p=='xsd'){
            isXsdDef = true;
        }
    })

    if(!isExampleDef){
        addPrefix('');
    } 
    if(!isSchemaDef){
        addPrefix('schema');
    } 
    if(!isXsdDef){
        addPrefix('xsd');
    }
}


const shexUtils = {
    addShape:addShape,
    deleteShape:deleteShape,
    getShapeById:getShapeById,
    getShapeByName:getShapeByName,
    getTripleById:getTripleById,
    emit:emit
}

export default shexUtils;