import React from 'react';

import IriComp from './concrete/IriComp';
import PrefixedShape from './concrete/PrefixedShape';
import PrefixedTriple from './concrete/PrefixedTriple';
import PrefixedValue from './concrete/PrefixedValue';
import BNodeComp from './concrete/BNodeComp';
import PrimitiveComp from './concrete/PrimitiveComp';
import ShapeRefComp from './concrete/ShapeRefComp';

function ComponentTypeFactory (props) {

    const {shape,triple,type,instance} = props;
    
    if(instance == 'iriRef'){
        
        return <IriComp shape={shape} triple={triple} type={type}/>

    }else if(instance == 'prefixedShape'){

        return <PrefixedShape  shape={shape}/>

    }
    else if(instance == 'prefixedTriple'){

        return <PrefixedTriple  triple={triple}/>

    }
    else if(instance == 'prefixedValue'){

        return <PrefixedValue  triple={triple}/>

    }
    else if(instance == 'bnodeType'){

        return <BNodeComp shape={shape}/>

    }
    else if(instance == 'primitive'){
        
        return  <PrimitiveComp shape={shape} triple={triple}/>

    }else if(instance == 'shape'){
        
        return  <ShapeRefComp shape={shape}triple={triple}/>

    }
        
    return null;
    
                                   
}

export default ComponentTypeFactory;

