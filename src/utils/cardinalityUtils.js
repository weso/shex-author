import * as  shapeUtils from './shapeUtils.js';
import $ from 'jquery';

function updateCardinalities() {

    let selectors = $('.tripleCardinality');
    let index = 0;
    selectors.each(function(obj) {

        let prefix = shapeUtils.getPrefix($(this));
        let triple = shapeUtils.getTriple($(this));

        let cardinality = triple.getCardinality();
        let filter = '[value="'+cardinality+'"]';
        $(selectors[obj]).find('option').filter(filter).prop('selected', true);

    });
}


export { updateCardinalities };