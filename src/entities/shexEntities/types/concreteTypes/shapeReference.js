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
        if(this.value=='shape'){
            return '';
        }
        return this.value;
    }


}


export default ShapeReference;