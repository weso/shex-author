import React from 'react';

import IriComp from './concrete/IriComp';
import PrefixedComp from './concrete/PrefixedComp';
import BNodeComp from './concrete/BNodeComp';
import PrimitiveComp from './concrete/PrimitiveComp';
import ShapeRefComp from './concrete/ShapeRefComp';

function ComponentTypeFactory (props) {

    const {shape,triple,type,instance} = props;

    if(instance == 'iriRef'){
        
        return <IriComp shape={shape} triple={triple} type={type}/>

    }
    else if(instance == 'prefixedIri'){

        return <PrefixedComp shape={shape} triple={triple} type={type}/>

    }
    else if(instance == 'bnodeType'){

        return <BNodeComp shape={shape}/>

    }
    else if(instance == 'primitive'){
        
        return  <PrimitiveComp shape={shape} triple={triple}/>

    }else if(instance == 'shape'){
        
        return  <ShapeRefComp shape={shape}triple={triple}/>

    }else{
        return null;
    }
                                   
}

export default ComponentTypeFactory;

