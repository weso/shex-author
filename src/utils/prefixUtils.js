import Codemirror from 'codemirror';
import Editor from '../entities/editor';
import Prefix from '../entities/shexEntities/shexUtils/prefix';
import {ALL_PREFIXES} from './rdfUtils';

let prefixCount = 0;

export function getPrefix(prefix){
    let defined = Editor.getInstance().getYashe().getDefinedPrefixes();
    for(let def in defined){
        if(defined[def] == prefix){
          return new Prefix(def,defined[def]);
        }
    }
    return new Prefix();
}


export function addPrefixComp(prefixes){
    const id = prefixes.length + prefixCount++;
    return new Prefix('','',id);
}

export function deletePrefixComp(prefixes,prefixId) {
    return prefixes.filter(prefix => prefix.id != prefixId);
}


export function addPrefix(prefix){
        let namespaces = ALL_PREFIXES;
        let yashe = Editor.getInstance().getYashe();
        let current = yashe.getValue();
        let defined = yashe.getDefinedPrefixes();
        let uri = 'http://example.org/';
        //getUri
        for(let def in namespaces){
          for(let p in namespaces[def]){
            if(p==prefix)
              uri = namespaces[def][p];
          }
        }
        yashe.setValue( 'PREFIX ' + prefix + ': <' + uri + '>\n' + current );
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