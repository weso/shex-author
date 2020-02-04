import React from 'react';

import IriComp from './concrete/IriComp';
import BNodeComp from './concrete/BNodeComp';
import PrimitiveComp from './concrete/PrimitiveComp';
import ShapeRefComp from './concrete/ShapeRefComp';
import PrefixedComp from'./concrete/PrefixedComp';

function ComponentTypeFactory (props) {

    const {shape,triple,value,instance} = props;
    
    if(instance == 'iriShape'){

        return <IriComp element={shape}/>

    }else if(instance == 'iriTriple'){

        return <IriComp element={triple}/>

    }else if(instance == 'iriValue'){

        return <IriComp element={value}/>

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
        
        return  <ShapeRefComp triple={triple}/>

    }
        
    return null;
    
                                   
}

export default ComponentTypeFactory;

