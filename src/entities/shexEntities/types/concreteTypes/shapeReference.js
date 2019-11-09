import Type from '../type';

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


export default ShapeReference;