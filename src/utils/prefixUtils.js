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

