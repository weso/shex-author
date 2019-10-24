let Type = require('../type.js');

class ShapeReference extends Type{

    constructor(value=''){
        super(value);
    }

    getHtml(){
        return null;
    }

    getTypeName(){
        return 'shape';
    }

    toString(){
        return '';
    }


}


module.exports = ShapeReference;