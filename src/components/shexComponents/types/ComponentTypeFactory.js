import React from 'react';

import IriComp from './concrete/IriComp';
import BNodeComp from './concrete/BNodeComp';
import PrimitiveComp from './concrete/PrimitiveComp';
import ShapeRefComp from './concrete/ShapeRefComp';
import PrefixedComp from'./concrete/PrefixedComp';

function ComponentTypeFactory (props) {

    const {shape,triple,value,type,instance} = props;
    console.log(instance)
    
    if(instance == 'iriRef'){

        return <IriComp shape={shape} triple={triple} type={type}/>

    }else if(instance == 'prefixedShape'){

        return <PrefixedComp  element={shape}/>

    }
    else if(instance == 'prefixedTriple'){

        return <PrefixedComp  element={triple}/>

    }
    else if(instance == 'prefixedValue'){
        return <PrefixedComp  element={value}/>

    }
    else if(instance == 'bnodeType'){

        return <BNodeComp shape={shape}/>

    }
    else if(instance == 'primitive'){
        
        return  <PrimitiveComp value={value}/>

    }else if(instance == 'shape'){
        
        return  <ShapeRefComp shape={shape}triple={triple}/>

    }
        
    return null;
    
                                   
}

export default ComponentTypeFactory;

