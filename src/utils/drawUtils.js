 import $ from  'jquery';

 import * as rdfUtils from './rdfUtils.js';

 import * as Editor from '../entities/editor.js';
 import * as ShapeStore from '../entities/shapeStore.js';


const DEFAULT_SHAPE = 'PREFIX :       <http://example.org/>\n'+
'PREFIX schema: <http://schema.org/>\n'+
'PREFIX xsd:    <http://www.w3.org/2001/XMLSchema#>\n\n'+

':User IRI {\n'+ 
'  schema:name          xsd:string  ;\n'+
'  schema:birthDate     xsd:date?  ;\n'+
'  schema:birthPlace    xsd:string+  ;\n'+
'  schema:knows          @:User*  \n'+
'}';


const SHAPE_BTN = '<button class="btn-primary addShapeButton">+ Shape</button>';


function getPrefixes() {
    let yashe = Editor.getInstance().getYashe();
    let definedPrefixes = yashe.getDefinedPrefixes();
    let prefixes='';
    for(let pre in definedPrefixes){
        prefixes+='PREFIX '+pre+':    <'+definedPrefixes[pre]+'>\n';
    }
    prefixes+='\n';
    return prefixes;
}


function drawSelectors() {
    let container = $('#prefixesDropdown');
    let namespaces = rdfUtils.ALL_PREFIXES;
    let select;
    for (let category in  namespaces) {
			select = $( '<select>' ).attr( 'class', 'form-control' ).append(
					$( '<option>' ).text( category ) ).appendTo( container );
			for ( let ns in namespaces[category] ) {
				select.append(
					$( '<option>' ).text( ns ).attr( 'value', namespaces[category][ns] )
				);
			}
		}
}


function drawAssistant() {
    let shapes = ShapeStore.getInstance().getShapes();
    let container = $('#assistant-container');
    let shapeBtn = SHAPE_BTN;
    container.empty();
    shapes.forEach( element => {
        container.append(element.getHtml());
    });
    container.append(shapeBtn); 
}

function drawEditor(){
    let yashe = Editor.getInstance().getYashe();
    let shapes = ShapeStore.getInstance().getShapes();
    let newContent = getPrefixes();
    shapes.forEach(element =>{
        newContent += element.toString()
    });
    yashe.setValue(newContent);
}



export { DEFAULT_SHAPE, getPrefixes, drawSelectors, drawAssistant , drawEditor}