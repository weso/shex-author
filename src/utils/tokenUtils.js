
import Codemirror from 'codemirror';
import Editor from '../entities/editor';
import shexUtils from './shexUtils';
import Shape from '../entities/shexEntities/shape';
import Triple from '../entities/shexEntities/triple';
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
import Value from '../entities/shexEntities/others/value';
import ExtraSet from '../entities/shexEntities/others/extraSet';


import AndExpr from '../entities/shexEntities/logic/andExpr';
import OrExpr from '../entities/shexEntities/logic/orExpr';
import LogicFactory from '../entities/shexEntities/logic/logicFactory';


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
            shape.push(element);
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
        let sTokens = getBeforeTriplesTokens(shape);
        let content =  getProperties(id,sTokens);

        let tTokens = getTripleTokens(shape);
        let aux = getTripleTokens2(shape);

        console.log(aux)

        let triples = getTriples(id,tTokens);


        let s = new Shape(id,content.type,content.constraint,content.facets,content.shapeRef,triples,content.extraProperties,content.isClosed);
        references.push({entity:s,ref:content.ref});
        acc.push(s);
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
        let start = false;
        let finish = true;
        let open = 0;
        return tokens.reduce((acc,token,index)=>{
            singleTriple.push(token);             
            if(isFinishOfTriple(tokens,token,index,finish)){
                if(singleTriple.length>1){
                        let before = getBeforeTriplesTokens(singleTriple);
                        let content = getProperties(acc.length,before);
                        let after = getTripleTokens(singleTriple);
                        let subTriples = getTriples(acc.length,after);

                        let cardinality = content.cardinality;
                        //If there is a inlineShape the cardinality comes after it
                        if(after.length>0){
                            let possibleCardinality = getCardinalityIfExist(singleTriple);
                            if(possibleCardinality)cardinality=possibleCardinality;
                        }
              
                        if(content.type != undefined){//Needed when last triple of an inlineShape ends with ';'
                            let triple = new Triple(acc.length,content.type,content.constraint,content.facets,content.shapeRef,cardinality,subTriples,content.extraProperties,content.isClosed);
                            references.push({entity:triple,ref:content.ref});
                            acc.push(triple);
                        }
                }
                singleTriple = [];
            }

            if(token.string=='{'){
                open++;
                start = true;
                finish = false;
            }
                
            if(token.string=='}') open--;
            if(open==0 && start)finish=true;
     
            return acc;
        },[])
}


/**
* Checks if it's the finish of the triple
* @param {List} Tokens
* @param {Object} Token
* @param {Integer} Index of token
* @param {Boolean} Finish -> Has the inlineShape finished?
* */
function isFinishOfTriple(tokens,token,index,finish){
    return (token.string == ';' && finish) || index == tokens.length-1;
}

/**
* Returns the cardinality after a inlineShape If Exists
* @param {List} TripleTokens
* @return {Cardinality}
 */
function getCardinalityIfExist(tokens){
    return getCardiTokens(tokens).reduce((acc,t)=>{
        if(t.type=='cardinality')acc=getCardinality(t.string);
        return acc;
    },null)
}

/**
* Gets the tokens after the inlineShape
* @param {List} Tokens
* @param {List} Tokens after inlineShape
* */
function getCardiTokens(tokens){
    let start=false;
    let open = 0;
    return tokens.reduce((acc,t)=>{
        if(t.string=='{'){
            open++;
            start=true;
        }

        if(t.string=='}'){
            open--;
        }

        if(open == 0 && start==true)acc.push(t);
        return acc;
    },[])
}


