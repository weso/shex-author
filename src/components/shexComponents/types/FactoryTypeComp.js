
import React from 'react';

import IriComp from './concrete/IriComp';
import PrefixedComp from './concrete/PrefixedComp';
import BNodeComp from './concrete/BNodeComp';
import PrimitiveComp from './concrete/PrimitiveComp';
import ShapeRefComp from './concrete/ShapeRefComp';

function FactoryTypeComp (props) {

    const {shape,triple,type,instance} = props;

    if(instance == 'iriRef'){
        return <IriComp shape={shape} triple={triple} type={type}/>
    }

    if(instance == 'prefixedIri'){
        return <PrefixedComp shape={shape} triple={triple} type={type}/>
    }

    if(instance == 'bnode'){
        return <BNodeComp shape={shape}/>
    }

    if(instance == 'primitive'){
        return  <PrimitiveComp shape={shape} triple={triple}/>
    }

    if(instance == 'primitive'){
        return  <ShapeRefComp shape={shape}triple={triple}/>
    }
                                   
}

export default FactoryTypeComp;

