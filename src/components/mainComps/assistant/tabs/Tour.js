import React,{useContext} from 'react';
import Codemirror from 'codemirror';
import {AppContext} from '../../../../App';
import {ShepherdTour, ShepherdTourContext} from 'react-shepherd';
import Editor from '../../../../entities/editor';
import shexUtils from '../../../../utils/shexUtils';
import {defaultExample} from '../../../../galery/defaultExample';
import 'shepherd.js/dist/css/shepherd.css';
import '../../../../css/tour/tour.css';

function Tour () {

    const context = useContext(AppContext);

    
     const newSteps =  [
       {
        id: 'welcome',
        text: [
          `
          <p>
          Welcome to ShExAuthor, a playground where 
          you can create Shapes in a much more visual way <br>
          
          </p>
          `
        ],
       
        classes: 'shepherd shepherd-welcome',
        buttons: [
          {
            type: 'cancel',
            classes: 'shepherd-button-secondary',
            text: 'Exit'
          },
          {
            type: 'next',
            text: 'Start Tutorial'
          }
        ]
        
      },
      {
        id: 'assistant',
        text: [
          `
          <p>
          This is the ShEx Assistant
          </p>
          `
        ],
        attachTo: { element: '.assistCollapse', on: 'right' },
        classes: 'shepherd shepherd-welcome',
        buttons: [
          {
            type: 'back',
            classes: 'shepherd-button-secondary',
            text: 'Back'
          },
          {
            type: 'next',
            text: 'Start'
          }
        ]
      },
      {
        id: 'createShape',
        text: [
          `
          <p>
         Let's create a new Shape
          </p>
          `
        ],
        attachTo: { element: '.xs-addShapeButton', on: 'bottom' },
        classes: 'shepherd shepherd-welcome',
        buttons: [
          {
            type: 'back',
            classes: 'shepherd-button-secondary',
            text: 'Back'
          },
          {
            type: 'next',
            text: 'Next'
          }
        ],
        when: {
          show: () => {
            context.replaceShapes([]);
            Editor.getYashe().setValue("");
          },
          hide: () => {
            let shape = shexUtils.addShape(context.shapes,context.width);
            context.replaceShapes([shape]);
            Codemirror.signal(Editor.getYashe(),'humanEvent',[shape],context.width);
          }
        }
      },
      {
        id: 'shape',
        text: [
          `
          <p>
         This is your new Shape. A shape defines the constraints that a node must satisfy
          </p>
          `
        ],
        attachTo: { element: '.shape', on: 'left' },
        classes: 'shepherd shepherd-welcome',
        buttons: [
          {
            type: 'back',
            classes: 'shepherd-button-secondary',
            text: 'Back'
          },
          {
            type: 'next',
            text: 'Next'
          }
        ]
      },
      {
        id: 'shapeName',
        text: [
          `
          <p>
         Let's give it a name
          </p>
          `
        ],
        attachTo: { element: '#shapeNameInput', on: 'bottom' },
        classes: 'shepherd shepherd-welcome',
        buttons: [
          {
            type: 'back',
            classes: 'shepherd-button-secondary',
            text: 'Back'
          },
          {
            type: 'next',
            text: 'Next'
          }
        ],
        when: {
          show: () => {
           
          },
          hide: () => {
            let shape = shexUtils.addShape(context.shapes,context.width);
            shape.type.value = 'User';
            context.replaceShapes([shape]);
            Codemirror.signal(Editor.getYashe(),'humanEvent',[shape],context.width);
          }
        }
      },
      {
        id: 'shapeName',
        text: [
          `
          <p>
          Check your new Shape in the Editor. <br>
          A Shape must be an <a href='https://en.wikipedia.org/wiki/Internationalized_Resource_Identifier'>IRI.</a>
          (string of characters that unambiguously identifies a particular resource)<br> 
          There is two ways of represent IRIs in ShEx. As a Qname setting the IRI betwen '<...>' or
          using a prefix previously defined.
          </p>
          `
        ],
        attachTo: { element: '.cm-shape', on: 'bottom' },
        classes: 'shepherd shepherd-welcome',
        buttons: [
          {
            type: 'back',
            classes: 'shepherd-button-secondary',
            text: 'Back'
          },
          {
            type: 'next',
            text: 'Next'
          }
        ]
      },
      {
        id: 'prefixes',
        text: [
          `
          <p>
          Click in the Prefixes tab in order to define a new prefix. 
          </p>
          `
        ],
        attachTo: { element: '.prefixTab', on: 'bottom' },
        classes: 'shepherd shepherd-welcome',
        buttons: [
          {
            type: 'back',
            classes: 'shepherd-button-secondary',
            text: 'Back'
          },
          {
            type: 'next',
            text: 'Next'
          }
        ],
         when: {
          hide: () => {
            
          }
        }
      }];


function Button() {
  const tour = useContext(ShepherdTourContext);
  tour.addSteps(newSteps);
  console.log(tour.steps)

  return (
   <button className="tablink material-icons " 
              
                title="Tour"
                onClick={tour.start}>
                tour
        </button>
  );
}


    return (
      
        <Button/> );
    
}


export default Tour;


