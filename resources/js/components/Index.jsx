import React, { useEffect, useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import Navbar from './Navbar'
import { useMediaQuery } from 'react-responsive'
import MobileEditor from './MobileEditor'
import Editor from './Editor'
import { getCookie } from './cookie'


const Index = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' })

  const navigate = useNavigate()
  useEffect(() => {
    if(getCookie("user")){
      navigate('editor')
    }
  }, []);
  return (
    <div>
      <Navbar
            links={[<li><Link className='link' to='register'>Sign Up</Link></li>
        ,<li className='link'><Link className='link' to='login'>Sign In</Link></li>
        ]}/>
        
        {isMobile ?<MobileEditor/>:<Editor/>}
        
    </div>
  )
}

export default Index