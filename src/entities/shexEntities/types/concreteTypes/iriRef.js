import Type from '../type.js';

class IriRef extends Type{

    constructor(context,value=''){
        super(value);
        this.context = context;
    }


    getHtml(){
        return '<input class="'+this.context+' form-control col-sm-2" context="text" value="'+this.getValue()+'">';
    }

    getTypeName(){
        return 'iriRef';
    }


    toString(){
        return '<'+this.getValue()+'>';
    }


}

export default IriRef;