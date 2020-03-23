import TypesFactory from './types/typesFactory';
import CardinalityFactory from './shexUtils/cardinality/cardinalityFactory';
import CardinalitySimple from './shexUtils/cardinality/cardinalitySimple';
import PrefixedIri from './types/concreteTypes/prefixedIri';
import Primitive from './types/concreteTypes/primitive';
import ShapeRef from './shexUtils/shapeRef';
import Prefix from './shexUtils/prefix';

class Triple {

    constructor(id,type=new PrefixedIri(new Prefix('schema','http://schema.org/')),constraint=new Primitive(),shapeRef=new ShapeRef(),facets=[],cardinality=new CardinalitySimple()) {
        this.id = id;
        this.type = type;
        this.constraint = constraint;
        this.shapeRef = shapeRef;
        this.facets = facets;
        this.cardinality = cardinality;
        this.factory = new TypesFactory();
        this.cardFactory = new CardinalityFactory();
      }
      
    addValue(constraint){
        this.constraints.push(constraint);
        this.constraintsCount++;
    }
    
    addFacet(facet){
        this.facets.push(facet);
    }

    getId(){
        return this.id;
    }

    getType(){
      return this.type; 
    }

    setType(type){
       this.type = this.factory.createType(type);
     }

    setConstraint(constraint){
        this.constraint = this.factory.createType(constraint);
    }

    setCardinality(cardinality,min,max){
        this.cardinality = this.cardFactory.createCardinality(cardinality,min,max);
    }

    getShapeRef(){
        return this.shapeRef;
    }

    setShapeRef(shapeRef){
        this.shapeRef = shapeRef;
    }


    getFacets(){
        return this.facets;
    }

    setFacets(facets){
        this.facets = facets;
    }

    getConstraint(){
       return this.constraint;
    }


    getCardinality(){
        return this.cardinality;
    }



    toString(separator){
        let str='';
        let type=this.getType();
        let constraint = this.getConstraint();
        let facets = this.getFacets();
        let shapeRef = this.getShapeRef();
        let cardinality = this.getCardinality();
        if(type.value!=''){
            str+= '  '+type+separator+constraint+' ';
            if(facets ){
                facets.map(f=>{
                    str+=' '+f+' ';
                })
            }
            str+= shapeRef+' '+cardinality+'  ;\n';
        }
        return str;

    }




}

export default Triple;