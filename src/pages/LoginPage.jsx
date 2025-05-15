import { useEffect, useState } from 'react'

import { Link, Navigate } from 'react-router'

import { getUser, login } from '../utility/auth'

export default function LoginPage() {
    // States
    const [userData, setUserData] = useState(null)
    const [isCorrect, setIsCorrect] = useState(true)
    const [redirect, setRedirect] = useState(false)

    // Get user data as soon as a component loads
    useEffect(() => {
        if (localStorage.getItem('userData')) {
            setUserData(getUser())
        }
    }, [])

    // Form submitting logic
    function handleSubmit(e) {
        e.preventDefault()

        const form = e.currentTarget
        const formData = new FormData(form)

        const email = formData.get('email')
        const password = formData.get('password')

        if (userData) {
            if (
                email === userData.email &&
                password === userData.password
            ) {
                setIsCorrect(true)

                // Update isLogged value
                login()
                
                setRedirect(true)
            } else {
                setIsCorrect(false)
            }  
        } else {
            setIsCorrect(false)
        }
    }

    // Redirect user to the board page
    if (isCorrect && redirect) {
        return <Navigate to="/board" />
    }

    return (
        <main className="main-auth">
            <section className="section">
                <h1 className="section__title">Welcome Back</h1>
                <p className="section__text">Log in to your Sketch’n’Note account and pick up where you left off.</p>
                <form className="form auth-form" onSubmit={handleSubmit}>
                    <label className="form__label" htmlFor="email">
                        Your email:
                        <input 
                            className="form__input" 
                            type="email" 
                            name="email"
                            id="email"
                            placeholder="jonhn@example.com"
                            minLength={1}
                            maxLength={100}
                            autoComplete='on'
                            required
                        />
                    </label>
                    <label className="form__label" htmlFor="password">
                        Your password:
                        <input 
                            className="form__input" 
                            type="password" 
                            name="password"
                            id="password"
                            autoComplete='on'
                            required
                        />
                    </label>
                    {!isCorrect && <span className="auth-form__message">Email or password is incorrect</span>}
                    <button className="primary-btn" type="submit">Log In</button>
                </form>
                <p className="section__text">Don't have an account? <Link to="/signup">Sign up here</Link></p>
            </section>
        </main>
    )
}