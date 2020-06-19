import React from 'react';
import '../css/navComponents/Nav.css'; 

function Nav (props) {

    const {colapseAll} = props;

    return (   <nav className="navbar navbar-default ">
        <div className="navbar-header">
        
         <button className="collapseAllBtn mdc-icon-button material-icons"type="button"
                 onClick={colapseAll} >
                            menu
                        </button> 
            <span className='shexTitle'>ShExAuthor</span>
            <a className="navItems" target="_blank" href="http://www.weso.es/YASHE/">YASHE</a>
            <a className="navItems" target="_blank" href="http://www.weso.es/">Weso</a>
            <a className="navItems" target="_blank" href="https://www.linkedin.com/in/pablo-men%C3%A9ndez-106262a7/">About me</a>
     
        </div>
    </nav>);
    
    
}

export default Nav;

