import Type from '../../type';

class StringLiteral extends Type{

     constructor(value=''){
        super(value);
    }

    getTypeName(){
        return 'stringLiteral';
    }

    toString(){
        return '"'+this.value+'"';
    }



}

export default StringLiteral;