let Type = require('../type.js');
let $ = require('jquery');

//HAY QUE METER TODOS
const PRIMITIVES = ['String','Integer','Date','Boolean'];

class Primitive extends Type{

     constructor(value='string'){
        super(value);
    }

    getTypeName(){
        return 'primitive';
    }

    toString(){
        return 'xsd:'+this.getValue();
    }



}

module.exports = Primitive;