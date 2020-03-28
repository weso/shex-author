import Type from '../type';

class StringValue extends Type{

     constructor(value=''){
        this.value = value;
    }

    getTypeName(){
        return 'stringValue';
    }

    toString(){
        return '"'+this.value+'"';
    }



}

export default StringValue;