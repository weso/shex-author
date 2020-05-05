import Codemirror from 'codemirror';
import Editor from '../entities/editor';
import Prefix from '../entities/shexEntities/others/prefix';
import {ALL_PREFIXES} from './rdfUtils';

let prefixCount = 0;

export function getPrefix(prefix){
    let defined = Editor.getYashe().getDefinedPrefixes();
    return Object.keys(defined).reduce((acc,p)=>{
      if(defined[p]==prefix) acc = new Prefix(p,defined[p]);
      return acc;
    },new Prefix());
}


export function addPrefixComp(prefixes,width){
    prefixCount++ //We needed berfore
    const id = prefixes.length + prefixCount; // +prefixCount++ doesn't work for this
    let newPrefix = new Prefix('','',id);
    let newPrefixes = [];
    newPrefixes = Object.assign(newPrefixes, prefixes);
    newPrefixes.push(newPrefix);
    emitPrefixes(newPrefixes,width);
    return newPrefix;
}

export function deletePrefixComp(prefixes,prefixId,width) {
    let newPrefixes = prefixes.filter(prefix => prefix.id != prefixId);
    emitPrefixes(newPrefixes,width);
    return newPrefixes;
}


export function addPrefix(prefix){
        let namespaces = ALL_PREFIXES;
        let yashe = Editor.getYashe();
        let current = yashe.getValue();
        let defined = yashe.getDefinedPrefixes();
        yashe.setValue( 'PREFIX ' + prefix + ': <' + getUri() + '>\n' + current );
        Codemirror.signal(yashe,'prefixUpdate');
  }


export function getUri(prefix,namespaces){
  for(let def in namespaces){
    for(let p in namespaces[def]){
      if(p==prefix)
        return namespaces[def][p];
    }
  }
  return 'http://example.org/';
}


function getPrefixesStr(prefixes){
  return prefixes.reduce((acc,p)=>{
    return acc += 'PREFIX ' + p.prefixName + ': <' + p.prefixValue + '>\n';
  },'');
}

export function emitPrefixes(newPrefixes,width) {
    const yashe = Editor.getYashe();
    if(yashe!=undefined){
        Codemirror.signal(yashe,'prefixChange',getPrefixesStr(newPrefixes),width);
    }
}