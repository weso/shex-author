import PrefixedIri from'./concreteTypes/prefixedIri';
import IriRef from'./concreteTypes/iriRef';
import BNode from'./concreteTypes/bNode';
import BlankType from'./concreteTypes/blankType';
import Primitive from'./concreteTypes/primitive';
import ValueSet from'./concreteTypes/valueSet';

import Literal from'./concreteTypes/kinds/literal';
import NonLiteral from'./concreteTypes/kinds/nonLiteral';
import IriKind from'./concreteTypes/kinds/iriKind';
import BNodeKind from'./concreteTypes/kinds/bNodeKind';


import StringLiteral from'./concreteTypes/literal/stringLiteral';
import NumberLiteral from'./concreteTypes/literal/numberLiteral';
import BooleanLiteral from'./concreteTypes/literal/booleanLiteral';



class TypesFactory{

    createType(type){

        let retType;
        if(type == 'iriRef'){
            retType = new IriRef();
        }
        
        if(type == 'prefixedIri'){
            retType = new PrefixedIri();
        }
        
        if(type == 'bnodeType'){
            retType = new BNode();
        }

        if(type == 'blankType'){
            retType = new BlankType();
        }

        if(type == 'primitive'){
            retType = new Primitive();
        }

        if(type == 'literal'){
            retType = new Literal();
        }

        if(type == 'nonliteral'){
            retType = new NonLiteral();
        }

        if(type == 'iri'){
            retType = new IriKind();
        }

        if(type == 'bnode'){
            retType = new BNodeKind();
        }

        if(type == 'valueSet'){
            retType = new ValueSet();
        }

        if(type == 'stringLiteral'){
            retType = new StringLiteral();
        }

        if(type == 'numberLiteral'){
            retType = new NumberLiteral();
        }

        if(type == 'booleanLiteral'){
            retType = new BooleanLiteral();
        }
 

        return retType;

    }


}

export default TypesFactory;