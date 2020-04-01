import {SHAPE_COLORS,
        TRIPLE_COLORS,
        CONSTRAINT_COLORS,
        FACET_COLORS,
        SHAPEREF_COLORS,
        CARDINALITY_COLORS} from './colors';
        
//Singleton Pattern
const Styles = (()=> {

    function StyleClass(){

        
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
    
    }

   

    let instance;

    return{
        getInstance: ()=>{
            if(!instance){
                instance = new StyleClass();
            }
            return instance;
        }

    }

})();


export default Styles;