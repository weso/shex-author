import React,{useContext} from 'react';
import Codemirror from 'codemirror';
import {AppContext} from '../../../../App';
import {AssistContext} from '../../Assistant';
import {ShepherdTour, ShepherdTourContext} from 'react-shepherd';
import Editor from '../../../../entities/editor';
import shexUtils from '../../../../utils/shexUtils';
import {defaultExample} from '../../../../galery/defaultExample';
import 'shepherd.js/dist/css/shepherd.css';
import '../../../../css/tour/tour.css';

function Tour () {

    const context = useContext(AppContext);
    const assistContext = useContext(AssistContext);
    const tour = useContext(ShepherdTourContext);

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
            action: () => {
               tour.cancel();
            },
            type: 'cancel',
            classes: 'shepherd-button-secondary',
            text: 'Exit'
          },
          {
            action: () => {
               tour.next();
            },
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
        canClickTarget:false,
        attachTo: { element: '.assistCollapse', on: 'right' },
        classes: 'shepherd shepherd-welcome',
        buttons: [
          {
            action: () => {
               tour.back();
            },
            type: 'back',
            classes: 'shepherd-button-secondary',
            text: 'Back'
          },
          {
            action: () => {
               tour.next();
            },
            type: 'next',
            text: 'Next'
          }
        ],
        beforeShowPromise: function() {
          return new Promise(function(resolve) {
            
            let yashe = Editor.getYashe();
            yashe.setValue(defaultExample);
            Codemirror.signal(yashe,'forceReplacement');

            assistContext.closeAll();

            setTimeout(() => {
              assistContext.setAssistOpen(true);
              resolve();  
            }, 550);
            
          });
        },
        
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
        canClickTarget:false,
        attachTo: { element: '.xs-addShapeButton', on: 'bottom' },
        classes: 'shepherd shepherd-welcome',
        buttons: [
          {
            action: () => {
               tour.back();
            },
            type: 'back',
            classes: 'shepherd-button-secondary',
            text: 'Back'
          },
          {
            action: () => {
               tour.next();
            },
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
        canClickTarget:false,
        attachTo: { element: '.shape', on: 'left' },
        classes: 'shepherd shepherd-welcome',
        buttons: [
          {
            action: () => {
               tour.back();
            },
            type: 'back',
            classes: 'shepherd-button-secondary',
            text: 'Back'
          },
          {
            action: () => {
               tour.next();
            },
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
        canClickTarget:false,
        attachTo: { element: '#shapeNameInput', on: 'bottom' },
        classes: 'shepherd shepherd-welcome',
        buttons: [
          {
            action: () => {
               tour.back();
            },
            type: 'back',
            classes: 'shepherd-button-secondary',
            text: 'Back'
          },
          {
            action: () => {
               tour.next();
            },
            type: 'next',
            text: 'Next'
          }
        ],
        when: {
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
        canClickTarget:false,
        attachTo: { element: '.cm-shape', on: 'bottom' },
        classes: 'shepherd shepherd-welcome',
        buttons: [
          {
            action: () => {
               tour.back();
            },
            type: 'back',
            classes: 'shepherd-button-secondary',
            text: 'Back'
          },
          {
            action: () => {
               tour.next();
            },
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
        canClickTarget:false,
        attachTo: { element: '.prefixTab', on: 'bottom' },
        classes: 'shepherd shepherd-welcome',
        buttons: [
          {
            action: () => {
               tour.back();
            },
            type: 'back',
            classes: 'shepherd-button-secondary',
            text: 'Back'
          },
          {
            action: () => {
               tour.next();
            },
            type: 'next',
            text: 'Next'
          }
        ]
      },
      {
        id: 'addPrefix',
        text: [
          `
          <p>
         Press this button in order to define a new Prefix 
          </p>
          `
        ],
        canClickTarget:false,
        attachTo: { element: '.xs-prefixHeader:last-of-type', on: 'bottom' },
        classes: 'shepherd shepherd-welcome',
        buttons: [
          {
            action: () => {
               tour.back();
            },
            type: 'back',
            classes: 'shepherd-button-secondary',
            text: 'Back'
          },
          {
            action: () => {
               tour.next();
            },
            type: 'next',
            text: 'Next'
          }
        ],
        beforeShowPromise: function() {
          return new Promise(function(resolve) {
            assistContext.setAssistOpen(false);
            assistContext.setPrefixesOpen(true);

            setTimeout(() => {
              resolve();  
            }, 300);
            
          });
        },
        when:{
            hide: () => {
               context.addPrefix();
            },
        }
      },
      {
        id: 'prefixHeader',
        text: [
          `
          <p>
         Check prefix
          </p>
          `
        ],
        canClickTarget:false,
        attachTo: { element: '.xs-prefixHeader:last-of-type', on: 'bottom' },
        classes: 'shepherd shepherd-welcome',
        buttons: [
          {
            action: () => {
               tour.back();
            },
            type: 'back',
            classes: 'shepherd-button-secondary',
            text: 'Back'
          },
          {
            action: () => {
               tour.next();
            },
            type: 'next',
            text: 'Next'
          }
        ],
      
        beforeShowPromise: function() {
          return new Promise(function(resolve) {
            setTimeout(() => {
              resolve();  
            }, 300);
            
          });
        }
      }];

      
  tour.addSteps(newSteps);
 
  return (
   <button className="tablink material-icons " 
              
                title="Tour"
                onClick={tour.start}>
                tour
        </button>
  );
}


export default Tour;


