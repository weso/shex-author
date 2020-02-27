import React,{useContext} from 'react';
import {AppContext} from '../../../App';

function AssistLoader (props) {

    const context = useContext(AppContext);

    return (<div className={context.loading}>
                <div className="loader"></div>
            </div>);
}


export default AssistLoader;

