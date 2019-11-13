import Type from '../../type';

class BNodeKind extends Type{

     constructor(value=''){
        super(value);
    }

    getTypeName(){
        return 'bnode';
    }

    toString(){
        return 'BNODE';
    }



}

export default BNodeKind;