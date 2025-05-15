import {useRef, useState} from 'react'

import { ReactSketchCanvas } from 'react-sketch-canvas'

import earseIcon from '../assets/images/erase-icon.svg'
import clearIcon from '../assets/images/clear-icon.svg'

export default function NoteCanvas() {
    const canvasRef = useRef(null)
    // States
    const [eraseMode, setEraseMode] = useState(false)
    const [strokeColor, setStrokeColor] = useState('#3E2723')

    function handleEraserClick() {
        setEraseMode(prevMode => !prevMode)
        
        if (eraseMode) {
            canvasRef.current?.eraseMode(false)
        } else {
            canvasRef.current?.eraseMode(true)
        }
    }

    function handleColorChange(e) {
        const colorPicker = e.currentTarget

        setStrokeColor(colorPicker.value)
    }

    function handleClearClick() {
        setEraseMode(false)
        canvasRef.current?.eraseMode(false)
        canvasRef.current?.clearCanvas()
    }

    return (
        <div className='canvas-wrap'>
            <ReactSketchCanvas
                ref={canvasRef}
                className='note-canvas'
                height='200px'
                canvasColor='transparent'
                strokeColor={strokeColor}
                strokeWidth={3}
                eraserWidth={10}
            />
            <div className='canvas__buttons'>
                <button className={`canvas__button${eraseMode ? ' active' : ''}`} onClick={handleEraserClick}>
                    <img className='canvas__button-icon' src={earseIcon} alt='erase icon' />
                </button>
                <button className='canvas__button'>
                    <input className='canvas__button-input' type='color' onChange={handleColorChange} value={strokeColor}/>
                </button>
                <button className='canvas__button canvas__button--clear' onClick={handleClearClick}>
                    <img className='canvas__button-icon' src={clearIcon} alt='clear icon' />
                </button>
            </div>
        </div>
    )
}