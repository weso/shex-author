import React,{useContext} from 'react';
import {AppContext} from '../../../../App';

import {changeTheme} from '../../../../utils/toolbarUtils';

function ChangeThemeBtn () {

    const context = useContext(AppContext);

    return (
         <button  className="svgBtnCont" 
                  type="button" 
                  title="Theme"
                  onClick={changeTheme}>
                  <svg className="svgBtn" 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="25" 
                    height="30" 
                    viewBox="0 0 24 24">
                    <path fill="none" d="M24 0H0v24h24V0z"/>
                    <path d="M6.34 7.93c-3.12 3.12-3.12 8.19 0 11.31C7.9 20.8 9.95 21.58 12 21.58s4.1-.78 5.66-2.34c3.12-3.12 3.12-8.19 0-11.31l-4.95-4.95c-.39-.39-1.02-.39-1.41 0L6.34 7.93zM12 19.59c-1.6 0-3.11-.62-4.24-1.76C6.62 16.69 6 15.19 6 13.59s.62-3.11 1.76-4.24L12 5.1v14.49z"/>
                  </svg>
        </button>  );
    
  
}

export default ChangeThemeBtn;

