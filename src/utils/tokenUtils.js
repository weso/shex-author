
import Codemirror from 'codemirror';
import Editor from '../entities/editor';
import shexUtils from './shexUtils';

import  Shape from '../entities/shexEntities/shape';
import  Triple from '../entities/shexEntities/triple';

import TypesFactory from '../entities/shexEntities/types/typesFactory';
import CardinalityFactory from '../entities/shexEntities/others/cardinality/cardinalityFactory';
import Facet from '../entities/shexEntities/others/facet';

import PrefixedIri from '../entities/shexEntities/types/concreteTypes/prefixedIri';
import IriRef from '../entities/shexEntities/types/concreteTypes/iriRef';
import BNode from '../entities/shexEntities/types/concreteTypes/bNode';
import Primitive from '../entities/shexEntities/types/concreteTypes/primitive';
import ValueSet from '../entities/shexEntities/types/concreteTypes/valueSet';

import Literal from '../entities/shexEntities/types/concreteTypes/kinds/literal';
import NonLiteral from '../entities/shexEntities/types/concreteTypes/kinds/nonLiteral';
import IriKind from '../entities/shexEntities/types/concreteTypes/kinds/iriKind';
import BNodeKind from '../entities/shexEntities/types/concreteTypes/kinds/bNodeKind';
import BlankKind from '../entities/shexEntities/types/concreteTypes/kinds/blankKind';

import NumberLiteral from '../entities/shexEntities/types/concreteTypes/literal/numberLiteral';
import StringLiteral from '../entities/shexEntities/types/concreteTypes/literal/stringLiteral';
import BooleanLiteral from '../entities/shexEntities/types/concreteTypes/literal/booleanLiteral';



import Prefix from '../entities/shexEntities/others/prefix';
import ShapeRef from '../entities/shexEntities/others/shapeRef';
import ValueSetValue from '../entities/shexEntities/others/valueSetValue';



//HAY QUE METER TODOS (Update... igual no hace falta...)
const PRIMITIVES = ['string','integer','date','boolean'];



let references;
/**
*   Obtains all the current tokens in the editor
*   @return {Array} tokens
*
 */
function getTokens(){
    let yashe = Editor.getYashe();
    let tokens =[];
    if(yashe!=undefined){
        for (var l = 0; l < yashe.lineCount(); ++l) {
            let lineTokens = getNonWsTokens(yashe.getLineTokens(l));
            lineTokens.forEach(token =>{
                tokens.push(token);
            })

        }
    }
    return tokens;
}

/**
*   Split the tokens into Shapes
*   @param {Array} Tokens
*   @return {Array} Defined Shapes (Array of Token's arrays)
*
 */
function getDefinedShapes(tokens){
    let shape = []
    let brackets=0
    let shapeCont = 0;
    let hasTripleStarted = false;
    //Separate shapes in arrays
    return tokens.reduce((acc,element)=>{

        if(element.type == 'shape'){
            shape = [];
            shape.push(element)
            acc[shapeCont]=shape;
            shapeCont++;
        }else{
            // IMPORTANT 
            // We could do just shape.push(element) but if there 
            // are directives between shapes we will push that directives into the shape   
            if(element.string == '{'){
                hasTripleStarted=true;
            }
             
            if(hasTripleStarted){
                //Get the tokens while it's from the inside of the shape
                if(element.string == '{')brackets++;
                if(element.string == '}')brackets--;
                if(brackets!=0)shape.push(element);
                //if(brackets==0)hasTripleStarted = false
             }else{
                 //Get the previous tokens before the triples
                 shape.push(element);
             }
        }

        return acc;

    },[]);
}

/**
* Get the Shapes objects
* @param {Array} Shapes (Array of Token's arrays)
*
 */
function getShapes(defShapes){
    references = [];
    return defShapes.reduce((acc,shape)=>{
        let id  = acc.length;
        let shapeDef = shape[0].string;
        let sTokens = getBeforeTripleTokens(shape);
        let content =  getContent(id,sTokens,id);

        let tTokens = getTripleTokens(shape);
        let triples = getTriples(id,tTokens);

       // let triples = [];



        acc.push(new Shape(id,content.type,content.constraint,content.facets,content.shapeRef,triples));
        return acc;

    },[])
}
/**
* Get the type of the Shape or Triple
* @param {String} Shape or Triple
*
 */
