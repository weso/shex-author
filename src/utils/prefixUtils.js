import * as  ShapeStore from '../entities/shapeStore.js';
import * as  Editor from '../entities/editor.js';

import * as  shapeUtils from './shapeUtils.js';

import $ from 'jquery';


function orderSelect(selector,index) {
    let options = selector.children();
    let arr = options.map(function(_, o) { 
        return { t: $(o).text(), v: o.value }; 
        }).get();

    arr.sort(function(o1, o2) {
    let t1 = o1.t.toLowerCase(), t2 = o2.t.toLowerCase();

    return t1 > t2 ? 1 : t1 < t2 ? -1 : 0;
    });
    
    options.each(function(i, o) {
        o.value = arr[i].v;
        $(o).text(arr[i].t);
    });

}

function updateShapePrefixes() {

    let shapes = ShapeStore.getInstance().getShapes();
    let yashe = Editor.getInstance().getYashe();

    let selectors = $('.prefixShape');
    let prefixes = yashe.getDefinedPrefixes();
    let index = 0;
    selectors.each(function(obj) {

        let prefix = shapeUtils.getPrefix($(this));
        let shapeId = shapeUtils.getIdGrandParent($(this));
        let shape = shapeUtils.getShape(shapeId);
        let select = $(selectors[obj]).empty();
        //Default prefix
        select.prepend(
                    $( '<option>' ).text( '' ).attr( 'value', 'http://example.org/' )); 

        for(let pre in prefixes){
            if(pre!=''){
                select.prepend(
                    $( '<option>' ).text( pre ).attr( 'value', prefixes[pre] ));
            }
        }

        orderSelect($(this),index++);
  

        let prefixVal = shape.getType().getPrefix().getPrefixValue();
        let filter = '[value="'+prefixVal+'"]';
        select.find('option').filter(filter).prop('selected', true);

    });
}

function updateTriplePrefixes() {

    let shapes = ShapeStore.getInstance().getShapes();
    let yashe = Editor.getInstance().getYashe();

    let selectors = $('.prefixTriple');
    let prefixes = yashe.getDefinedPrefixes();
    let index = 0;
    selectors.each(function(obj) {


        let prefix = shapeUtils.getPrefix($(this));
        let triple = shapeUtils.getTriple($(this));

        let select = $(selectors[obj]).empty();
        //Default prefix
        select.prepend(
                    $( '<option>' ).text( '' ).attr( 'value', 'http://example.org/' )); 

        for(let pre in prefixes){
            if(pre!=''){
                select.prepend(
                    $( '<option>' ).text( pre ).attr( 'value', prefixes[pre] ));
            }
        }

        orderSelect($(this),index++);
  
        let prefixVal = triple.getType().getPrefix().getPrefixValue();
        let filter = '[value="'+prefixVal+'"]';
        $(selectors[obj]).find('option').filter(filter).prop('selected', true);

    });
}


function updateValuesPrefixes() {

    let shapes = ShapeStore.getInstance().getShapes();
    let yashe = Editor.getInstance().getYashe();

    let selectors = $('.prefixValue');
    let prefixes = yashe.getDefinedPrefixes();
    let index = 0;
    selectors.each(function(obj) {


        let prefix = shapeUtils.getPrefix($(this));
        let triple = shapeUtils.getTripleByValue($(this));

        let select = $(selectors[obj]).empty();
        //Default prefix
        select.prepend(
                    $( '<option>' ).text( '' ).attr( 'value', 'http://example.org/' )); 

        for(let pre in prefixes){
            if(pre!=''){
                select.prepend(
                    $( '<option>' ).text( pre ).attr( 'value', prefixes[pre] ));
            }
        }

        orderSelect($(this),index++);
  
        let prefixVal = triple.getValue().getPrefix().getPrefixValue();
        let filter = '[value="'+prefixVal+'"]';
        $(selectors[obj]).find('option').filter(filter).prop('selected', true);

    });
}




function updatePrefixes(){
    updateShapePrefixes();
    updateTriplePrefixes();
    updateValuesPrefixes();
}




export { updatePrefixes,orderSelect}
