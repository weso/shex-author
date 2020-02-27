import React,{useContext,useState} from 'react';
import {AppContext} from '../../App';
import { Collapse } from 'reactstrap';
import { Resizable } from "re-resizable";
import AssistTitle from './assistant/AssistTitle';
import AssistContent from './assistant/AssistContent';
import AssistLoader from './assistant/AssistLoader';
import '../../css/Assistant.css';

export const AssistContext = React.createContext();

function AssistantComp (props) {

        const context = useContext(AppContext);
        const [width,setWidth] = useState(700);

        //Responsive
        const [shapeHeader,setShapeHeader] = useState('header');
        const [tripleHeader,setTripleHeader] = useState('tripleHeader');
        const [triplesContainer,setTriplesContainer] = useState('triples');
        const [shapeLabel,setShapeLabel] = useState('shapeNameLabel');
        const [tripleLabel,setTripleLabel] = useState('tripleNameLabel');
        const [tripleBtns,setTripleBtns] = useState('tripleBtns');
        const [addBtns,setAddBtns] = useState('addBtns');
        const [gridClass,setGridClass] = useState('gridBox');


        const makeItResponsive = function(e, direction, ref, d){
                setWidth(width+d.width);

                if(width+d.width<700){
                        setShapeHeader('xs-header');
                        setTripleHeader('xs-tripleHeader');
                        setTripleBtns('xs-tripleBtns');
                        setTriplesContainer('xs-triples');
                        setShapeLabel('xs-label');
                        setTripleLabel('xs-label');
                        setAddBtns('xs-addBtns');
                        setGridClass('xs-gridBox');
                        return;
                }
                        
                setShapeHeader('header')                                          
                setTripleHeader('tripleHeader');
                setTripleBtns('tripleBtns');
                setTriplesContainer('triples');
                setShapeLabel('shapeNameLabel');
                setTripleLabel('tripleNameLabel');
                setAddBtns('addBtns');
                setGridClass('gridBox');
        }


        return (
                <AssistContext.Provider value={
                  {
                  shapeHeader:shapeHeader,
                  tripleHeader:tripleHeader,
                  triplesContainer:triplesContainer,
                  shapeLabel:shapeLabel,
                  tripleLabel:tripleLabel,
                  tripleBtns:tripleBtns,
                  addBtns:addBtns,
                  gridClass:gridClass
                  }
                }>
                        <Collapse isOpen={context.isAssistantOpen} className='row assistCollapse'>
                                <Resizable  className="col row resizable"
                                        size={{ width: width }}                    
                                        onResizeStop={makeItResponsive}              
                                        enable={{right:true}}>
                        
                                        <div className='col containerAssist'>                                    
                                                <div className="globalAssis">
                                                        <AssistTitle/>
                                                        <AssistContent/>
                                                        <AssistLoader/>
                                                </div>
                                        </div>
                                </Resizable>     
                        </Collapse>
                </AssistContext.Provider>    
                );
    
}

/*

   <div className={context.valid}>
                        <p><strong>[Error]</strong> This Shape is very complex for me...</p>
                </div>
*/

export default AssistantComp;