function getType(def) {
    let value;
    let yashe = Editor.getYashe();
    if(def.startsWith('<')){
        value = def.split('<')[1].split('>')[0];
        return new IriRef(value);
    }else if(def.startsWith('_:')){
        value = def.split(':')[1];
        return new BNode(value);
    }else{
        value = def.split(':')[1];
        let prefixName = def.split(':')[0];
        let prefixValue = getPrefixValue(prefixName)
        let prefix = new Prefix(prefixName,prefixValue);
        return new PrefixedIri(prefix,value);
    }
}




/**
*   Get an array of Triples
*   @param {Integer} shapeId
*   @param {Array} Shape (Tokens)
*
* */
function getTriples(shapeId,tokens) {
        let triples = [];
        let singleTriple = [];
        let yashe = Editor.getYashe();
        return tokens.reduce((acc,token,index)=>{
           // console.log(singleTriple)
            singleTriple.push(token);
            if(isEndOfTriple(token,index,tokens)){
                let bTokens = getBeforeTripleTokens(singleTriple);
                let content = getContent(acc.length,bTokens,shapeId);
                let stTokens = getTripleTokens(singleTriple);
                let subTriples = getTriples(acc.length,stTokens);
                let triple = new Triple(acc.length,content.type,content.constraint,content.facets,content.shapeRef,content.cardinality,subTriples);
                references.push({entity:triple,ref:content.ref});
                acc.push(triple);
                singleTriple = [];
            }
            return acc;
        },[])
}

function getContent(id,tokens,entityId) {   
    let type;
    let constraint;
    let valueSet = [];
    let facets = [];
    let cardinality= new TypesFactory().createType('');
    let shapeRef = new ShapeRef();
    let ref;

    //I am using a for loop just because of the facets (see line 233)
    for(let i=0;i<tokens.length;i++){
        let token = tokens[i];
        if(token.type == 'string-2' || token.type == 'variable-3' || token.type=='shape'){
            type = getType(token.string);
        }
        if(token.type == 'constraint' || token.type == 'constraintKeyword' ){
            constraint = getConstraint(token.string);
        }
        

        if(token.type == 'valueSet'){
            if(token.string.startsWith('@')){// LANTAG NOT SUPPORTED AT THE MOMENT
                Codemirror.signal(Editor.getYashe(),'forceError','LANTAG_ERR');
            }else{
                 valueSet.push(new ValueSetValue(valueSet.length,getValueSetValue(token.string)));
            }
        }

        if(token.type == 'shapeRef' ){
            ref = getRefName(token.string);
        }

        if(token.type == 'facet'){
            i++;//I Need the next value
            let value = tokens[i].string;
            let id =facets.length;
            let type = token.string.toLowerCase();
            facets.push(new Facet(id,type,value));
        }


        if(token.type == 'cardinality'){
          cardinality=getCardinality(token.string);
        }
        
        if( token.type != 'string-2' && 
            token.type != 'variable-3' &&
            token.type != 'shape' &&
            token.type != 'constraint' && 
            token.type != 'constraintKeyword' && 
            token.type != 'valueSet' && 
            token.type != 'shapeRef' && 
            token.type != 'facet' && 
            token.type != 'cardinality' && 
            token.type != 'punc' &&
            token.type !='comment'){

            Codemirror.signal(Editor.getYashe(),'forceError');
        }

       
        // Force errors in case to find one of the following tokens

        if(token.string == '~'){
            Codemirror.signal(Editor.getYashe(),'forceError','EXCLUSION_ERR');
        }

        if(token.string == '('){
            Codemirror.signal(Editor.getYashe(),'forceError','PARENTHESIS_ERR');
        }
            
  
    }
    if(valueSet.length>0)constraint=new ValueSet(valueSet);
    return {type:type,constraint:constraint,facets:facets,shapeRef:shapeRef,ref:ref,cardinality:cardinality};
}


/**
*   Get the tokens before a tripleExpr. We start collecting the tokens before find '{' token
*   @param {Array} Shape (Tokens)
*   @return {Array} Tokens
*
*/
function getBeforeTripleTokens(shape){
    let start=true;
    return shape.reduce((acc,t)=>{
        if(t.string=='{')start=false;
        if(start)acc.push(t);
        return acc;
    },[])
}

