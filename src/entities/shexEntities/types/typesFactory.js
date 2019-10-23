import * as  PrefixedIri from './concreteTypes/prefixedIri.js' ;
import * as  IrirRef from './concreteTypes/iriRef.js' ;
import * as  BNode from './concreteTypes/bNode.js' ;
import * as  Primitive from './concreteTypes/primitive.js' ;
import * as  ShapeReference from './concreteTypes/shapeReference.js' ;

import * as  Literal from './concreteTypes/kinds/literal.js' ;
import * as  NonLiteral from './concreteTypes/kinds/nonLiteral.js' ;
import * as  IriKind from './concreteTypes/kinds/iriKind.js' ;
import * as  BNodeKind from './concreteTypes/kinds/bNodeKind.js' ;

class TypesFactory{

    createType(type,context){

        let retType;
        if(type === 'iriRef'){
            retType = new IrirRef(context);
        }
        
        if(type === 'prefixedIri'){
            retType = new PrefixedIri(context);
        }

        if(type === 'bnode'){
            retType = new BNode(context);
        }

        if(type === 'primitive'){
            retType = new Primitive();
        }

        if(type === 'shape'){
            retType = new ShapeReference(context);
        }

        if(type === 'literal'){
            retType = new Literal(context);
        }

        if(type === 'nonLiteral'){
            retType = new NonLiteral(context);
        }

        if(type === 'iriKind'){
            retType = new IriKind(context);
        }

        if(type === 'bnodeKind'){
            retType = new BNodeKind(context);
        }
 

        return retType;

    }


}

export default TypesFactory;