import React,{useContext} from 'react';
import {ShapesContext} from '../../../App';

import {downloadFile} from '../../../utils/toolbarUtils';

function DownloadBtn () {

    const context = useContext(ShapesContext);


    return (
        <button className="svgBtnCont"
                type="button" 
                title="Download"
                onClick={downloadFile}>
                <svg className="svgBtn" 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="25" 
                    height="30" 
                    baseProfile="tiny" 
                    viewBox="0 0 100 100">
                    <path d="M88 84v-2c0-2.96-.86-4-4-4H16c-2.96 0-4 .98-4 4v2c0 3.102 1.04 4 4 4h68c3.02 0 4-.96 4-4zM58 12H42c-5 0-6 .94-6 6v22H16l34 34 34-34H64V18c0-5.06-1.06-6-6-6z"/>
                </svg>
        </button>  );
    
  
}

export default DownloadBtn;

