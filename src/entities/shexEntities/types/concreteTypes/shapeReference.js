let Type = require('../type.js');

class ShapeReference extends Type{

    constructor(value=''){
        super(value);
    }

    getTypeName(){
        return 'shape';
    }

    toString(){
        return '';
    }


}


module.exports = ShapeReference;