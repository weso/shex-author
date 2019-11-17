import Type from '../../type';

class BlankKind extends Type{

     constructor(value=''){
        super(value);
    }

    getTypeName(){
        return 'blank';
    }

    toString(){
        return '';
    }



}

export default BlankKind;