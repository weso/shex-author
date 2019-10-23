
 import * as    ShapeStore  from  '../entities/shapeStore.js';

 import * as    tokenUtils  from  './tokenUtils.js';
 import * as    drawUtils  from  './drawUtils.js';
 import * as    prefixUtils  from  './prefixUtils.js';
 import * as    typeUtils  from  './typeUtils.js';
 import * as    listenerUtils  from  './listenerUtils.js';
 import * as    inlineUtils  from  './inlineUtils.js';
 import * as    cardinalityUtils  from  './cardinalityUtils.js';

 import $ from 'jquery';

function updateAssistant(){

    let tokens = tokenUtils.getTokens();
    let defShapes = tokenUtils.getDefinedShapes(tokens);
    let shapeStore = ShapeStore.getInstance();
    let shapes = tokenUtils.getShapes(defShapes);
    
    shapeStore.setShapes(shapes);
    shapeStore.setShapesCount(shapes.length)
    tokenUtils.updateInlines();
    $('#addShapeButton').remove();
    //shapeCount = ShapeStore.getInstance().getShapes().length;
    drawAssistant();
}

function drawAssistant() {
    drawUtils.drawAssistant();
    listenerUtils.updateListeners();
    prefixUtils.updatePrefixes();
    inlineUtils.updateInlineShapes();
    typeUtils.updateTypes();
    cardinalityUtils.updateCardinalities();
    drawUtils.drawEditor();
}

export default updateAssistant;