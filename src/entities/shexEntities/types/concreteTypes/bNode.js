import Type from '../type.js';

class BNode extends Type{

    constructor(context,value=''){
        super(value);
        this.context = context;
    }


    getHtml(){
        let str = '<input class="'+this.context+' form-control col-sm-2" context="text" value="replaceName">';
        if(this.getValue() === ''){
            this.setValue('example')
        }
        return str.replace('replaceName',this.getValue());
    }


    getTypeName(){
        return 'bnode';
    }


    toString(){
        return '_:'+this.getValue();
    }

}



export default BNode;