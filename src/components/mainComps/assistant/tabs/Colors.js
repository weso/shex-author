import React,{useContext,useState} from 'react';
import ShapeColors from './color/ShapeColors';
import PrefixColors from './color/PrefixColors';

function Colors (props) {

        return ( <div>
                    <ShapeColors/>
                    <br/>
                    <PrefixColors/>
                </div>);
}

export default Colors;