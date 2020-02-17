import React from 'react';

function TripleHeader (props) {

    const {triple,deleteTriple,customizeTriple} = props;

    return (
        <div className="tripleHeader">
            <label>Triple </label>
            <input type="text" className="form-control shapeName"/>
            <select className="customSelector">
                    <option value="0">String</option>
                    <option value="1">Integer</option>
                    <option value="2">Boolean</option>
                    <option value="2">Date</option>
            </select>                                            
            <select className="customSelector">
                <option value="">Exactly one</option>
                <option value="*">Zero or more</option>
                <option value="+">One at least</option>
                <option value="?">One or none</option>
            </select>                        
            <button className="accordion mdc-icon-button material-icons" onClick={customizeTriple}>build</button>
            <button className="deleteShapeBtn mdc-icon-button material-icons" onClick={()=>deleteTriple(triple.id)}>delete</button>
        </div>
    );
                                   
    
}


export default TripleHeader;

