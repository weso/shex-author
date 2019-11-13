import Editor from '../entities/editor';
import tokenUtils from './tokenUtils';


const DEFAULT_SHAPE = 'PREFIX :       <http://example.org/>\n'+
'PREFIX schema: <http://schema.org/>\n'+
'PREFIX xsd:    <http://www.w3.org/2001/XMLSchema#>\n\n'+

':User IRI {\n'+ 
'  schema:name          xsd:string  ;\n'+
'  schema:birthDate     xsd:date?  ;\n'+
'  schema:birthPlace    xsd:string+  ;\n'+
'  schema:knows          @:User*  \n'+
'}';
  
  
  function replaceShapes(){
    let tokens = tokenUtils.getTokens();
    let defShapes = tokenUtils.getDefinedShapes(tokens);
    let newShapes = tokenUtils.getShapes(defShapes);
    
    tokenUtils.updateInlines(newShapes);

    return newShapes;
  }

  function updatePrefixes(){
    let newPrefixes = [];
    let prefix = {};
    let yashe = Editor.getInstance().getYashe();
    if(yashe!=undefined){
      let keys = Object.keys(yashe.getDefinedPrefixes());
      let values = Object.values(yashe.getDefinedPrefixes());

      for(let i=0;i<keys.length;i++){
          prefix = {};
          prefix.key=keys[i];
          prefix.val=values[i];
          newPrefixes.push(prefix);
      }
    }
    return newPrefixes;
  }

 const yasheUtils = {
      DEFAULT_SHAPE:DEFAULT_SHAPE,
      replaceShapes:replaceShapes,
      updatePrefixes:updatePrefixes

  }

  export default yasheUtils;
