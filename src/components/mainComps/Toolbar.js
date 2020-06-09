import React, {useContext} from 'react';
import { Collapse } from 'reactstrap';
import {AppContext} from '../../App'; 
import AssistBtn from './toolbar/AssistBtn';
import TourBtn from './toolbar/TourBtn';
import UndoBtn from './toolbar/UndoBtn';
import RedoBtn from './toolbar/RedoBtn';
import UploadBtn from './toolbar/UploadBtn';
import DownloadBtn from './toolbar/DownloadBtn';
import ChangeThemeBtn from './toolbar/ChangeThemeBtn';
import GaleryBtn from './toolbar/GaleryBtn';
import DeleteAllBtn from './toolbar/DeleteAllBtn';
import ScrollBtn from './toolbar/ScrollBtn';

import '../../css/navComponents/Toolbar.css';


function Toolbar () {

    const context = useContext(AppContext);

    return (
    <Collapse isOpen={context.isToolBarOpen} className="col-xs-1 toolbarCollapse">
        <div className='toolbar'>
                <div className='toolbarTop'>                    
                    <AssistBtn/>
                    <TourBtn/>
                    <UndoBtn/>
                    <RedoBtn/>
                    <UploadBtn/>
                    <DownloadBtn/>
                    <ChangeThemeBtn/>
                    <GaleryBtn/>
                    <DeleteAllBtn/>
                </div>                     

                <div className='toolbarBottom'>
                    <ScrollBtn/> 
                </div>
        </div>
    </Collapse>);
    
    
}


export default Toolbar;