/**
*   Get the triple tokens. We start collecting the tokens after find '{' token until find the correspondig '}'
*   @param {Array} Shape (Tokens)
*   @return {Array} Tokens
*
*/
function getTripleTokens(shape){
    let start=false;
    let open = 0;
    return shape.reduce((acc,t)=>{
        if(start)acc.push(t);
        if(t.string=='{'){
            open++;
            start=true;
        }

        if(t.string=='}'){
            open--;
            start=true;
        }

        if(open == 0 && start==true)start=false;
        return acc;
    },[])
}

/**
 * Returns true in case the token represent the end of a Triple
 * @param {Object} Token
 * @param {Integer} Index
 * @param {Array} TripleTokens
 *
 */
function isEndOfTriple(token,index,tTokens){
    if((token.type == 'punc' &&  token.string==';')// finish of the triple ';' 
        || index==tTokens.length-1){  // finish of the last triple without ';'

        return true;
    }
    return false;
}


/**
*   Get the constraint of the Triple
*   @param {String} Token
*   @return {Type}
*/
function getConstraint(def) {
    let factory = new TypesFactory();
    let type = factory.createType(def.toLowerCase());
    //Isn't a Prefixed/Iri/Primitive?
    if(type!=undefined)return type;

    type = getType(def);
    //Is a Primitive?
    if(type.getTypeName() == 'prefixedIri' && isPrimitive(type.value)){
        let kind = def.split(':')[1];
        return new Primitive(kind);
    }

    return type;
}


/**
*   Get the Cardinality Object
*   @param {String} Cardinality
*   @return {Cardinality|String} Cardinality
* */
function getCardinality(card){
    let factory = new CardinalityFactory();
    if(card.length==1)return factory.createCardinality(card);//Is it a simple card?
    let range = card.split('{')[1].split('}')[0].split(','); //I know...
    let min = range[0];
    let max;
    if(range.length>1){
        max = range[1];
    }

    let context = 'range';
    if(max == undefined){
        context = 'exactly';
    }
    if(max == '' || max == '*'){
        context = 'minLimit';
    }

    return factory.createCardinality(context,min,max);
}


/**
* Get the type of a valueSetValue
* @param {String} Token
* @return {Type} ValueSetValue
*
 */
function getValueSetValue(def) {
    let value = def.toLowerCase();
    if(!isNaN(def)) return new NumberLiteral(def);
    if(def.startsWith('"')) return new StringLiteral(def.substring(1,def.length-1));//remove the ""
    if(value == 'true' || value == 'false') return new BooleanLiteral(value);
    return getType(def);
}


function updateShapeRefs(shapes) {
    for(let r in references){
        let element = references[r];
        if(element.ref!=undefined){
            let shapeRef = shexUtils.getShapeByName(shapes,element.ref);
            element.entity.shapeRef.shape = shapeRef;
        }
    }
}


/**
 * Returns the value of a specific prefix by its alias
 * @param {String} prefixName
 * @return {String} prefixValue
 *
 */
function getPrefixValue(prefixName){
    let defPrefixes = Editor.getYashe().getDefinedPrefixes();
    return defPrefixes[Object.keys(defPrefixes).filter(p=>{
        return p==prefixName;
    })]; 
}


/**
 * Returns true if the value is a primitive Type: 
 * ['string','integer','date','boolean']
 * @param {String} Value
 * @return {Boolean} 
 *
 */
function isPrimitive(value) {
    return PRIMITIVES.reduce((acc,p)=>{
        if(p == value) acc=true;
        return acc;
    },false)
}

/**
 * Returns the name of the shapeRef. It just remove the @
 * @param {String} ShapeRef
 * @return {String} ShapeName
 */
function getRefName(ref) {
    return ref.split('@')[1];
}


/**
 * Returns all the tokens except ws tokens (eg: WhiteSpaces)
 * @param {Array} Tokens
 * @return {Array} Tokens
 *
*/
function getNonWsTokens(tokens){
    return tokens.filter(function(obj){
        return obj.type != 'ws';
    })
}

const tokenUtils = {
    getTokens:getTokens,
    getDefinedShapes:getDefinedShapes,
    getShapes:getShapes,
    updateShapeRefs:updateShapeRefs
}

export default tokenUtils;