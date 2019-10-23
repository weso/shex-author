import Type from '../type.js';

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


export default ShapeReference;