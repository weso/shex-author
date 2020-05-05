import Editor from '../entities/editor';
import tokenUtils from './tokenUtils';
import Prefix from '../entities/shexEntities/others/prefix';

let prefixCount = 0;

function getShapes(){
  
  let tokens = tokenUtils.getTokens();
  let defShapes = tokenUtils.getDefinedShapes(tokens);
  let newShapes = tokenUtils.getShapes(defShapes);

  tokenUtils.updateShapeRefs(newShapes);
  console.log(newShapes)
  return newShapes; 
}

function getPrefixes(){
  let defP = Editor.getYashe().getDefinedPrefixes();
  return Object.keys(defP).reduce((acc,p)=>{
     if(isInDefPrefixes(p)){ //This is weird I know
        let id = acc.length + prefixCount++;
        acc.push(new Prefix(p,defP[p],id))
     }
    return acc;
  },[]);
}

function draw(shapes,prefixes){
  let yashe = Editor.getInstance().getYashe();
  yashe.setValue(shapes.reduce((acc,s) => {
      return acc+=s.toString();
  },getPrefixesStr(yashe,prefixes)));
}

function getPrefixesStr(yashe,prefixes){
    if(prefixes!=undefined)return prefixes;
    let defP = yashe.getDefinedPrefixes();
    return Object.keys(defP).reduce((acc,p)=>{
      return acc+='PREFIX '+p+':    <'+defP[p]+'>\n';
    },'');
}

function getSchema(){
    return Editor.getYashe()?.getValue();
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

function isInDefPrefixes(prefix){
  return Editor.getYashe().defPrefixes.reduce((acc,p)=>{
    if(prefix+':'==p)acc=true;
    return acc;
  },false);
}

 const yasheUtils = {
      getShapes:getShapes,
      getPrefixes:getPrefixes,
      draw:draw,
      getSchema:getSchema,
      debounce:debounce
  }

  export default yasheUtils;
