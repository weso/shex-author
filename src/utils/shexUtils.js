import Codemirror from 'codemirror';
import Editor from '../entities/editor';
import Shape from '../entities/shexEntities/shape';
import Facet from '../entities/shexEntities/others/facet';
import {addPrefix} from './prefixUtils';
import ValueSetValue from '../entities/shexEntities/others/valueSetValue';

let shapesCount = 0;
let facetsCount = 0;
let valuesCount = 0;

function addShape(shapes,width){

    const id = shapes.length + shapesCount++;
    const newShape = new Shape(id);

    let newShapes = [];
    newShapes = Object.assign(newShapes, shapes);
    newShapes.push(newShape);
    checkPrefixes();
    emit(newShapes,width);
    return newShape;    
}

function deleteShape(shapes,shapeId,confirm,width) {
    if(!confirm){
        confirm = window.confirm('Are you sure?');
    }
    if (confirm == true) {
        const newShapes = shapes.filter(shape => shape.id != shapeId);
        emit(newShapes,width);
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
    return shapes.filter(s=>{
        return s.type.toString() == name;
    })[0];
}


function getTripleById(shape,tripleId) {
    return shape.triples.filter(function( obj ) {
        return obj.id == tripleId
    })[0];
}


function emit(newShapes,width) {
    const yashe = Editor.getYashe();
    if(yashe!=undefined){
        Codemirror.signal(yashe,'humanEvent',newShapes,width);
        checkPrefixes();
    }
}

function checkPrefixes(){
    if(!hasPrefix('')) addPrefix('');
    if(!hasPrefix('schema')) addPrefix('schema');
    if(!hasPrefix('xsd')) addPrefix('xsd');
}

function hasPrefix(prefix){
    const defs = Editor.getYashe().getDefinedPrefixes();
    return Object.keys(defs).filter(p=>{
        return p==prefix;
    }).length > 0 ? true:false;
}


function addValueSetValue(values){
    const id = values.length + valuesCount++;
    return new ValueSetValue(id);    
}


function addFacet(facets){
    const id = facets.length + facetsCount++;
    return new Facet(id);    
}



const shexUtils = {
    addShape:addShape,
    deleteShape:deleteShape,
    getShapeById:getShapeById,
    getShapeByName:getShapeByName,
    getTripleById:getTripleById,
    emit:emit,
    addFacet:addFacet,
    addValueSetValue:addValueSetValue
}

export default shexUtils;