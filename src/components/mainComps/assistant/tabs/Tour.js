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
import {addPrefixComp} from '../../../../utils/prefixUtils';


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

            document.getElementsByClassName("deleteAllBtn")[0].click();
            document.getElementsByClassName("shapesTab")[0].click();

            setTimeout(() => {
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
        ]
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
              document.getElementsByClassName("deleteAllBtn")[0].click();
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
            document.getElementsByClassName("xs-addShapeButton")[0].click();
            setTimeout(() => {
             // assistContext.setAssistOpen(true);
              resolve();  
            }, 100);
            
          });
        },
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
     
          show: () => {
              var i = 0;
              var txt = 'MyFirstShape'; /* The text */
              var speed = 80; /* The speed/duration of the effect in milliseconds */
              let yashe = Editor.getYashe();
              yashe.setValue(yashe.getValue()+'\n\n:');

              setTimeout(()=>{
                typeWriter();
              },200)

              function typeWriter() {
                if (i < txt.length) {
                  document.getElementById("shapeNameInput").value += txt.charAt(i);
                  yashe.setValue(yashe.getValue()+txt.charAt(i));
                  i++;
                  setTimeout(typeWriter, speed);
                }
              }
              

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
          There is two ways of represent IRIs in ShEx. Setting the IRI betwen '<...>' or
          using a prefix previously defined. By default, new shapes use the example prefix
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
        attachTo: { element: '.addPrefixBtn', on: 'bottom' },
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
            document.getElementsByClassName("prefixTab")[0].click();
            setTimeout(()=>{
              resolve();   
            },500)
          });
        }
      },
      {
        id: 'prefixHeader',
        text: [
          `
          <p>
         Here is your new Prefix
          </p>
          `
        ],
        canClickTarget:false,
        attachTo: { element: '#pheader4', on: 'bottom' },
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
            document.getElementsByClassName("addPrefixBtn")[0].click();
            drawShape();
            setTimeout(()=>{
              resolve();   
            },100)
            
          });
         }
        
      }
      ,
      {
        id: 'prefixAlias',
        text: [
          `
          <p>
         First of all, define an alias
          </p>
          `
        ],
        canClickTarget:false,
        attachTo: { element: '#alias4', on: 'bottom' },
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
        when:{

          show: () => {
              let yashe = Editor.getYashe();
              document.getElementById("alias4").value = ""; //reset
              document.getElementById("iri4").value = ""; //reset

              yashe.replaceRange("PREFIX : <>\n",{line:3,ch:0},{line:4,ch:0});

              var i = 0;
              var txt = 'myprefix'; /* The text */
              var speed = 80; /* The speed/duration of the effect in milliseconds */
              
              
              setTimeout(typeWriter,200)
             
              function typeWriter() {
                if (i < txt.length) {
                  document.getElementById("alias4").value += txt.charAt(i);
                  let space = i < txt.length - 1 ? " ": "";
                  yashe.replaceRange(txt.charAt(i)+space,{line:3,ch:7+i},{line:3,ch:8+i});
                  i++;
                  setTimeout(typeWriter, speed);
                }else{
                  yashe.replaceRange(": ",{line:3,ch:7+i},{line:3,ch:8+i});
                  yashe.setValue(yashe.getValue()+'\n');//Needed. If not, yashe shows an error 
                                                        //( I've tried with refresh() but it doesn't work)
                }
              }
              

          }
         
        }
      },
      {
        id: 'prefixAlias',
        text: [
          `
          <p>
         Now define the IRI
          </p>
          `
        ],
        canClickTarget:false,
        attachTo: { element: '#iri4', on: 'bottom' },
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
        when:{

          show: () => {
              document.getElementById("iri4").value = ""; //reset

              var i = 0;
              var txt = 'http://myprefix.com/'; /* The text */
              var speed = 20; /* The speed/duration of the effect in milliseconds */
              let yashe = Editor.getYashe();
              
              setTimeout(typeWriter,200)
             
             yashe.replaceRange("< ",{line:3,ch:17},{line:3,ch:18});
              function typeWriter() {
                if (i < txt.length) {
                  document.getElementById("iri4").value += txt.charAt(i);
                  let space = i < txt.length - 1 ? " ": "";
                  yashe.replaceRange(txt.charAt(i)+space,{line:3,ch:18+i},{line:3,ch:19+i});
                  i++;
                  setTimeout(typeWriter, speed);
                }else{
                  yashe.setValue(yashe.getValue()+'\n');//Needed. If not, yashe shows an error 
                                                        //( I've tried with refresh() but it doesn't work)
                }
              }

              yashe.refresh();
              

          }
         
        }
      },
       {
        id: 'prefixEditor',
        text: [
          `
          <p>
         Check your new prefix in the editor
          </p>
          `
        ],
        canClickTarget:false,
        attachTo: { element: 'div[style="position: relative;"]:nth-child(4)', on: 'bottom' },
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
        id: 'shexTab',
        text: [
          `
          <p>
         Click on the ShEx Assistan tab to return to our shapes.
          </p>
          `
        ],
        canClickTarget:false,
        attachTo: { element: '.shapesTab', on: 'bottom' },
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
        id: 'changePrefix',
        text: [
          `
          <p>
         Now, let's give our Shape the new prefix
          </p>
          `
        ],
        canClickTarget:false,
        attachTo: { element: '.shape', on: 'bottom' },
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
            assistContext.setAssistOpen(true);
            assistContext.setPrefixesOpen(false);
            
            setTimeout(() => {
              document.getElementById("shapeNameInput").value += "MyFirstShape"; 
              document.getElementById("shapeNameInput").focus();
              document.getElementById("shapeNameInput").value += "MyFirstShape"; //It's weird but is needed
              resolve();  
            }, 500);
            
          });
        }
      },
      {
        id: 'customShape',
        text: [
          `
          <p>
         Press in the Build button to customze the Shape
          </p>
          `
        ],
        canClickTarget:false,
        attachTo: { element: '.buildBtn', on: 'bottom' },
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
        id: 'customZone',
        text: [
          `
          <p>
         This is the custom zone 
          </p>
          `
        ],
        canClickTarget:false,
        attachTo: { element: '#customContainer', on: 'bottom' },
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
            document.getElementsByClassName("buildBtn")[0].click();
            document.getElementById("shapeNameInput").value += "MyFirstShape";
            setTimeout(() => {
              resolve();  
            }, 300);
            
          });
        }
      }];

  tour.addSteps(newSteps);

  const drawShape = function(){
    let yashe = Editor.getYashe();
    yashe.setValue(yashe.getValue()+'\n\n:MyFirtsShape');
  }
 
  return (
   <button className="tablink material-icons " 
              
                title="Tour"
                onClick={tour.start}>
                tour
        </button>
  );
}


export default Tour;


