import CardinalityExactly from './CardinalityExactly';
import CardinalityRange from './CardinalityRange';

class CardinalityFactory{

    createType(type,min.max){

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