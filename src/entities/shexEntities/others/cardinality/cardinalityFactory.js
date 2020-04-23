import CardinalityExactly from './cardinalityExactly';
import CardinalityMinLimit from './cardinalityMinLimit';
import CardinalityRange from './cardinalityRange';
import CardinalitySimple from './cardinalitySimple';

class CardinalityFactory{

    createCardinality(type,min,max){

        if(type == 'exactly'){
            return new CardinalityExactly(min);
        }

        if(type == 'minLimit'){
            return new CardinalityMinLimit(min);
        }

        if(type == 'range'){
            return new CardinalityRange(min,max);
        }

        return new CardinalitySimple(type);
 
    }


}

export default CardinalityFactory;