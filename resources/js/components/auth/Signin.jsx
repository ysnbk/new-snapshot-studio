import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Logo from '../brand/logo.png';
import '../../styles/App.css';
import { Link, useNavigate } from 'react-router-dom'
import Modal from 'react-modal';
import Navbar from '../Navbar';
import Editor from '../Editor';
import { motion } from 'framer-motion';
import { getCookie, setCookie } from '../cookie';


const customStyles = {
  content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width:'80%',
      maxWidth:'400px'
  },
};

Modal.setAppElement('#app');

const Signin = () => {
  const navigate = useNavigate()
  useEffect(() => {
    if(getCookie("user")){
      navigate(-1)
    }
  }, []);
  let subtitle;
      //modal
      const [modalIsOpen, setIsOpen] = useState(true);

      function afterOpenModal() {
          // references are now sync'd and can be accessed.
          subtitle.style.color = '#f00';
      }
  
      function closeModal() {
        setIsOpen(false);
        navigate('/')
      }
      //end modal
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])
  const [modalState, setModalState] = useState(true)

  const login = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)

    await axios.post('/api/login/', formData)
      .then(({ data }) => {
        setErrors(data.error)

        if (!data.error) {
          if(data.email_crypted != null){
            setCookie('user', data.email_crypted)
          }
          navigate('/editor')
        }
      })
      .catch(({ response }) => {

        setErrors(response.data.errors)


      })

  }


  return (
    <>
            <Navbar
            links={[<li><Link className='link' to='/register'>Sign Up</Link></li>
        ,<li className='link'><Link className='link' to='/login'>Sign In</Link></li>
        ]}/>
      <Modal
  isOpen={modalIsOpen}
  onAfterOpen={afterOpenModal}
  onRequestClose={closeModal}
  style={customStyles}
  contentLabel="Example Modal"
>
  <motion.button
    className='float-end btn-close'
    onClick={closeModal}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  ></motion.button>
  <motion.img
    src={Logo}
    alt=""
    width='60px'
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  />
  <hr />
  <div className="rounded">
    <div>
      <h1 className="fs-3 text-center">Login</h1>
      <motion.input
        type="email"
        name='email'
        className={`input-box  ${errors.email &&  "border border-danger"}`}
        placeholder="Your Email"
        value={email}
        onChange={(e) => { setEmail(e.target.value) }}
        initial={{ opacity: 0,  x: -15 }}
      animate={{ opacity: 1, x: 0}}
      transition={{ duration: 0.5 ,delay:0.4}}
      />
      {errors.email && (
        <span className='text-danger'>
          <p>{errors.email[0]}</p>
        </span>
      )}
      <motion.input
        type="password"
        name='password'
        className={`input-box  ${errors.password &&  "border border-danger"}`}
        placeholder="Password"
        value={password}
        onChange={(e) => { setPassword(e.target.value) }}
        initial={{ opacity: 0,  x: -15 }}
      animate={{ opacity: 1, x: 0}}
      transition={{ duration: 0.5 ,delay:0.6}}
      />
      {errors.password && (
        <span className='text-danger'>
          <p>{errors.password[0]}</p>
        </span>
      )}
      <motion.button
        className="submit-btn text-light"
        onClick={login}
        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1 }}
      >
        Log In
      </motion.button>
    </div>
    <motion.p
      className='fs-5'
      initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1.6 }}
    >
      New to Snapshot? <Link to='/register'>Create an account</Link>
    </motion.p>
  </div>
</Modal>
<Editor/>
    </>
  )
}

export default Signin;