/**
* Gets the features of a Shape/Triple except a possible inlineShape
* @param {Integer} id
* @param {List} Tokens
*
*/
function getProperties(id,tokens) {   
    let type;
    let constraint;
    let valueSet = [];
    let facets = [];
    let cardinality= new CardinalityFactory().createCardinality();
    let shapeRef = new ShapeRef();
    let extraProperties = new ExtraSet();
    let isClosed = false;
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
                 valueSet.push(new Value(valueSet.length,getValueSetValue(token.string)));
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


        if(token.type == 'keyword'){
            if(token.string.toLowerCase()=='extra'){
                i++// we want the next token
                while(tokens[i] && (tokens[i].type=='string-2' || tokens[i].type=='variable-3')){
                    extraProperties.addValue(new Value(extraProperties.values.length,getType(tokens[i].string)));
                    i++;
                }
            }
            
            if(tokens[i]?.string.toLowerCase()=='closed')isClosed=true;
        }
        
        checkValidity(token);
        
    }

    if(valueSet.length>0)constraint=new ValueSet(valueSet);
    return {type:type,constraint:constraint,facets:facets,shapeRef:shapeRef,ref:ref,cardinality:cardinality,extraProperties:extraProperties,isClosed:isClosed};
}


/**
*   Get the tokens before a tripleExpr. We start collecting the tokens before find '{' token
*   @param {Array} Shape (Tokens)
*   @return {Array} Tokens
*
*/
function getBeforeTriplesTokens(tokens){
    let start=true;
    return tokens.reduce((acc,t,index)=>{
        if(t.string=='{' || index == tokens.length-1)start=false;
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
function getTripleTokens(tokens){
    let start=false;
    let open = 0;
    return tokens.reduce((acc,t)=>{
        if(start)acc.push(t);
        if(t.string=='{'){
            open++;
            start=true;
        }

        if(t.string=='}')open--;
        
        if(open == 0 && start==true)start=false;

        return acc;
    },[])
}


function getTripleTokens2(tokens){
    let start=false;
    let open = 0;
    let aux = [];
    let type = 'default';
    let factory = new LogicFactory();
    return tokens.reduce((acc,t)=>{
        if(start)aux.push(t);
         
        if((t.string.toLowerCase()=='and'|| t.string.toLowerCase()=='or') 
            && !start){
                type = t.string.toLowerCase();
        }

        if(t.string=='{'){
            open++;
            start=true;
        }

        if(t.string=='}')open--;
        
        if(open == 0 && start==true){
            start=false;
            acc.push(factory.createType(type,aux))
            //acc.push({type:type,tokens:Object.assign([],aux)});
            aux=[];
        }

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
* Get the type of a value
* @param {String} Token
* @return {Type} Value
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
* Checks if the token is allowed and sends a signal to YASHE if not
* @param {Object} Token
*/
function checkValidity(token){

       // Force errors in case to find one of the following tokens
    if(token.string == '~'){
        Codemirror.signal(Editor.getYashe(),'forceError','EXCLUSION_ERR');
    }

    if(token.string == '('){
        Codemirror.signal(Editor.getYashe(),'forceError','PARENTHESIS_ERR');
    }
            
    if(     token.type != 'string-2' && 
            token.type != 'variable-3' &&
            token.type != 'shape' &&
            token.type != 'constraint' && 
            token.type != 'constraintKeyword' && 
            token.type != 'valueSet' && 
            token.type != 'shapeRef' && 
            token.type != 'facet' && 
            token.type != 'cardinality' && 
            token.type != 'punc' &&
            (token.type != 'keyword' && token.string.toLowerCase()=='prefix') &&
            token.type != 'prefixDelcAlias' &&
            token.type != 'prefixDelcIRI' &&
            token.type !='comment' ){

        Codemirror.signal(Editor.getYashe(),'forceError');
    }
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

//HAY QUE METER TODOS (Update... igual no hace falta...)
const PRIMITIVES = ['string','integer','date','boolean'];



const tokenUtils = {
    getTokens:getTokens,
    getDefinedShapes:getDefinedShapes,
    getShapes:getShapes,
    updateShapeRefs:updateShapeRefs
}

export default tokenUtils;