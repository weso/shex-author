import * as $ from  'jquery';

function getShapeHtml(shape){

    let shapeId = shape.getId();
    let type = shape.getType().getHtml();
    let triples = shape.getTriples();

    let shapeRow = $(SHAPE_HEADER)
                    .append(SHAPE_LABEL)
                    .append(SHAPES_TYPE)
                    .append(type)
                    .append(BTN_DELETE_SHAPE);


    let triplesContainer = $(TRIPLES_CONTAINER)
                            .attr('id','triplesContainer-'+shapeId); 


    triples.forEach(triple => {
        triplesContainer
            .append(
                getTripleHtml(triple,shapeId)
            );
    })

    let shapesContainer = $(SHAPE_CONTAINER)
                          .attr('id','shape-'+shapeId)
                          .append(shapeRow)
                          .append(BTN_ADD_TRIPLE)
                          .append(triplesContainer)


    //console.log(shapesContainer.html())
    return shapesContainer;

}         


function getTripleHtml(triple,shapeId){

    let tripleId = triple.getId();
    let type = triple.getType().getHtml();
    let value = triple.getValue().getHtml();


    
    let display;
    if(triple.isShowValues()){
        display = true;
    }else{
        display = false;
    }

    let check = $(CHECK);
    check.prop('checked',display);


    let divCheck = $(DIV_CHECK)
                    .append($(LABEL)
                            .text('Values')
                            .append(check));



    let tripleRow = $(TRIPLE_HEADER)
                    .append(TRIPLE_LABEL)
                    .append(TRIPLE_TYPE)
                    .append(type)
                    .append(CARDINALITY_BASE)
                    .append(DELETE_TRIPLE)
                    .append(divCheck);
    
    

    

 
    let triplesContainer =  $(TRIPLE_BASE)
                            .attr('id','triple-'+tripleId)
                            .append(tripleRow)
                            .append(getValueHtml(value,shapeId,tripleId,display));


     return triplesContainer;
}


/**
Igual se puede dejar mejor es que me lié */
function getValueHtml(value,shapeId,tripleId,show) {


    let valuesRow = $(ROW)
                    .append(VALUE_LABEL) 
                    .append(VALUE_TYPE)
                    .append(value)
                    .append(VALUE_SHAPE);
                    //.append(DELETE_VALUE_BTN);


    let valueBase =$(VALUE_BASE)
                    .attr('id',shapeId+'-'+tripleId)
                    .append(valuesRow);

    let valuesContainer = $(VALUES_CONTAINER)
                            .append(valueBase);
                           

    let display;
    if(show){
        display = 'inline';
    }else{
        display = 'none';
    }

    let valuesComponent = $(COL_12)
                            .css('display',display)
                            .append(valuesContainer);

    return valuesComponent;
}
                    


const SHAPE_CONTAINER = '<div class="shapes-container">';

const SHAPE_HEADER = '<div class="row shapes-header">';

const SHAPE_LABEL = '<label class="col-sm-2">Shape </label>';

const SHAPES_TYPE = '<select class="col-sm-2 form-control shapeType"><option value="iriRef">'+
                    'IriRef</option><option value="prefixedIri">Prefixed</option><option value='+
                    '"bnode">BNode</option></select>';

const BTN_DELETE_SHAPE = '<button class="deleteShapeButton col-ms-1 mdc-icon-button'+
                         ' material-icons btn-danger">delete</button>';

const BTN_ADD_TRIPLE = '<button class="btn-primary addPropButton col-xs-3">+ Triple</button>';

const TRIPLES_CONTAINER ='<div class="triples-container col-xs">';




const TRIPLE_BASE ='<div class="row tripleRow">';

const TRIPLE_HEADER = '<div class="row triples-header">';

const TRIPLE_LABEL = '<label class="col-sm-1 tripleLabel">Triple</label>';

const TRIPLE_TYPE = '<select class="col-sm-2 form-control tripleType">'+
                    '<option value="iriRef" selected>IriRef</option>'+
                    '<option value="prefixedIri">Prefixed</option>'; 

const CARDINALITY_BASE = '<select class="col-sm-3  form-control tripleCardinality"><option value="">Exactly one</option>'+
                        '<option value="*">Zero or more</option><option value="+">One at least</option><option value="?">One or none</option></select>';

const DELETE_TRIPLE = '<button class="col-xs-10 deletePropButton mdc-icon-button material-icons btn-danger">delete</button>';

//const ADD_VALUE_BTN = '<button class="col-xs-1 btn-primary addValButton">+ Value</button>';




const VALUES_CONTAINER = '<div class="row values-container">';

const VALUE_BASE = '<div class="col-10 triplesVal ">';


const VALUE_LABEL = '<label class="col-3 valueLabel">Value</label>';

const VALUE_TYPE = '<select class="col-2 form-control valueType">'+
                   '<option value="primitive" selected>Primitive</option>'+
                   '<option value="shape">Shape</option>'+
                   '<option value="iriRef">IriRef</option>'+
                   '<option value="prefixedIri">Prefixed</option>'+
                   '<option value="literal">Literal</option>'+
                    '<option value="nonLiteral">NonLiteral</option>'+
                   '<option value="iriKind">IRI</option>'+
                   '<option value="bnodeKind">BNODE</option></select>';


const VALUE_SHAPE = '<select class="col-4 form-control valueInlineShape">';

//const DELETE_VALUE_BTN = '<button class="col-xs-1 deleteBtn mdc-icon-button material-icons btn-danger">delete</button>';



//const DIV_CHECK = '<div class="checkbox valuesCheck"><label><input type="checkbox" value="">Values</label></div>';
const DIV_CHECK = '<div class="checkbox valuesCheck">';
const CHECK = '<input class="check" type="checkbox" value="">'

const COL_12 = '<div class="col-12 valuesCol" style="display: none;">';
const ROW = '<div class="row">';
const LABEL = '<label>';


export { getShapeHtml,getTripleHtml}
