import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Logo from '../brand/logo.png';
import '../../styles/App.css';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { motion } from 'framer-motion';
import Navbar from '../Navbar';
import Editor from '../Editor'
import { getCookie } from '../cookie';

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
const signUp = () => {
    let subtitle;
    const navigate = useNavigate()
    useEffect(() => {
        if (getCookie("user")) {
            navigate(-1)
        }
    }, []);
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

    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState([])

    const save = async (e) => {

        e.preventDefault()
        const formData = new FormData()
        formData.append('name', name)
        formData.append('lastname', lastname)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('confirm_password', confirmPassword)

        await axios.post('/api/register/', formData)
            .then(({ data }) => {
                navigate('/login')
            })
            .catch(({ response }) => {
                setErrors(response.data.errors)
            })

    }
    return (
        <>
            <Navbar
                links={[<li><Link className='link' to='/register'>Sign Up</Link></li>
                    , <li className='link'><Link className='link' to='/login'>Sign In</Link></li>
                ]} />


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
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                />
                <hr />
                <motion.h1 className="fs-5 text-center">
                    <motion.span
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        Sign up
                    </motion.span>
                </motion.h1>
                <div>
                    <motion.input
                        type="text"
                        name='name'
                        className={`input-box  ${errors.name &&  "border border-danger"}`}
                        placeholder="First Name"
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    />
                    {errors.name && (
                        <motion.span
                            className='text-danger'
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <p>{errors.name[0]}</p>
                        </motion.span>
                    )}
                    <motion.input
                        type="text"
                        name='lastname'
                        className={`input-box  ${errors.lastname &&  "border border-danger"}`}
                        placeholder="Last Name"
                        value={lastname}
                        onChange={(e) => { setLastname(e.target.value) }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    />
                    {errors.lastname && (
                        <motion.span
                            className='text-danger'
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <p>{errors.lastname[0]}</p>
                        </motion.span>
                    )}
                    <motion.input
                        type="email"
                        name='email'
                        className={`input-box  ${errors.email &&  "border border-danger"}`}
                        placeholder="Your Email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                    />
                    {errors.email && (
                        <motion.span
                            className='text-danger'
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5}}
                        >
                            <p>{errors.email[0]}</p>
                        </motion.span>
                    )}
                    <motion.input
                        type="password"
                        name='password'
                        className={`input-box  ${errors.password &&  "border border-danger"}`}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 1 }}
                    />
                    {errors.password && (
                        <motion.span
                            className='text-danger'
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5}}
                        >
                            <p>{errors.password[0]}</p>
                        </motion.span>
                    )}
                    <motion.input
                        type='password'
                        name='confirm_password'
                        className={`input-box  ${errors.confirm_password &&  "border border-danger"}`}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => { setConfirmPassword(e.target.value) }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 1.2 }}
                    />
                    {errors.confirm_password && (
                        <motion.span
                            className='text-danger'
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5}}
                        >
                            <p>{errors.confirm_password[0]}</p>
                        </motion.span>
                    )}
                    <motion.button
                        className="submit-btn text-light"
                        onClick={save}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.4 }}
                    >
                        Sign up
                    </motion.button>
                    <motion.p
                        className='fs-5'
                        data-bs-dismiss="modal"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1.6 }}
                    >
                        Already have an account? <Link to='/login'>Sign in</Link>
                    </motion.p>
                </div>
            </Modal>
            <Editor />
        </>
    )
}

export default signUp;