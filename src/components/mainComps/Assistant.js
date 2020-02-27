import React,{useContext,useState} from 'react';
import {ShapesContext} from '../../App';
import { Collapse } from 'reactstrap';
import { Resizable } from "re-resizable";
import AssistTitle from './assistant/AssistTitle';
import AssistContent from './assistant/AssistContent';
import AssistLoader from './assistant/AssistLoader';
import '../../css/Assistant.css';

function AssistantComp (props) {

        const context = useContext(ShapesContext);
        const [width,setWidth] = useState(700);

        //Responsive
        const [shapeClass,setShapeClass] = useState('header');
        const [tripleClass,setTripleClass] = useState('tripleHeader');
        const [triplesContainer,setTriplesContainer] = useState('triples');
        const [shapeLabel,setShapeLabel] = useState('shapeNameLabel');
        const [tripleLabel,setTripleLabel] = useState('tripleNameLabel');
        const [tripleBtns,setTripleBtns] = useState('tripleBtns');
        const [addBtns,setAddBtns] = useState('addBtns');
        const [gridClass,setGridClass] = useState('gridBox');


        const makeItResponsive = function(e, direction, ref, d){
                setWidth(width+d.width);

                if(width+d.width<700){
                        setShapeClass('xs-header');
                        setTripleClass('xs-tripleHeader');
                        setTripleBtns('xs-tripleBtns');
                        setTriplesContainer('xs-triples');
                        setShapeLabel('xs-label');
                        setTripleLabel('xs-label');
                        setAddBtns('xs-addBtns');
                        setGridClass('xs-gridBox');
                        return;
                }
                        
                setShapeClass('header')                                          
                setTripleClass('tripleHeader');
                setTripleBtns('tripleBtns');
                setTriplesContainer('triples');
                setShapeLabel('shapeNameLabel');
                setTripleLabel('tripleNameLabel');
                setAddBtns('addBtns');
                setGridClass('gridBox');
        }


        return (
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
                );
    
}

/*

   <div className={context.valid}>
                        <p><strong>[Error]</strong> This Shape is very complex for me...</p>
                </div>
*/

export default AssistantComp;
