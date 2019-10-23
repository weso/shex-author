import * as Prefix from '../entities/shexEntities/shexUtils/prefix.js';
import * as ShapeStore from '../entities/shapeStore.js';


function getPrefix(selector){
    let prefixName = selector.find('option').filter(":selected").text();
    let prefixValue = selector.find('option').filter(":selected").val();
    
    return new Prefix(prefixName,prefixValue);
}

function getShape(shapeId){
    return getShapeById(shapeId);
}

function deleteShape(node) {
    let shapes = ShapeStore.getInstance().getShapes();
    let shapeId = getIdGrandParent(node);
    return shapes.filter(function( obj ) {
            return obj.id !== shapeId
    });
}


function getIdParent(node) {
    return node.parent()[0].id.split('-')[1];
}

function getIdGrandParent(node) {
    return node.parent().parent()[0].id.split('-')[1];
}

function getIdBigGrandParent(node) {
    return node.parent().parent().parent()[0].id.split('-')[1];
}

function removeNode(node) {
    node.remove();
}

function removeParent(node) {
    node.parent().remove();
}

function removeGrandParent(node) {
    node.parent().parent().remove();
}


function getTriple(tripleElement){
    let shapeId = getIdBigGrandParent(tripleElement);
    let tripleId = getIdGrandParent(tripleElement);
    let shape = getShape(shapeId);

    return getTripleById(shape,tripleId);
}



function getTripleByValue(valueElement) {
    let ids = valueElement.parent().parent()[0].id;
    let shapeId = ids.split('-')[0];
    let tripleId = ids.split('-')[1];
    let shape = getShape(shapeId);

    return getTripleById(shape,tripleId);
}


function getShapeById(shapeId) {
    let shapes = ShapeStore.getInstance().getShapes();
    return shapes.filter(function( obj ) {
        return obj.id === shapeId
    })[0];
}


function getTripleById(shape,tripleId) {
    return shape.getTriples().filter(function( obj ) {
        return obj.id === tripleId
    })[0];
}


/*
function getValue(shapes,valueElement) {
    let valueId = getIdGrandParent(valueElement);
    let triple = getTriple(shapes,valueElement);

    let value =  triple.getValues().filter(function( obj ) {
        return obj.id === valueId
    })[0];

    return value;

}

*/


export { getPrefix  , getShape , getTriple , deleteShape ,
 getIdGrandParent , getIdParent , removeParent , removeGrandParent , removeNode , getTripleByValue , getShapeById , getTripleById }
