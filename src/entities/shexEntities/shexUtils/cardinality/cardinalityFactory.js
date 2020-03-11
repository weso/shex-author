import CardinalityExactly from './cardinalityExactly';
import CardinalityRange from './cardinalityRange';

class CardinalityFactory{

    createCardinality(type,min,max){

        let retType = type;
        if(type == 'exactly'){
            retType = new CardinalityExactly(min);
        }

        if(type == 'range'){
            retType = new CardinalityRange(min,max);
        }
 
        return retType;

    }


}

export default CardinalityFactory;