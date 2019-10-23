
import Codemirror from  'codemirror';
import $ from 'jquery';

import * as  ShapeStore from  '../entities/shapeStore.js';
import * as  Editor from '../entities/editor.js';

import * as  shapeUtils from  './shapeUtils.js';
import * as  drawUtils from  './drawUtils.js';
import * as  prefixUtils from './prefixUtils.js';
import * as  typeUtils from  './typeUtils.js';
import * as  inlineUtils from  './inlineUtils.js';
import * as  cardinalityUtils from  './cardinalityUtils.js';

import * as  Shape from  '../entities/shexEntities/shape.js';
import * as  Triple from '../entities/shexEntities/triple.js';





function updateListeners(){
    
    // APPEND

    $('.addShapeButton').click(function(){
        let shapeCount = ShapeStore.getInstance().getShapeCount();
        ShapeStore.getInstance().addShape(new Shape(shapeCount));
        drawAssistant();
        shapeUtils.removeNode($(this));
        emit();
    });
   
    $('.addPropButton').click(function(){
        let shapeId = shapeUtils.getIdParent($(this));
        let shape = shapeUtils.getShape(shapeId);
        let id = shape.getTriplesCount();

        shape.addTriple(new Triple(id));
        drawAssistant();
        emit();
    });
    

    //DELETE

    $(".deleteShapeButton").click(function(){
       // var response = confirm('Are you sure?');
        //if (response == true) {
            ShapeStore.getInstance().setShapes(shapeUtils.deleteShape($(this)));
            shapeUtils.removeGrandParent($(this));
            emit();
       // }
    })
    
    $(".deletePropButton").click(function(){

        let shapeId = shapeUtils.getIdGrandParent($(this).parent());
        let tripleId = shapeUtils.getIdParent($(this).parent());
        let shape = shapeUtils.getShape(shapeId);
        shape.removeTriple(tripleId);
        shapeUtils.removeGrandParent($(this));
        emit();
   
    })

    //NAMES


    $('.shapeName').focusout(function(){
        let newName = $(this)[0].value;
        let shapeId = shapeUtils.getIdGrandParent($(this));
        let shape = shapeUtils.getShape(shapeId);
        shape.getType().setValue(newName);
        updateInlineShapes();
        emit();
    })


     $('.tripleName').focusout(function(){
        let newName = $(this)[0].value;
        let triple = shapeUtils.getTriple($(this))
        triple.getType().setValue(newName);
        emit();
    })


    $('.valueName').focusout(function(){
        let newName = $(this)[0].value;
        let triple = shapeUtils.getTripleByValue($(this))
        triple.getValue().setValue(newName);
        emit();
    })



    //PREFIXEX


    $('.prefixShape').change(function(){
        let prefix = shapeUtils.getPrefix($(this));
        let shapeId = shapeUtils.getIdGrandParent($(this));
        let shape = shapeUtils.getShape(shapeId);
        shape.getType().setPrefix(prefix);
        emit();
        
    })

    $('.prefixTriple').change(function(){
        let prefix = shapeUtils.getPrefix($(this)); 
        let triple = shapeUtils.getTriple($(this))
        triple.getType().setPrefix(prefix);
        emit();
    })

    $('.prefixValue').change(function(){
        let prefix = shapeUtils.getPrefix($(this)); 
        let triple = shapeUtils.getTripleByValue($(this))
        triple.getValue().setPrefix(prefix);
        emit();
    })



    //TYPES

    $('.shapeType').change(function(){
        let shapeType = $(this)[0].value;
        let shapeId = shapeUtils.getIdGrandParent($(this));
        let shape = shapeUtils.getShape(shapeId);
        shape.setType(shapeType);
        drawAssistant();
        emit();
    })

    
     $('.tripleType').change(function(){
        let tripleType = $(this)[0].value;
        let triple = shapeUtils.getTriple($(this))
        triple.setType(tripleType);
        drawAssistant();
        emit();
    })
    


    $('.valueType').change(function(){
        let valueType = $(this)[0].value;
        let triple = shapeUtils.getTripleByValue($(this))
        triple.setValue(valueType);
        drawAssistant();
        emit();
    })




    $('.tripleValue').change(function(){
        let value = $(this)[0].value;
        let triple = shapeUtils.getTripleByValue($(this))
        triple.getValue().setValue(value);
        drawAssistant();
        emit();
        
    })



    $('.tripleCardinality').change(function(){
        let cardinality = $(this)[0].value;
        let triple = shapeUtils.getTriple($(this))
        triple.setCardinality(cardinality);
        emit();
    })


    $('.valueInlineShape').change(function(){
        let shapeId = $(this)[0].value;
 
        if(shapeId!==''){
            let shape = shapeUtils.getShape(shapeId);
            let triple = shapeUtils.getTripleByValue($(this))
            triple.getInlineShape().setShape(shape);
        }else{
            let triple = shapeUtils.getTripleByValue($(this))
            triple.getInlineShape().setShape(null);
        }
  
        drawAssistant();
        emit();
    })


    $('.valuesCheck').change(function(){
        let check =$(this).children().children()[0].checked;
        let triple = shapeUtils.getTriple($(this))
       if(check){
           triple.setShowValues(true);
       }else{
           triple.setShowValues(false);
       }

       $($(this).parent().siblings()[0]).slideToggle(200);

    })
    


}


function staticListeners() {

    $( '#prefixesDropdown' ).on( 'change', 'select',
				$.proxy( handleNamespaceSelected, this ) );


     $('.assistantBtn').click(function(){
         $('#assistant-container').toggle("slide");
     })           
    
}

function handleNamespaceSelected(e) {
    let ns;
	let uri = e.target.value;
    let yashe = Editor.getInstance().getYashe();
	let current = yashe.getValue();
   
	if ( current.indexOf( '<' + uri + '>' ) === -1 ) {
		ns = $( e.target ).find( ':selected' ).text();
		yashe.setValue( 'PREFIX ' + ns + ': <' + uri + '>\n' + current );
	}

    // reselect group label
    e.target.selectedIndex = 0;
    prefixUtils.updatePrefixes();

}


function updateInlineShapes() {
    inlineUtils.updateInlineShapes();
}

function drawAssistant() {
    drawUtils.drawAssistant();
    updateListeners();
    prefixUtils.updatePrefixes();
    updateInlineShapes();
    typeUtils.updateTypes();
    cardinalityUtils.updateCardinalities();
    drawUtils.drawEditor();
}

function emit(){
    let yashe = Editor.getInstance().getYashe();
    Codemirror.signal(yashe,"humanEvent");
}



export { updateListeners, staticListeners}
