import React, { useEffect, useState } from 'react'
import logo from './brand/logo.png'
//icons
import opacity from './icons/opacity.ico'
import hue from './icons/hue.ico'
import invert from './icons/invert.ico'
import saturate from './icons/saturate.ico'

import { motion } from 'framer-motion';
import styles from '../styles/editor.module.css'
import { getCookie } from './cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faAdjust, faCropSimple, faDownload, faImage, faPalette, faCircle, faDroplet } from '@fortawesome/free-solid-svg-icons'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import Loading from './Loading'
import axios from 'axios'

const Editor = (props) => {
  const toolsVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5} },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const [isLoading, setIsLoading] = useState(true)
  const [isSelected, setIsSelected] = useState(false)

  useEffect(() => {
     setIsLoading(false)
     if(sessionStorage.getItem('image')){
      setImage(sessionStorage.getItem('image'))
  } 
  }, []);

  const defaultFilters = [
    {
      name: 'Brightness',
      property: 'brightness',
      value: 100,
      range: {
        min: 0,
        max: 200
      },
      unit: '%',
      icon: <FontAwesomeIcon icon={faSun}/>
    },
    {
      name: 'Saturation',
      property: 'saturate',
      value: 100,
      range: {
        min: 0,
        max: 200
      },
      unit: '%',
      icon:<img src={saturate} alt="" width="18px"/>
    },
    {
      name: 'Grayscale',
      property: 'grayscale',
      value: 0,
      range: {
          min: 0,
          max: 100
      },
      unit: '%',
      icon: <FontAwesomeIcon icon={faDroplet} />
  },
    {
      name: 'Contrast',
      property: 'contrast',
      value: 100,
      range: {
        min: 0,
        max: 200
      },
      unit: '%',
      icon: <FontAwesomeIcon icon={faAdjust}/>
    },
    {
      name: 'Hue Rotate',
      property: 'hue-rotate',
      value: 0,
      range: {
        min: 0,
        max: 360
      },
      unit: 'deg',
      icon:<img src={hue} alt="" width="18px"/>
    }, {
      name: 'Invert',
      property: 'invert',
      value: 0,
      range: {
        min: 0,
        max: 100
      },
      unit: '%',
      icon:<img src={invert} alt="" width="18px"/>
    },
    {
      name: 'Blur',
      property: 'blur',
      value: 0,
      range: {
        min: 0,
        max: 100
      },
      unit: 'px',
      icon:<FontAwesomeIcon icon={faCircle}/>

    },
    {
      name: 'Sepia',
      property: 'sepia',
      value: 0,
      range: {
        min: 0,
        max: 100
      },
      unit: '%',
      icon: <FontAwesomeIcon icon={faPalette}/>

    }, {
      name: 'opacity',
      property: 'opacity',
      value: 100,
      range: {
        min: 0,
        max: 100
      },
      unit: '%',
      icon:<img src={opacity} alt="" width="18px"/>
    }
  ]

      // tabs
      const tabHeaders = ['adjust', 'effets']
      const [activeTab, setActiveTab] = useState(0)

  const [selectedOptionIndex, setSelectedOptionIndex] = useState(0)
  const [options, setOptions] = useState(defaultFilters)


  function getImageStyle() {
    const adjustments = options.map(option => {
      return `${option.property}(${option.value}${option.unit})`
    })


    return { filter: adjustments.join(' ')}
  }

  const [details, setDetails] = useState('')
  const [image, setImage] = useState('')
  const [crop, setCrop] = useState('')

  const inputHandle = (e) => {
    setOptions(prevOptions => {
      return prevOptions.map((option, index) => {
        if (index !== selectedOptionIndex) return option
        return { ...option, value: e.target.value }
      })
    })
  }
  const imageHandle = (e) => {

    const image = document.createElement("input");
    image.type = "file"
    image.accept = "image/*"
    image.click()

    image.onchange = (e) => {
      let file = e.target.files[0]
      const reader = new FileReader()

      reader.onloadend = (file) => {
        setImage(reader.result)
        sessionStorage.setItem('image',reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const imageCrop = () => {
    const canvas = document.createElement('canvas')
    const scaleX = details.naturalWidth / details.width
    const scaleY = details.naturalHeight / details.height
    canvas.width = crop.width
    canvas.height = crop.height
    const ctx = canvas.getContext('2d')

    ctx.drawImage(
      details,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    )

    setImage(canvas.toDataURL())
    setCrop('')
  }

  const saveImage = async () => {
    const canvas = document.createElement('canvas')
    canvas.width = details.naturalWidth
    canvas.height = details.naturalHeight
    const ctx = canvas.getContext('2d')

    const adjustments = options.map(option => {
      return `${option.property}(${option.value}${option.unit})`
    })
    ctx.filter = adjustments.join(' ')

    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate(0 * Math.PI / 180)
    ctx.scale(1, 1) // vertical, horizontal

    ctx.drawImage(
      details,
      -canvas.width / 2,
      -canvas.height / 2,
      canvas.width,
      canvas.height
    )

    const link = document.createElement('a')
    link.download = 'SnapshotSTudio.jpg'
    link.href = canvas.toDataURL()

    if (getCookie("user")) {

      const formData = new FormData()
      formData.append('user', getCookie("user"))
      formData.append('photo', canvas.toDataURL())

      await axios.post('/api/saveImage', formData)
        .then(({ data }) => {
          console.log(data.image_name);
          link.download = data.image_name
        })
        .catch(({ response }) => {
          console.log(response)
        })

      // save the filter
    }
    link.click()
    sessionStorage.removeItem('image')

  }
  return (
    isLoading ? <Loading /> : <>
      <motion.div className="container w-75 mt-3 p-3 mb-5 bg-body-tertiary rounded"
        initial="hidden"
        animate="visible"
        variants={containerVariants}>
        {/* {tabHeaders.map((tab, index) => (
                        <button className={`btn ${index ===activeTab ? styles.activeTab:''}`} key={index}  onClick={() => { setActiveTab(index) }}>{tab}</button>
                    ))} */}
        <main className={styles.editor}>

          {
            image &&
            // tabHeaders[activeTab] === 'adjust' ?
              <motion.div className={styles.tools}
                variants={toolsVariants}
                initial="hidden"
                animate="visible">
                <ul>
                  {
                    defaultFilters.map((v, i) => <li>

                      <button data-toggle="tooltip" title={v.name} className={`${styles['option-button']} text-capitalize ${i === selectedOptionIndex ? styles.active : ''}`} onClick={() => setSelectedOptionIndex(i)} key={i}>{v.icon} {v.name}</button>
              
                    </li>)
                  }
                </ul>

                {crop &&
                  <>
                    <button className={`${styles["option-button"]} text-capitalize`} onClick={imageCrop}><FontAwesomeIcon icon={faCropSimple} />Crop</button></>
                      
                      }

              </motion.div>
              // :''
              }

          <div className={styles.image}>
            <div className={styles.content}>
              {
                image ?
                   <ReactCrop crop={crop} onChange={c => setCrop(c)}>
                    <img onLoad={(e) => setDetails(e.currentTarget)} src={image} alt="" style={getImageStyle()} />
                    </ReactCrop>
                  :
                  <motion.div
                    className={styles['choose_image']}
                    initial={{ opacity: 0,scale: 0 }}
                    animate={{ opacity: 1,scale: 1 }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className={styles['upload_img_box']} onClick={imageHandle}>
                      <i className="bx bxs-image-add" /><br />
                      <p id="hint">choose Image from folder</p>
                    </div>
                  </motion.div>
              }
            </div>
          </div>


          {image && <div className={styles.range}>
            Amount <br />
            <input className='mt-2' onChange={inputHandle} value={options[selectedOptionIndex].value} min={options[selectedOptionIndex].range.min} max={options[selectedOptionIndex].range.max} type="range" />
            <pre className='px-3'>{options[selectedOptionIndex].value} {options[selectedOptionIndex].unit}</pre>


          </div>}


          {image && <div className={styles['save_button']}>
            <button className={`btn btn-outline-secondary ${styles['change_image']} m-1 text-dark`} onClick={imageHandle}><FontAwesomeIcon icon={faImage} /> Change Image</button>
            <button className={`btn btn-success ${styles.download}`} onClick={saveImage}><FontAwesomeIcon icon={faDownload} /> Download</button>
          </div>}

        </main>
      </motion.div>
    </>
  )
}

export default Editor