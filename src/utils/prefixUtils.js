import Codemirror from 'codemirror';
import Editor from '../entities/editor';
import Prefix from '../entities/shexEntities/shexUtils/prefix.js';

export function getPrefix(prefix){
    let defined = Editor.getInstance().getYashe().getDefinedPrefixes();
    for(let def in defined){
        if(defined[def] == prefix){
          return new Prefix(def,defined[def]);
        }
    }
    return new Prefix();
}

export function addPrefix(prefix,namespaces){
  let yashe = Editor.getInstance().getYashe();
  let current = yashe.getValue();
  let defined = yashe.getDefinedPrefixes();
  let uri = getUri(prefix,namespaces);
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