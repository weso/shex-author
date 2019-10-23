import * as  Shape from '../entities/shexEntities/shape.js';
import * as  Triple from '../entities/shexEntities/triple.js';
import * as  Prefix from '../entities/shexEntities/shexUtils/prefix.js';

import * as  IriRef from '../entities/shexEntities/types/concreteTypes/iriRef.js';
import * as  PrefixedIri from '../entities/shexEntities/types/concreteTypes/prefixedIri.js';
import * as  BNode from '../entities/shexEntities/types/concreteTypes/bNode.js';
import * as  Primitive from '../entities/shexEntities/types/concreteTypes/primitive.js';
import * as  ShapeReference from '../entities/shexEntities/types/concreteTypes/shapeReference.js';

import * as  Literal from '../entities/shexEntities/types/concreteTypes/kinds/literal.js';
import * as  NonLiteral from '../entities/shexEntities/types/concreteTypes/kinds/nonLiteral.js';
import * as  IriKind from '../entities/shexEntities/types/concreteTypes/kinds/iriKind.js';
import * as  BNodeKind from '../entities/shexEntities/types/concreteTypes/kinds/bNodeKind.js';

import * as  InlineShape from '../entities/shexEntities/shexUtils/inlineShape.js';

import * as  shapeUtils from './shapeUtils.js';


import * as Editor from '../entities/editor.js';
import * as  ShapeStore from '../entities/shapeStore.js';

//HAY QUE METER TODOS
const PRIMITIVES = ['string','integer','date','boolean'];
//const CARDINALITY = ['*','?','+'];


let inlines;

function getTokens(){
    let yashe = Editor.getInstance().getYashe();
    let numPrefixes = Object.keys(yashe.getDefinedPrefixes()).length;
    let tokens =[];
    for (var l = numPrefixes+1; l < yashe.lineCount(); ++l) {
        let lineTokens = getNonWsTokens(yashe.getLineTokens(l));
        lineTokens.forEach(token =>{
            tokens.push(token);
        })

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
        if(element.string === '{'){
            brackets++;
        }

        if(element.string === '}'){
            brackets--;
            //Is the last } ?
            if(brackets===0){
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
    defShapes.forEach(shape => {
        
        let id = shapes.length;
        let shapeDef = shape[0].string;
        let shapeType = getType(shapeDef,'shapeName');
        let triples = getTriples(id,shape);

        shapes.push(new Shape(id,shapeType,triples));
    })

    return shapes;

}

function getTriples(shapeId,shape) {
        let triples = [];
        let singleTriple = [];
        for(let i=3;i<shape.length;i++){
            singleTriple.push(shape[i])
            if(shape[i].type === 'punc'){
                if(singleTriple.length!=1){ //This line is neccesary when last triple of the shape ends with ';'
           
                              
                    let id = triples.length;
                    let type;
                    let value;
                    let cardinality;
                    let inlineShape = new InlineShape();
                    let index = 0;
                    for(let s in singleTriple){
                        let token = singleTriple[s];
                        if(index === 0){
                            type = getType(token.string,'tripleName');
                        }else{
                            
                            if(token.type === 'string-2' || token.type === 'keyword' || token.type === 'variable-3'){
                                value = getValue(token.string);
                            }
                  
                            if(token.type === 'at' ){
                                
                                let inlineName = getInlineName(token.string);
                                inlines.push(
                                        {
                                            shapeId:shapeId,
                                            tripleId:id,
                                            inlineName:inlineName
                                        }
                                    );
                            }

                            if(token.type === 'card' ){
                               cardinality = token.string;
                            }

                        }
                      index++;
                    }

                    //ShapeRef
                    if(value === undefined){
                        value = new ShapeReference(); 
                    }

                    //console.log(value)
                    triples.push(new Triple(id,type,value,inlineShape,cardinality));
                    singleTriple = [];
                }
            }

        }
    return triples;
}



function getValue(def) {


    if(def.toLowerCase() === 'literal'){
        return new Literal();
    }

    if(def.toLowerCase() === 'nonliteral'){
        return new NonLiteral();
    }

    if(def.toLowerCase() === 'iri'){
        return new IriKind();
    }

    if(def.toLowerCase() === 'bnode'){
        return new BNodeKind();
    }


    if(def.startsWith('<')){
        let value = def.split('<')[1].split('>')[0];
        return new IriRef('valueName',value);
    }

    let token = def.split(':');
    let yashe = Editor.getInstance().getYashe();

    if(token.length===2){
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

function updateInlines() {

    for(let inShape in inlines){

        let shapeId = inlines[inShape].shapeId;
        let tripleId = inlines[inShape].tripleId;
        let name = inlines[inShape].inlineName;

        let shape = shapeUtils.getShapeById(shapeId);
        let triple = shapeUtils.getTripleById(shape,tripleId);

        let shapeRef = getShapeByName(name);
        triple.getInlineShape().setShape(shapeRef);
    }
}

function getShapeByName(name) {
    let shapes = ShapeStore.getInstance().getShapes();
    for(let s in shapes){
        if(shapes[s].getType().getValue() === name){
            return shapes[s];
        }
    }
}


function getPrefixValue(defPrefixes,prefixName){
    let prefixValue;
    for(let pre in defPrefixes){
        if(pre===prefixName){
            prefixValue = defPrefixes[pre]
        }
    }
    return prefixValue;
}


function isPrimitive(value) {
    for(let prim in PRIMITIVES){
        if(PRIMITIVES[prim] === value){
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


export { getTokens ,getDefinedShapes, getShapes,updateInlines}
