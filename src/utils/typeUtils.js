import * as  shapeUtils from './shapeUtils.js';
import * as  ShapeStore from '../entities/shapeStore.js';
import $ from 'jquery';

function updateTypes() {
    
    let shapes = ShapeStore.getInstance().getShapes();

    let selectors = $('.shapeType');
    let index = 0;
    selectors.each(function(obj) {

        let shapeId = shapeUtils.getIdGrandParent($(this));
        let shape = shapeUtils.getShape(shapeId);

        let typeName = shape.getType().getTypeName();
        let filter = '[value="'+typeName+'"]';
        $(selectors[obj]).find('option').filter(filter).prop('selected', true);

    });

    selectors = $('.tripleType');
    index = 0;
    selectors.each(function(obj) {

        let prefix = shapeUtils.getPrefix($(this));
        let triple = shapeUtils.getTriple($(this));


        let typeName = triple.getType().getTypeName();
        let filter = '[value="'+typeName+'"]';
        $(selectors[obj]).find('option').filter(filter).prop('selected', true);

    });


    selectors = $('.valueType');
    index = 0;
    selectors.each(function(obj) {

        let prefix = shapeUtils.getPrefix($(this));
        let triple = shapeUtils.getTripleByValue($(this));


        let typeName = triple.getValue().getTypeName();
        let filter = '[value="'+typeName+'"]';
        $(selectors[obj]).find('option').filter(filter).prop('selected', true);

    });
}



export { updateTypes } ;