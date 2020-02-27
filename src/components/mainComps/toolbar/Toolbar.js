import React, {useContext} from 'react';
import { Collapse } from 'reactstrap';
import {ShapesContext} from '../../../App'; 
import ShowAssist from './btns/ShowAssist';
import VisualizeBtn from './btns/VisualizeBtn';
import PrefixesBtn from './btns/PrefixesBtn';
import UndoBtn from './btns/UndoBtn';
import RedoBtn from './btns/RedoBtn';
import UploadBtn from './btns/UploadBtn';
import DownloadBtn from './btns/DownloadBtn';
import ChangeThemeBtn from './btns/ChangeThemeBtn';
import GaleryBtn from './btns/GaleryBtn';
import DeleteAllBtn from './btns/DeleteAllBtn';
import ScrollBtn from './btns/ScrollBtn';

import '../../../css/navComponents/Toolbar.css';


function Toolbar (props) {

    const context = useContext(ShapesContext);
    const {isLateralNavOpen} = props;

    return (
    <Collapse isOpen={context.isLateralNavOpen} className="col-xs-1 toolbarCollapse">
        <div className='toolbar'>
                <div className='toolbarTop'>                    
                    <ShowAssist/>
                    <VisualizeBtn/>
                    <PrefixesBtn/>
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
