 import * as  ShapeStore  from   '../entities/shapeStore.js';
 import * as  prefixUtils  from   './prefixUtils.js';
 import * as  shapeUtils  from   './shapeUtils.js';
 import $ from 'jquery';

function updateInlineShapes() {
    
    let shapes = ShapeStore.getInstance().getShapes();

    let selectors = $('.valueInlineShape');
    let index = 0;
    selectors.each(function(obj) {

        let triple = shapeUtils.getTripleByValue($(this));
        let select = $(selectors[obj]).empty();
        //Default blank shape
        select.prepend(
                    $( '<option>' ).text( '' ).attr( 'value', '' )); 

        for(let shape in shapes){
            let shapeRef = '@'+shapes[shape].getType().toString();
            let id = shapes[shape].getId();
            select.prepend(
                $( '<option>' ).text( shapeRef ).attr( 'value', id ));
        
        }

        prefixUtils.orderSelect($(this),index++);
  
        let shapeId = '';
        let inlineShape = triple.getInlineShape();
        //if(inlineShape.getShape() && isInShapes(inlineShape.getShape())){
        if(inlineShape.getShape()){
            shapeId = triple.getInlineShape().getShape().getId();
        }
    
        let filter = '[value="'+shapeId+'"]';
        select.find('option').filter(filter).prop('selected', true);


    });
}

/*
function isInShapes(shape) {
    let shapes = ShapeStore.getInstance().getShapes();
    for(let s in shapes){
        if(shapes[s] == shape){
            return true;
        }
    }
    return false;
}
*/


export { updateInlineShapes };