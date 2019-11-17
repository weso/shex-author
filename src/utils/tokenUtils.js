import shexUtils from './shexUtils';

import Editor from '../entities/editor';

import  Shape from '../entities/shexEntities/shape';
import  Triple from '../entities/shexEntities/triple';

import TypesFactory from '../entities/shexEntities/types/typesFactory';

import PrefixedIri from '../entities/shexEntities/types/concreteTypes/prefixedIri';
import IriRef from '../entities/shexEntities/types/concreteTypes/iriRef';
import BNode from '../entities/shexEntities/types/concreteTypes/bNode';
import Primitive from '../entities/shexEntities/types/concreteTypes/primitive';
import ShapeReference from '../entities/shexEntities/types/concreteTypes/shapeReference';

import Literal from '../entities/shexEntities/types/concreteTypes/kinds/literal';
import NonLiteral from '../entities/shexEntities/types/concreteTypes/kinds/nonLiteral';
import IriKind from '../entities/shexEntities/types/concreteTypes/kinds/iriKind';
import BNodeKind from '../entities/shexEntities/types/concreteTypes/kinds/bNodeKind';
import BlankKind from '../entities/shexEntities/types/concreteTypes/kinds/blankKind';



import Prefix from '../entities/shexEntities/shexUtils/prefix';

import InlineShape from '../entities/shexEntities/shexUtils/inlineShape';


//HAY QUE METER TODOS
const PRIMITIVES = ['string','integer','date','boolean'];
const CARDINALITY = ['*','?','+'];


let inlines;

function getTokens(){
    let yashe = Editor.getInstance().getYashe();
    let tokens =[];
    if(yashe!=undefined){
        let numPrefixes = Object.keys(yashe.getDefinedPrefixes()).length;
        for (var l = numPrefixes+1; l < yashe.lineCount(); ++l) {
            let lineTokens = getNonWsTokens(yashe.getLineTokens(l));
            lineTokens.forEach(token =>{
                tokens.push(token);
            })

        }
    }
    return tokens;
}

function getDefinedShapes(tokens){
    let brackets=0
    let shape=[];
    let defShapes = [];
    //Separate shapes in arrays
    tokens.forEach(element =>{
        shape.push(element);
        if(element.string == '{'){
            brackets++;
        }

        if(element.string == '}'){
            brackets--;
            //Is the last } ?
            if(brackets==0){
                defShapes.push(shape);
                shape = [];
            }
        }

    })
    return defShapes;
}


function getShapes(defShapes){
    inlines = [];
    let shapes = [];
    let yashe = Editor.getInstance().getYashe();

    defShapes.forEach(shape => {
        let id = shapes.length;
        let shapeDef = shape[0].string;
        let shapeType = getType(shapeDef,'shapeName');
        let qualifier = getQualifier(shape);
        let triples = getTriples(id,shape);

        shapes.push(new Shape(id,shapeType,triples,qualifier));
    })
    return shapes;

}

function getQualifier(shape) {
    if(shape[1].type == 'keyword'){
        let type = shape[1].string.toLowerCase();
        return new TypesFactory().createType(type);
    }
    return new BlankKind();
}

function getTriples(shapeId,shape) {
        let triples = [];
        let singleTriple = [];
        let yashe = Editor.getInstance().getYashe();
        let start = getStart(shape);
        for(let i=start;i<shape.length;i++){
            singleTriple.push(shape[i])
            if(shape[i].type == 'punc'){// finish of the triple ';'
                if(singleTriple.length!=1){ //This line is neccesary when last triple of the shape ends with ';'
           
                    triples.push(getTriple(triples,singleTriple,shapeId));
                    singleTriple = [];
                }
            }

        }
    return triples;
}

