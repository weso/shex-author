import React,{useContext} from 'react';
import {AppContext} from '../../../App';

function AssistError (props) {

    const context = useContext(AppContext);

    return (<div className={context.error}>
                <div className='shapeErrorCont'>
                    <div className='shapeError'></div>
                    <p>{context.errorMsg}</p>
                </div>
            </div>);
}


export default AssistError;

