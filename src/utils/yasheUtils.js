import Editor from '../entities/editor';
import tokenUtils from './tokenUtils';
import Prefix from '../entities/shexEntities/shexUtils/prefix';

const DEFAULT_SHAPE = 'PREFIX :       <http://example.org/>\n'+
'PREFIX schema: <http://schema.org/>\n'+
'PREFIX xsd:    <http://www.w3.org/2001/XMLSchema#>\n\n'+

':User IRI {\n'+ 
'  schema:name          xsd:string  ;\n'+
'  schema:birthDate     xsd:date?  ;\n'+
'  schema:birthPlace    xsd:string+  ;\n'+
'  schema:knows          @:User*  \n'+
'}';
  
const VALUESET_SHAPE = 'PREFIX :       <http://example.org/>\n'+
'PREFIX schema: <http://schema.org/>\n'+
'PREFIX xsd:    <http://www.w3.org/2001/XMLSchema#>\n\n'+

':User IRI {\n'+ 
'  schema:name          [xsd:string 34 "esd" <asds> false ] ;\n'+
'}';
  

  let prefixCount = 0;
  
  function getCurrentShapes(){
    let tokens = tokenUtils.getTokens();
    let defShapes = tokenUtils.getDefinedShapes(tokens);
    let newShapes = tokenUtils.getShapes(defShapes);
 
    tokenUtils.updateShapeRefs(newShapes);

    return newShapes;
  }

 function updatePrefixes(prefix){
    let defined = Editor.getYashe().getDefinedPrefixes();
    let prefixes = [];
    Object.keys(defined).map(p =>{
      let id = prefixes.length + prefixCount++;
      prefixes.push(new Prefix(p,defined[p],id));
    })
    return prefixes;
}

function getSchema(){
    let yashe = Editor.getYashe();
    if(yashe){
        return yashe.getValue();
    }
    return '';
  }



function debounce(func, wait, immediate) {
    let timeout; let result;
    return function() {
        const context = this; 
        const args = arguments;
        const later = function() {
        timeout = null;
        if (!immediate) result = func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) result = func.apply(context, args);
        return result;
    };
};

 const yasheUtils = {
      DEFAULT_SHAPE:DEFAULT_SHAPE,
      VALUESET_SHAPE:VALUESET_SHAPE,
      getCurrentShapes:getCurrentShapes,
      updatePrefixes:updatePrefixes,
      getSchema:getSchema,
      debounce:debounce
  }

  export default yasheUtils;
