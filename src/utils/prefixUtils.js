import Codemirror from 'codemirror';
import Editor from '../entities/editor';
import Prefix from '../entities/shexEntities/shexUtils/prefix.js';

import {ALL_PREFIXES} from './rdfUtils';

export function getPrefix(prefix){
      let defined = Editor.getInstance().getYashe().getDefinedPrefixes();
      for(let def in defined){
          if(defined[def] == prefix){
            return new Prefix(def,defined[def]);
          }
      }
      return new Prefix();
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
