import React,{useState,useContext} from 'react';
import { useCookies } from 'react-cookie';
import {SHAPE_COLORS,
        TRIPLE_COLORS,
        CONSTRAINT_COLORS,
        FACET_COLORS,
        SHAPEREF_COLORS,
        CARDINALITY_COLORS,
        PREFIX_COLORS} from './colors';

import {DEFAULTS} from './config'       ;
//Singleton Pattern
const Properties = (()=> {

    function PropertyClass(){

        const [cookies, setCookie,removeCookie] = useCookies('colors');
       
        this.getShapeStyle = function(){
            return {
                label:{color:SHAPE_COLORS.label},
                header:{background:SHAPE_COLORS.header},
                custom:{
                        color:SHAPE_COLORS.customFill,
                        background:SHAPE_COLORS.custom
                },
                delete:{
                        color:SHAPE_COLORS.deleteFill,
                        background:SHAPE_COLORS.delete
                },
                collapse:{color:SHAPE_COLORS.collapse},
                body:{background:SHAPE_COLORS.body},
                addTriple:{
                        color:SHAPE_COLORS.addTripleFill,
                        background:SHAPE_COLORS.addTriple
                },
                addShape:{
                        color:SHAPE_COLORS.addShapeFill,
                        background:SHAPE_COLORS.addShape
                },
            };  
        }

        this.getTripleStyle = function(){
            return {      
                label:{color:TRIPLE_COLORS.label}, 
                header:{background:TRIPLE_COLORS.header},
                custom:{
                        color:TRIPLE_COLORS.customFill,
                        background:TRIPLE_COLORS.custom
                },
                constraint:{
                        color:TRIPLE_COLORS.constraintFill,
                        background:TRIPLE_COLORS.constraint
                },
                facet:{
                        color:TRIPLE_COLORS.facetFill,
                        background:TRIPLE_COLORS.facet
                },
                shapeRef:{
                        color:TRIPLE_COLORS.shapeRefFill,
                        background:TRIPLE_COLORS.shapeRef
                },
                cardinality:{
                        color:TRIPLE_COLORS.cardinalityFill,
                        background:TRIPLE_COLORS.cardinality
                },
                delete:{
                        color:TRIPLE_COLORS.deleteFill,
                        background:TRIPLE_COLORS.delete
                },
                collapse:{color:TRIPLE_COLORS.collapse},
                body:{background:TRIPLE_COLORS.body},
            }
        }

        this.getConstraintStyle = function(){
            return {
                label:{color:CONSTRAINT_COLORS.label}, 
                body:{background:CONSTRAINT_COLORS.body},
                add:{
                        color:CONSTRAINT_COLORS.addFill,
                        background:CONSTRAINT_COLORS.add
                },
                delete:{
                        color:CONSTRAINT_COLORS.deleteFill,
                        background:CONSTRAINT_COLORS.delete
                },
            };  
        }

        this.getFacetStyle = function(){
            return {
                label:{color:FACET_COLORS.label}, 
                body:{background:FACET_COLORS.body},
                add:{
                        color:FACET_COLORS.addFill,
                        background:FACET_COLORS.add
                },
                delete:{
                        color:FACET_COLORS.deleteFill,
                        background:FACET_COLORS.delete
                },
            };  
        }

        this.getShapeRefStyle = function(){
            return {
                label:{color:SHAPEREF_COLORS.label}, 
                body:{background:SHAPEREF_COLORS.body}
            };  
        }

        this.getCardinalityStyle = function(){
            return {
                label:{color:CARDINALITY_COLORS.label},
                body:{background:CARDINALITY_COLORS.body}
            };  
        }

        this.getCardinalityStyle = function(){
            return {
                label:{color:CARDINALITY_COLORS.label},
                body:{background:CARDINALITY_COLORS.body}
            };  
        }

        this.getPrefixStyle = function(){
            return {
                label:{color:PREFIX_COLORS.label},
                header:{background:PREFIX_COLORS.header},
                delete:{
                        color:PREFIX_COLORS.deleteFill,
                        background:PREFIX_COLORS.delete
                },
                add:{
                        color:PREFIX_COLORS.addFill,
                        background:PREFIX_COLORS.add
                },
                specialLabel:{color:PREFIX_COLORS.specialLabel},
                body:{background:PREFIX_COLORS.body}
            };  
        }




        this.loadCookies = function(){
            this.loadCookie('shapeColors',SHAPE_COLORS);
            this.loadCookie('tripleColors',TRIPLE_COLORS);
            this.loadCookie('constraintColors',CONSTRAINT_COLORS);
            this.loadCookie('facetColors',FACET_COLORS);
            this.loadCookie('shapeRefColors',SHAPEREF_COLORS);
            this.loadCookie('cardinalityColors',CARDINALITY_COLORS);
          
         }

        this.loadCookie = function(cookie,namespace){
            let colors = cookies[cookie];
            if(!colors){
                setCookie(cookie, namespace, { path: '/' });
            }else{
                this.load(colors,namespace);
            }
        }

        this.load = function(colors,namespace){
            //namespace = colors; It doesn't work
            Object.keys(colors).map(c=>{
                namespace[c]=colors[c];
            });
        }


        this.removeCookies = function(){
            removeCookie('shapeColors');
            removeCookie('tripleColors');
            removeCookie('constraintColors');
            removeCookie('facetColors');
            removeCookie('shapeRefColors');
            removeCookie('cardinalityColors');
        }

        this.saveDefaultColors = function(){
            this.defaultShape = Object.assign({}, SHAPE_COLORS);
            this.defaultTriple = Object.assign({}, TRIPLE_COLORS);
            this.defaultConstraint = Object.assign({}, CONSTRAINT_COLORS);
            this.defaultFacet = Object.assign({}, FACET_COLORS);
            this.defaultShapeRef = Object.assign({}, SHAPEREF_COLORS);
            this.defaultCardinality = Object.assign({}, CARDINALITY_COLORS);
        }

        this.restoreDefaultColors = function(){
            this.load(this.defaultShape,SHAPE_COLORS);
            this.load(this.defaultTriple,TRIPLE_COLORS);
            this.load(this.defaultConstraint,CONSTRAINT_COLORS);
            this.load(this.defaultFacet,FACET_COLORS);
            this.load(this.defaultShapeRef,SHAPEREF_COLORS);
            this.load(this.defaultCardinality,CARDINALITY_COLORS);
            this.removeCookies();
        }



        this.saveDefaultColors();
        this.loadCookies();
                
    }

   

    let instance;

    return{
        getInstance: ()=>{
            if(!instance){
                instance = new PropertyClass();
            }
            return instance;
        }

    }

})();


export default Properties;