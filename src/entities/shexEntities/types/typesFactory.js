let PrefixedIri = require('./concreteTypes/prefixedIri.js');
let IrirRef = require('./concreteTypes/iriRef.js');
let BNode = require('./concreteTypes/bNode.js');
let Primitive = require('./concreteTypes/primitive.js');
let ShapeReference = require('./concreteTypes/shapeReference.js');

let Literal = require('./concreteTypes/kinds/literal.js');
let NonLiteral = require('./concreteTypes/kinds/nonLiteral.js');
let IriKind = require('./concreteTypes/kinds/iriKind.js');
let BNodeKind = require('./concreteTypes/kinds/bNodeKind.js');

class TypesFactory{

    createType(type,context){

        let retType;
        if(type == 'iriRef'){
            retType = new IrirRef(context);
        }
        
        if(type == 'prefixedIri'){
            retType = new PrefixedIri(context);
        }

        if(type == 'bnode'){
            retType = new BNode(context);
        }

        if(type == 'primitive'){
            retType = new Primitive();
        }

        if(type == 'shape'){
            retType = new ShapeReference(context);
        }

        if(type == 'literal'){
            retType = new Literal(context);
        }

        if(type == 'nonLiteral'){
            retType = new NonLiteral(context);
        }

        if(type == 'iriKind'){
            retType = new IriKind(context);
        }

        if(type == 'bnodeKind'){
            retType = new BNodeKind(context);
        }
 

        return retType;

    }


}

module.exports = TypesFactory;