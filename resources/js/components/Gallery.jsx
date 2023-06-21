import React, { useState, useEffect, useReducer } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import '../styles/gallery.css';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faHeart, faShare } from '@fortawesome/free-solid-svg-icons';

import { getCookie } from './cookie';
import axios from 'axios';
import Navbar from './Navbar';

const Gallery = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [model, setModel] = useState(false);
    const [tempImgSrc, setTempImgSrc] = useState('');
    const [scrollPosition, setScrollPosition] = useState(0);
    const [blurStyle, setBlurStyle] = useState({});
    const [isScrolled, setIsScrolled] = useState(false);

    const [data, setData] = useState([])
    useEffect(() => {
        const getImages = async () => {
            await axios.get('/api/getImages/', {
                params: {
                    user: getCookie('user')
                }
            })
                .then(({ data }) => {
                    // console.log(data)
                    setData(data.data)
                    setUser(data.user)
                    


                })
                .catch(({ response }) => {
                    console.log(response)




                })
        }

        getImages()
    }, []);


    useEffect(() => {
        // simulate a delay in data loading
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);

        if (position > 0) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    const getImg = (path) => {
        setTempImgSrc(path);
        setModel(true);
    };

    const getBlurStyle = () => {
        const blur = scrollPosition * 0.03;
        const blurStyle = {
            backdropFilter: `blur(${blur}px)`,
        };
        setBlurStyle(blurStyle);
    };

    useEffect(() => {
        getBlurStyle();
    }, [scrollPosition]);

    return (
         <>
             
            <Navbar links={[<div className="dropdown mx-2">
                    <Link className="dropdown-item" to='/editor'>Editor</Link>
            </div>

            ]} />

            <motion.div
                className={model ? 'model open' : 'model'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <motion.img
                    src={tempImgSrc}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                />
                <motion.div
                    className="icon-container"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                >
                    <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}>
                    </motion.div>
                </motion.div>
                <motion.div
                    className="close-icon"
                    whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
                    whileTap={{ scale: 0.9 }}
                    style={{ fontSize: '2rem', padding: '10px' }}
                >
                    <FontAwesomeIcon icon={faTimes} onClick={() => setModel(false)} />
                </motion.div>
            </motion.div>

            {isLoading ? (
                <div className="gallery-skeleton mx-3">
                    {[...Array(8)].map((_, index) => (
                        <div className="pics-skeleton" key={index}></div>
                    ))}
                </div>
            ) : (
                <motion.div className="gallery mt-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {data.map((item, index) => (
                        <motion.div
                            className="pics"
                            whileHover={{ scale: 1.05} }
                            key={index}
                            onClick={() => getImg(item.path)}
                        >
                            <motion.img
                                src={item.path}
                                style={{ width: '100%' }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </> 
    );
};

export default Gallery;
