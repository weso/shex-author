import Shape from '../entities/shexEntities/shape';
import Triple from '../entities/shexEntities/triple';

import IrirRef from '../entities/shexEntities/types/concreteTypes/iriRef';
import PrefixedIri from '../entities/shexEntities/types/concreteTypes/prefixedIri';
import Primitive from '../entities/shexEntities/types/concreteTypes/primitive';
import BlankKind from '../entities/shexEntities/types/concreteTypes/kinds/blankKind';
import Literal from '../entities/shexEntities/types/concreteTypes/kinds/literal';
import InlineShape from '../entities/shexEntities/shexUtils/inlineShape';

import shexUtils from '../utils/shexUtils';

test('addShape', ()=>{
    let shapes=[];
    expect(shapes.length==0).toBeTruthy();
    shapes.push(shexUtils.addShape(shapes));
    expect(shapes.length==1).toBeTruthy();
});

test('deleteShape', ()=>{
    let shapes=[];
    expect(shapes.length==0).toBeTruthy();
    shapes.push(shexUtils.addShape(shapes));
    expect(shapes.length==1).toBeTruthy();
    shapes = shexUtils.deleteShape(shapes,0,true);
    expect(shapes.length==1).toBeTruthy();
});

test('getShapeById', ()=>{
    let shapes=[];
    let shape = new Shape(0);
    shapes.push(shape);
    expect(shapes.length==1).toBeTruthy();
    let expectedShape = shexUtils.getShapeById(shapes,0);
    expect(expectedShape==shape).toBeTruthy();
});

test('getShapeByName', ()=>{
    let shapes=[];
    let shape = new Shape(0);
    shape.type.value = 'newValue';
    shapes.push(shape);
    expect(shapes.length==1).toBeTruthy();
    let expectedShape = shexUtils.getShapeByName(shapes,'newValue');
    expect(expectedShape==shape).toBeTruthy();
});

test('getTripleById', ()=>{
    let shape = new Shape(0);
    let triple = new Triple(8);
    shape.triples.push(triple);
    expect(shape.triples.length==1).toBeTruthy();
    let expectedTriple = shexUtils.getTripleById(shape,8);
    expect(expectedTriple==triple).toBeTruthy();
});