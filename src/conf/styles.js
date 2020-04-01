import {SHAPE_COLORS,TRIPLE_COLORS} from './colors';
//Singleton Pattern
const Style = (()=> {

    function StyleClass(){

        
        this.getShapesStyle = function(){
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

        this.getTriplesStyle = function(){
            return {       
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


export default Style;