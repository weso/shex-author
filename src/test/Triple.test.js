import Shape from '../entities/shexEntities/triple';
import Triple from '../entities/shexEntities/triple';

import IrirRef from '../entities/shexEntities/types/concreteTypes/iriRef';
import PrefixedIri from '../entities/shexEntities/types/concreteTypes/prefixedIri';
import Primitive from '../entities/shexEntities/types/concreteTypes/primitive';
import BlankKind from '../entities/shexEntities/types/concreteTypes/kinds/blankKind';
import Literal from '../entities/shexEntities/types/concreteTypes/kinds/literal';
import InlineShape from '../entities/shexEntities/shexUtils/inlineShape';


test('Default Triple', ()=>{
    let triple = new Triple(0);
    expect(triple.id==0).toBeTruthy();
    expect(triple.type instanceof IrirRef).toBeTruthy();
    expect(triple.value instanceof IrirRef).toBeTruthy();
    expect(triple.inlineShape instanceof InlineShape).toBeTruthy();
    expect(triple.cardinality == '').toBeTruthy();
});

test('Change TripleID', ()=>{
    let triple = new Triple(0);
    triple.id=2;
    expect(triple.id==2).toBeTruthy();
});

test('Change Triple Type', ()=>{
    let triple = new Triple(0);
    triple.type = new PrefixedIri('shapeName');
    expect(triple.type instanceof PrefixedIri).toBeTruthy();
});


test('Change Triple Type value', ()=>{
    let triple = new Triple(0);
    triple.type.value = 'newValue';
    expect(triple.type.value == 'newValue').toBeTruthy();
});


test('Change Value Type', ()=>{
    let triple = new Triple(0);
    triple.value = new Literal();
    expect(triple.value instanceof Literal).toBeTruthy();
});


test('Change Value', ()=>{
    let triple = new Triple(0);
    triple.value.value = 'integer';
    expect(triple.value.value == 'integer').toBeTruthy();
});


test('Change InlineShape', ()=>{
    let shape = new Shape(0);
    let triple = new Triple(0);
    triple.inlineShape = shape;
    expect(triple.inlineShape == shape).toBeTruthy();
});


test('Change Cardinality', ()=>{
    let triple = new Triple(0);
    triple.cardinality = '*';
    expect(triple.cardinality == '*').toBeTruthy();
});


test('Draw Default Triple', ()=>{
    let triple = new Triple(0);
    let expectedStr = '<><>;';
    let tripleStr = triple.toString().replace(/\s/g,'');
    expect(tripleStr ==expectedStr).toBeTruthy();
});

test('Draw Modified Triple', ()=>{
    let triple = new Triple(0);
    triple.type.value = 'Wikidata';
    let expectedStr = '<Wikidata><>;';
    let tripleStr = triple.toString().replace(/\s/g,'');
    expect(tripleStr ==expectedStr).toBeTruthy();
});
