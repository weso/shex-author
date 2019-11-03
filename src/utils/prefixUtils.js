let Editor = require('../entities/editor.js');
let Prefix = require('../entities/shexEntities/shexUtils/prefix.js');

function getPrefix(prefix){
      let defined = Editor.getInstance().getYashe().getDefinedPrefixes();
      for(let def in defined){
          if(defined[def] == prefix){
            return new Prefix(def,defined[def]);
          }
      }
      return new Prefix();
}

module.exports = {
    getPrefix:getPrefix
}