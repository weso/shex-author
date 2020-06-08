export default [
      {
        id: 'welcome',
        text: [
          `
          <p>
          ShExAuthor is a ShEx Assistant
          </p>
          `
        ],
        attachTo: { element: '.assistCollapse', on: 'left' },
        classes: 'shepherd shepherd-welcome',
        buttons: [
          {
            type: 'cancel',
            classes: 'shepherd-button-secondary',
            text: 'Exit'
          },
          {
            type: 'next',
            text: 'Next'
          }
        ],
        
      },
      {
        id: 'shape',
        text: [
          `
          <p>
         Create a new Shape
          </p>
          `
        ],
        attachTo: { element: '.shape', on: 'bottom' },
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
        beforeShowPromise: function() {
          return new Promise(function(resolve) {
             
             resolve();
          });
        },
      }];