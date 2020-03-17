import React,{useContext} from 'react';
import {AppContext} from '../../../App';

function AssistError (props) {

    const context = useContext(AppContext);

    return (<div className={context.error}></div>);
}


export default AssistError;

