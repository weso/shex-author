import Type from '../type';

class BlankType extends Type{

     constructor(value=''){
        super(value);
    }

    getTypeName(){
        return 'blankType';
    }

    toString(){
        return '';
    }



}

export default BlankType;