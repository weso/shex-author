import React,{useContext} from 'react';
import {ShapesContext} from '../../../App';

function AssistLoader (props) {

    const context = useContext(ShapesContext);

    return (<div className={context.loading}>
                <div className="loader"></div>
            </div>);
}


export default AssistLoader;

