import React from 'react'
import ReactLoading from "react-loading";
import logo from './brand/logo.png'
import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className='position-absolute top-50 start-50 translate-middle' 
    >
        <img src={logo} alt="" width={200}/>
        <ReactLoading type="bubbles" color="#198dbe"
        height={200} width={150} />
    </div>
  )
}

export default Loading