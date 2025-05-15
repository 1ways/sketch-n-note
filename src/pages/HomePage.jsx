import { useState } from 'react'

import { Link } from 'react-router'

import logo from '../assets/images/logo.svg'
import burgerIcon from '../assets/images/burger-icon.svg'

export default function HomePage() {

    const [isShowMenu, setIsShowMenu] = useState(false)

    // Form submitting logic
    function handleSubmit(e) {
        e.preventDefault()

        const form = e.currentTarget

        const formData = new FormData(form)

        const name = formData.get('name')
        const message = formData.get('message')

        console.log(`Name: ${name}`)
        console.log(`Message: ${message}`)

        form.reset()
    }

    function toggleMenu() {
        setIsShowMenu(prevShow => !prevShow)
    }

    return (
        <>
            <header className='header'>
                <Link className='logo' to='/'>
                    <img className='logo__img' src={logo} alt='logo' />
                    <p className='logo__text'><span className='logo__text-span'>Sketch’</span>nNote</p>
                </Link>
                <nav className={`header__nav${isShowMenu ? ' show' : ''}`}>
                    <ul className='header__list'>
                        <li className='header__list-item'>
                            <a className='header__list-link' href='#about'>About</a>
                        </li>
                        <li className='header__list-item'>
                            <a className='header__list-link' href='#contact'>Contact</a>
                        </li>
                        <li className='header__list-item'>
                            <Link className='primary-btn' to='/signup'>Sign up</Link>
                        </li>
                    </ul>
                </nav>
                <button className='header__burger' onClick={toggleMenu}>
                    <img className='header__burger-icon' src={burgerIcon} alt='A burger icon' />
                </button>
            </header>
            <main className='main'>
                <section className='hero section'>
                    <h1 className='hero__title'>Draw. Write. Remember.</h1>
                    <p className='hero__text'><span className='logo__text'><span className='logo__text-span'>Sketch’</span>nNote</span> is your creative space for jotting down thoughts and sketching ideas — all in one seamless, intuitive notebook.</p>
                    <Link className='primary-btn' to='/signup'>Get started!</Link>
                </section>
                <section className='section' id='about'>
                    <h2 className='section__title'>More Than Just Notes</h2>
                    <p className='section__text'>Sketch’n’Note is built for thinkers, doodlers, creators, and note-takers. Whether you're jotting down quick thoughts or sketching big ideas, our app gives you the freedom to combine handwriting and text in one clean, intuitive space. Designed to feel natural and effortless — just like pen and paper, but better.</p>
                </section>
                <section className='section' id='contact'>
                    <h2 className='section__title'>Get in Touch</h2>
                    <p className='section__text'>Have a question, suggestion, or just want to say hi? We’d love to hear from you. Fill out the form below and we’ll get back to you soon.</p>
                    <form className='form contact__form' onSubmit={handleSubmit}>
                        <label className='form__label' htmlFor='name'>
                            Your name:
                            <input 
                                className='form__input' 
                                type='text' 
                                name='name'
                                id='name'
                                placeholder='John Smith'
                                minLength={1} 
                                maxLength={100}
                                pattern='[A-Za-z0-9 ]+'
                                required
                            />
                        </label>
                        <label className='form__label' htmlFor='message'>
                            Message:
                            <textarea 
                                className='form__textarea' 
                                name='message' 
                                id='message'
                                placeholder='Write your message here...'
                                rows={5}
                                minLength={1} 
                                maxLength={200}
                                required
                            ></textarea>
                        </label>
                        <button className='primary-btn' type='submit'>Send</button>
                    </form>
                </section>
            </main>
        </>
    )
}