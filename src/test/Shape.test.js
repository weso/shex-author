import Shape from '../entities/shexEntities/shape';
import Triple from '../entities/shexEntities/triple';

import IrirRef from '../entities/shexEntities/types/concreteTypes/iriRef';
import PrefixedIri from '../entities/shexEntities/types/concreteTypes/prefixedIri';
import BlankKind from '../entities/shexEntities/types/concreteTypes/kinds/blankKind';
import Literal from '../entities/shexEntities/types/concreteTypes/kinds/literal';


test('Default Shape', ()=>{
    let shape = new Shape(0);
    expect(shape.id==0).toBeTruthy();
    expect(shape.type instanceof IrirRef).toBeTruthy();
    expect(shape.triples.length==0).toBeTruthy();
    expect(shape.qualifier instanceof BlankKind).toBeTruthy();
});

test('Change ShapeID', ()=>{
    let shape = new Shape(0);
    shape.id=2;
    expect(shape.id==2).toBeTruthy();
});

test('Change Shape Type', ()=>{
    let shape = new Shape(0);
    shape.type = new PrefixedIri('shapeName');
    expect(shape.type instanceof PrefixedIri).toBeTruthy();
});


test('Change Shape Type value', ()=>{
    let shape = new Shape(0);
    shape.type.value = 'newValue';
    expect(shape.type.value == 'newValue').toBeTruthy();
});

test('Change Shape Qualifier', ()=>{
    let shape = new Shape(0);
    shape.qualifier = new Literal();
    expect(shape.qualifier instanceof Literal).toBeTruthy();
});

test('Add Triple', ()=>{
    let shape = new Shape(0);
    expect(shape.triples.length==0).toBeTruthy();
    shape.addTriple(new Triple(0));
    expect(shape.triples.length==1).toBeTruthy();
});

test('Remove Triple', ()=>{
    let shape = new Shape(0);
    expect(shape.triples.length==0).toBeTruthy();
    shape.addTriple(new Triple(0));
    expect(shape.triples.length==1).toBeTruthy();
    shape.removeTriple(0);
    expect(shape.triples.length==0).toBeTruthy();
});

test('Draw Default Shape', ()=>{
    let shape = new Shape(0);
    let expectedStr = '<>{}';
    let shapeStr = shape.toString().replace(/\s/g,'');
    expect(shapeStr ==expectedStr).toBeTruthy();
});

test('Draw Modified Shape', ()=>{
    let shape = new Shape(0);
    shape.type.value = 'Wikidata';
    let expectedStr = '<Wikidata>{}';
    let shapeStr = shape.toString().replace(/\s/g,'');
    expect(shapeStr ==expectedStr).toBeTruthy();
});

test('Draw Shape with Triples', ()=>{
    let shape = new Shape(0);
    shape.type.value = 'Wikidata';
    shape.addTriple(new Triple(0));
    shape.addTriple(new Triple(1));
    let expectedStr = '<Wikidata>{<><>;<><>;}';
    let shapeStr = shape.toString().replace(/\s/g,'');
    expect(shapeStr ==expectedStr).toBeTruthy();
});