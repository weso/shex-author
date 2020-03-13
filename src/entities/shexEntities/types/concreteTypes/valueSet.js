import Type from '../type';

class ValueSet extends Type{

     constructor(value){
        super(value);
    }

    getTypeName(){
        return 'valueSet';
    }

    toString(){
        return '[ '+this.value+" ]";
    }



}

export default ValueSet;