function getTriple(triples,singleTriple,shapeId) {
    let id = triples.length;
    let type;
    let value;
    let cardinality;
    let inlineShape = new InlineShape();
    let inlineName;
    let index = 0;
    for(let s in singleTriple){
        let token = singleTriple[s];
        
        if(index == 0){
            type = getType(token.string,'tripleName');
            
        }else{
   
            if(token.type == 'string-2' || token.type == 'keyword' || token.type == 'variable-3'){
                value = getValue(token.string);
            }
    
            if(token.type == 'at' ){
                
                inlineName = getInlineName(token.string);
                inlines.push(
                        {
                            shapeId:shapeId,
                            tripleId:id,
                            inlineName:inlineName
                        }
                    );
            }

            if(token.type == 'card' ){
                cardinality = token.string;
            }

        }
        index++;
    }


    //ShapeRef
    if(inlineName != undefined){
        let ref;
        if(value!= undefined){
           ref = value.getTypeName();
        }
        value = new ShapeReference(ref); 
    }

    return new Triple(id,type,value,inlineShape,cardinality);
}

function getStart(shape){
    for(let i=0;i<shape.length;i++){
        if(shape[i].string=='{'){
            return i+1;
        }
    }
}



function getValue(def) {

    let factory = new TypesFactory();
    let type = factory.createType(def.toLowerCase());

    if(type!=undefined){
        return type;
    }


    if(def.startsWith('<')){
        let value = def.split('<')[1].split('>')[0];
        return new IriRef('valueName',value);
    }

    let token = def.split(':');
    let yashe = Editor.getInstance().getYashe();

    if(token.length==2){
        //At this point it can be Prefixed,Primitive or ShapeRef
        if(isPrimitive(token[1])){
            return new Primitive(token[1]);
        }else{
            let prefixName = token[0];
            let prefixValue = getPrefixValue(yashe.getDefinedPrefixes(),prefixName)
            let prefix = new Prefix(prefixName,prefixValue);
            return  new PrefixedIri('valueName',prefix,token[1]);
        }

    }
 
}

function getType(def,context) {
    let value;
    let yashe = Editor.getInstance().getYashe();
    if(def.startsWith('<')){
        value = def.split('<')[1].split('>')[0];
        return new IriRef(context,value);
    }else if(def.startsWith('_:')){
        value = def.split(':')[1];
        return new BNode(context,value);
    }else{
        value = def.split(':')[1];
        let prefixName = def.split(':')[0];
        let prefixValue = getPrefixValue(yashe.getDefinedPrefixes(),prefixName)
        let prefix = new Prefix(prefixName,prefixValue);
        return new PrefixedIri(context,prefix,value);
    }
}


function updateInlines(shapes) {

    for(let inShape in inlines){
  
        let shapeId = inlines[inShape].shapeId;
        let tripleId = inlines[inShape].tripleId;
        let name = inlines[inShape].inlineName;

        let shape = shexUtils.getShapeById(shapes,shapeId);
        let triple = shexUtils.getTripleById(shape,tripleId);

        let shapeRef = shexUtils.getShapeByName(shapes,name);
        triple.getInlineShape().setShape(shapeRef);

    }
}



function getPrefixValue(defPrefixes,prefixName){
    let prefixValue;
    for(let pre in defPrefixes){
        if(pre==prefixName){
            prefixValue = defPrefixes[pre]
        }
    }
    return prefixValue;
}


function isPrimitive(value) {
    for(let prim in PRIMITIVES){
        if(PRIMITIVES[prim] == value){
            return true;
        }
    }
    return false;
}


function getInlineName(token) {
    if(token.startsWith('@<')){
        return token.split('<')[1].split('>')[0];
    }
    return token.split(':')[1];
}


function getNonWsTokens(tokens){
    return tokens.filter(function(obj){
        return obj.type != 'ws';
    })
}

const tokenUtils = {
    getTokens:getTokens,
    getDefinedShapes:getDefinedShapes,
    getShapes:getShapes,
    updateInlines:updateInlines
}

export default tokenUtils;