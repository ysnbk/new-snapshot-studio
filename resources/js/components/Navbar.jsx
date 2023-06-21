import React,{useState} from 'react'
import Logo from '../components/brand/logo.png';
import { Icon } from 'react-icons-kit'
import {menu} from 'react-icons-kit/feather/menu'
import {x} from 'react-icons-kit/feather/x'
import { Link } from 'react-router-dom';


const Navbar = (props) => {
  const [toggle, setToggle]=useState(false);
  const handleToggle=()=>{
    setToggle(!toggle);
  }
  return (
    <nav className={toggle?'navbar expanded':'navbar'}>
          <Link to='/'><img src={Logo} alt="#" className='logo'/></Link>
          <div className="toggle-icon" onClick={handleToggle}>
              {toggle?<Icon icon={x} size={28}/>:<Icon icon={menu} size={28}/>}
          </div>
          <ul className='links'>
            {props.links}
            
          </ul>
        
    </nav>
   
  )
}

export default Navbar