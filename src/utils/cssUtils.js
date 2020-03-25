export function makeItResponsive(width){
        
        //TimeOut need to take all the elements after render the DOM
        setTimeout(() => {
        let tabs = document.getElementsByClassName("tabs")[0];
        let shapeHeaders = document.getElementsByClassName("header");
        let tripleHeaders = document.getElementsByClassName("tripleHeader");
        let addTripleBtns = document.getElementsByClassName("addTripleButton");
        let addShapeBtns = document.getElementsByClassName("addShapeButton");
        let grids = document.getElementsByClassName("gridBox");
        let prefixes = document.getElementsByClassName("prefixHeader");

        let tabClass = 'tabs';
        let shClass = 'header';
        let thClass = 'tripleHeader';
        let adTClass = 'addTripleButton';
        let adSClass = 'addShapeButton';
        let grClass = 'gridBox';
        let prClass = 'prefixHeader';
        if(width<600){
            tabClass += ' xs-tabs';
            shClass += ' xs-header';
            thClass += ' xs-tripleHeader';
            adTClass += ' xs-addTripleButton';
            adSClass += ' xs-addShapeButton';
            grClass += ' xs-gridBox';
            prClass += ' xs-prefixHeader';
        }else{
            //Why this is needed?
            tabClass = 'tabs';
            shClass = 'header';
            thClass = 'tripleHeader';
            adTClass = 'addTripleButton';
            adSClass = 'addShapeButton';
            grClass = 'gridBox';
            prClass = 'prefixHeader';
        }

        
        tabs.className = tabClass;
        for(let i=0;i<shapeHeaders.length;i++){
            shapeHeaders[i].className = shClass;
        }

        for(let i=0;i<tripleHeaders.length;i++){
            tripleHeaders[i].className = thClass;
        }

        for(let i=0;i<addTripleBtns.length;i++){
            addTripleBtns[i].className = adTClass;
        }

        for(let i=0;i<addShapeBtns.length;i++){
            addShapeBtns[i].className = adSClass;
        }

        for(let i=0;i<grids.length;i++){
            grids[i].className = grids[i].className.replace('gridBox',grClass);
        }

        for(let i=0;i<prefixes.length;i++){
            prefixes[i].className = prClass;
        }

    }, 0);
        
        
}


