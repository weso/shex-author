import Type from '../type.js';
import $ from 'jquery';
//HAY QUE METER TODOS
const PRIMITIVES = ['String','Integer','Date','Boolean'];

class Primitive extends Type{

     constructor(value='string'){
        super(value);
    }


    getHtml(){
        let select =  $('<select class="col-sm-2 form-control tripleValue">');
        for(let prim in PRIMITIVES){
            let value = PRIMITIVES[prim];
            let option = $( '<option>' ).text(value).attr( 'value', value.toLowerCase() );
            
            if(value.toLowerCase() === this.value){
                option.prop('selected', true);
            }

            select.append(option);
        }
        return select;
    }

    getTypeName(){
        return 'primitive';
    }

    toString(){
        return 'xsd:'+this.getValue();
    }



}

export default Primitive;