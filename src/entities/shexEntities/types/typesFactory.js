import PrefixedIri from'./concreteTypes/prefixedIri';
import IriRef from'./concreteTypes/iriRef';
import BNode from'./concreteTypes/bNode';
import Primitive from'./concreteTypes/primitive';
import ShapeReference from'./concreteTypes/shapeReference';

import Literal from'./concreteTypes/kinds/literal';
import NonLiteral from'./concreteTypes/kinds/nonLiteral';
import IriKind from'./concreteTypes/kinds/iriKind';
import BNodeKind from'./concreteTypes/kinds/bNodeKind';

class TypesFactory{

    createType(type,context){

        let retType;
        if(type == 'iriRef'){
            retType = new IriRef(context);
        }
        
        if(type == 'prefixedIri'){
            retType = new PrefixedIri(context);
        }

        if(type == 'bnodeType'){
            retType = new BNode(context);
        }

        if(type == 'primitive'){
            retType = new Primitive();
        }

        if(type == 'shape'){
            retType = new ShapeReference('');
        }

        if(type == 'literal'){
            retType = new Literal(context);
        }

        if(type == 'nonliteral'){
            retType = new NonLiteral(context);
        }

        if(type == 'iri'){
            retType = new IriKind(context);
        }

        if(type == 'bnode'){
            retType = new BNodeKind(context);
        }
 

        return retType;

    }


}

export default TypesFactory;