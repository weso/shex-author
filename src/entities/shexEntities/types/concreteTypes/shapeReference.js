let Type = require('../type.js');

class ShapeReference extends Type{

    constructor(value=''){
        super(value);
    }

    getTypeName(){
        return 'shape';
    }

    setValue(value){
        this.value=value;
    }

    toString(){
        return this.value;
    }


}


module.exports = ShapeReference;