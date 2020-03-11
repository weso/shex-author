import CardinalityExactly from './cardinalityExactly';
import CardinalityMinLimit from './cardinalityMinLimit';
import CardinalityRange from './cardinalityRange';

class CardinalityFactory{

    createCardinality(type,min,max){

        let retType = type;
        if(type == 'exactly'){
            retType = new CardinalityExactly(min);
        }

        if(type == 'minLimit'){
            retType = new CardinalityMinLimit(min);
        }

        if(type == 'range'){
            retType = new CardinalityRange(min,max);
        }
 
        return retType;

    }


}

export default CardinalityFactory;