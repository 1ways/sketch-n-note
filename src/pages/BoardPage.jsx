import { useState } from 'react'

import { Navigate } from 'react-router'
import { v4 as uuidv4 } from 'uuid';

import Note from '../components/Note'

import { logout, getIsLogged } from '../utility/auth'

import textNote from '../assets/images/text-note.svg'
import drawingNote from '../assets/images/drawing-note.svg'
import deleteIcon from '../assets/images/delete-icon.svg'

export default function BoardPage() {
    // States
    const [showMenu, setShowMenu] = useState(false) 
    const [isLogged, setIsLogged] = useState(() => getIsLogged())
    const [notes, setNotes] = useState([])
    const [showSidebar, setShowSidebar] = useState(false)

    if (!isLogged) {
        return <Navigate to='/' />
    }

    function toggleMenu() {
        setShowMenu(prevShow => !prevShow)
    }

    // Logout logic
    function handleLogout() {
        setIsLogged(false)
        logout()
    }

    // Note adding logic
    function addNote(type) {
        setNotes(prevNotes => [...prevNotes, {id: uuidv4(), type}])
        setShowMenu(false)
    }

    // Note deleting logic
    function handleDelete(id) {
        setNotes(prevNotes => {
            return prevNotes.filter(note => note.id != id)
        })
    }

    function toggleSidebar() {
        setShowSidebar(prevSidebar => !prevSidebar)
    }

    return (
        <main className='board-main'>
            <aside className={`sidebar${showSidebar ? ' show' : ''}`}>
                <button className='primary-btn board__btn' onClick={toggleSidebar}>{showSidebar ? 'Close' : 'Open'}</button>
                <div className='sidebar__add'>
                    <h1 className='sidebar__title'>New Note / Sketch</h1>
                    <button 
                        className='sidebar__add-btn' 
                        aria-label={showMenu ? 'close menu with note creation options' : 'open menu with note creation options'} 
                        onClick={toggleMenu}
                    >     
                        {showMenu ? '-' : '+'}
                    </button>
                    <ul className={`sidebar__add-menu${showMenu ? ' show' : ''}`}>
                        <li className='sidebar__menu-item' onClick={() => addNote('text')}>
                            <img className='sidebar__menu-icon' src={textNote} alt='A text note icon' />
                            <p className='sidebar__menu-text'>Create a Note</p>
                        </li>
                        <li className='sidebar__menu-item' onClick={() => addNote('sketch')}>
                            <img className='sidebar__menu-icon' src={drawingNote} alt='A drawing note icon' />
                            <p className='sidebar__menu-text'>Create a Sketch</p>
                        </li>
                    </ul>
                </div>
                <h2 className='sidebar__title sidebar__items-title'>Items</h2>
                <div className='sidebar__items' aria-live='polite'>
                    {notes.map((note, index) => (
                        <div className='sidebar__item' key={note.id}>
                            <p>{note.type[0].toUpperCase() + note.type.slice(1)} Note {index + 1}</p>
                            <button className='sidebar__item-btn' onClick={() => handleDelete(note.id)} aria-label='Delete a note'>
                                <img className='sidebar__item-icon' src={deleteIcon} alt='delete icon' />
                            </button>
                        </div>
                    ))}
                </div>
                <div className='sidebar__logout' onClick={handleLogout}>
                    <button className='primary-btn'>Log out</button>
                </div>
            </aside>
            <div className='board'>
                {notes.map(note => <Note key={note.id} type={note.type} />)}
            </div>
        </main>
    )
}