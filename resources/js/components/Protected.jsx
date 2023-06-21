import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCookie } from './cookie';

const Protected = (props) => {
    const navigate=useNavigate()
    const cookie = getCookie("user")
    useEffect(() => {
      
      if(!cookie && cookie == '' || cookie == null){
  
          navigate('/login')
      }
    }, []);
  return (
    <div>
      {props.component}
    </div>
  )
}

export default Protected