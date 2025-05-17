import { useState, useRef, useEffect } from 'react'

import NoteCanvas from './NoteCanvas'

export default function Note({type}) {
    const note = useRef(null)

    // States
    const [isDragging, setIsDragging] = useState(false)
    const [offset, setOffset] = useState({x: 0, y: 0})
    const [position, setPosition] = useState({x: 350, y: 50})
    const [title, setTitle] = useState('Your title here')
    const [isTitleEditing, setIsTitleEditing] = useState(false)

    // Drag and drop logic
    function handleDragStart(e) {
        e.preventDefault()

        setIsDragging(true)

        const noteRect = note.current.getBoundingClientRect()

        setOffset({
            x: e.clientX - noteRect.left,
            y: e.clientY - noteRect.top
        })
    }

    function handleMouseMove(e) {
        if (!isDragging) return

        const newX = e.clientX - offset.x
        const newY = e.clientY - offset.y

        setPosition({
            x: newX,
            y: newY
        })
    }

    // Title changing logic
    function handleEnterPress(e) {
        if (e.key === 'Enter' && isTitleEditing) {
            setIsTitleEditing(false)
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', handleEnterPress)

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove)
            window.addEventListener('mouseup', () => setIsDragging(false))
        }

        return () => {
            window.removeEventListener('keydown', handleEnterPress)
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseup', () => setIsDragging(false))
        }
    }, [isDragging, isTitleEditing])

    useEffect(() => {
        if (window.innerWidth <= 1000) {
            setPosition({x: 20, y: 70})
        }
    }, [])

    return (
        <div 
            ref={note}
            className={`note note-${type === 'text' ? 'text' : 'sketch'}`}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`
            }}
        >
            <div 
                className='draggable-area' 
                onMouseDown={handleDragStart}
                style={{cursor: isDragging ? 'grabbing' : 'grab'}}
            ></div>
            {isTitleEditing ? 
                <input 
                    className='note__title-input' 
                    type='text' 
                    value={title}
                    onChange={e => setTitle(e.currentTarget.value)} 
                />
            : 
                <p className='note__title' onClick={() => setIsTitleEditing(true)}>{title}</p>
            }
            {type === 'text' ? (
                <>
                    <textarea className='note__textarea' rows={10} placeholder='Your text here'></textarea>
                </>
            ) : (
                <NoteCanvas />
            )}
        </div>
    )
}