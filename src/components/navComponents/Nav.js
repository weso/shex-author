import React,{useContext} from 'react';

function Nav (props) {

    const {lateralNavToggle} = props;

    return (   <nav className="navbar navbar-default ">
        <div className="navbar-header">
         <button className="asis mdc-icon-button material-icons"type="button"
                 onClick={lateralNavToggle} >
                            menu
                        </button> 
            <span className='shexTitle'>ShExAuthor</span>
            <a className="navItems" target="_blank" href="http://www.weso.es/YASHE/">YASHE</a>
            <a className="navItems" target="_blank" href="https://www.linkedin.com/in/pablo-men%C3%A9ndez-su%C3%A1rez-106262a7/">About me</a>
     
        </div>
    </nav>);
    
    
}


export default Nav;

