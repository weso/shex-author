import React from 'react';
import Toolbar from './mainComps/toolbar/Toolbar';
import AssistantComp from './mainComps/Assistant';
import EditorComp from './mainComps/EditorComp';

function MainContainer (props) {

    return (
      <div className="globalContainer">       
        <div className="row comps">                     
           <Toolbar/>
           <AssistantComp/>                                              
           <EditorComp/>                       
        </div>
      </div>);

}



export default MainContainer;
